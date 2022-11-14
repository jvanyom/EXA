import type { NextApiRequest, NextApiResponse } from "next";

import type { Database, TransferResponse } from "@/types";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { constants } from "http2";

import { transferCodeSchema } from "@/schemas";
import { decode } from "@/utils/server/hasher";
import { getUserOffice } from "@/utils/data";

const getTransfer = async (req: NextApiRequest, res: NextApiResponse<TransferResponse | void>) => {
    if (req.method !== "GET") return res.status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED).end();

    const sb = createServerSupabaseClient<Database>({ req, res });

    const {
        data: { session },
        error
    } = await sb.auth.getSession();

    if (!session || error) return res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();

    try {
        const code = await transferCodeSchema.validate(req.query.code);

        const collectionOfficeId = await getUserOffice(sb);

        const { data: transfer } = await sb
            .from("transfers")
            .select(
                "id, amount, createdAt:created_at, payee:payee_id(name, surname, phone), issuingOffice:issuing_office_id(names, country:country_id(flag, names))"
            )
            .eq("id", decode(code))
            .eq("collection_office_id", collectionOfficeId)
            .eq("status", "pending")
            .throwOnError()
            .single();

        return res.json(transfer as TransferResponse);
    } catch (e) {
        return res.status(constants.HTTP_STATUS_NOT_FOUND).end();
    }
};

export default getTransfer;
