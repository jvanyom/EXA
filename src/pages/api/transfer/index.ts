import type { NextApiRequest, NextApiResponse } from "next";
import type { Path } from "react-hook-form";

import type { CompensationCommission, Database, ErrorType, Transfer, ValidationError } from "@/types";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ValidationError as YupValidationError } from "yup";
import { constants } from "http2";

import { validationErrorBuilder } from "@/utils/server"; // import { sendMessage } from "@/utils/server";
// import { encode } from "@/utils/server/hasher";
import { getUserOffice } from "@/utils/data";
import { transferSchema } from "@/schemas";

type PhoneError = "phone.discrepancy";

type Return<T = PhoneError> = ValidationError<T> | ValidationError<T>[] | void;

const createTransfer = async (req: NextApiRequest, res: NextApiResponse<Return>) => {
    if (req.method !== "POST") return res.status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED).end();

    const sb = createServerSupabaseClient<Database>({ req, res });

    const {
        data: { session },
        error
    } = await sb.auth.getSession();

    if (!session || error) return res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();

    const validationError = validationErrorBuilder<PhoneError, Transfer>(res);

    try {
        const { data: minAmount } = await sb.rpc("min_transfer_amount").throwOnError().single();

        const transfer = await transferSchema.validate(req.body, { abortEarly: false, context: { minAmount } });

        const issuingOfficeId = await getUserOffice(sb);

        if (issuingOfficeId === transfer.collectionOffice) {
            return validationError("collectionOffice", "equal");
        }

        const { data: maxTransferAmount } = await sb
            .rpc("max_transfer_amount", { office: transfer.collectionOffice })
            .throwOnError()
            .single();

        if (transfer.amount > maxTransferAmount) {
            return validationError("amount", "max", maxTransferAmount);
        }

        const { data: sender } = await sb
            .from("customers")
            .select("name")
            .eq("phone", transfer.sender.phone)
            .throwOnError()
            .maybeSingle();

        if (sender && transfer.sender.name.toLowerCase() !== sender.name.toLowerCase()) {
            return validationError("sender.phone", "phone.discrepancy");
        }

        const { data: payee } = await sb
            .from("customers")
            .select("name")
            .eq("phone", transfer.payee.phone)
            .throwOnError()
            .maybeSingle();

        if (payee && transfer.payee.name.toLowerCase() !== payee.name.toLowerCase()) {
            return validationError("payee.phone", "phone.discrepancy");
        }

        const { data: customers } = await sb
            .from("customers")
            .upsert([transfer.sender, transfer.payee], {
                onConflict: "phone",
                ignoreDuplicates: true
            })
            .throwOnError()
            .select("id, phone");

        const { data: compensationCommission } = await sb
            .rpc("compensation_commission", {
                sender_phone: transfer.sender.phone,
                collection_office: transfer.collectionOffice,
                amount: transfer.amount
            })
            .throwOnError()
            .single();

        const { commission, compensation } = compensationCommission as CompensationCommission;

        const { data: createdTransfer } = await sb
            .from("transfers")
            .insert({
                sender_id: customers.find(c => c.phone === transfer.sender.phone).id,
                payee_id: customers.find(c => c.phone === transfer.payee.phone).id,
                issuing_office_id: issuingOfficeId,
                collection_office_id: transfer.collectionOffice,
                amount: transfer.amount,
                commission_amount: commission + compensation
            })
            .throwOnError()
            .select("id")
            .single();

        // await sendMessage({
        //     transferCode: encode(createdTransfer.id),
        //     payeePhone: transfer.payee.phone
        // });

        return res.status(constants.HTTP_STATUS_CREATED).end();
    } catch (e) {
        if (e instanceof YupValidationError) {
            return res.status(constants.HTTP_STATUS_UNPROCESSABLE_ENTITY).json(
                e.inner.map(error => ({
                    path: error.path as Path<Transfer>,
                    type: error.type as ErrorType<PhoneError>,
                    message: error.message
                }))
            );
        }

        return res.status(constants.HTTP_STATUS_NOT_ACCEPTABLE).json({ type: "unknown" });
    }
};

export default createTransfer;
