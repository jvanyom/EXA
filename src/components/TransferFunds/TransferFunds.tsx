import type { SubmitHandler } from "react-hook-form";

import type { Transfer, ValidationError } from "@/types";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { transferSchema } from "@/schemas";
import { useMinAmount } from "@/hooks";
import { Layout } from "@/components";

import { Customer, Amount, Offices, Summary } from "./components";

const defaultValues: Transfer = {
    sender: { name: "", surname: "", phone: "" },
    payee: { name: "", surname: "", phone: "" },
    collectionOffice: 0,
    amount: 0
};

export const TransferFunds = () => {
    const { minAmount } = useMinAmount();

    const form = useForm<Transfer>({
        resolver: yupResolver(transferSchema),
        context: { minAmount },
        defaultValues
    });

    const {
        reset,
        formState,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        formState: { isSubmitSuccessful }
    } = form;

    const { t } = useTranslation();

    useEffect(() => {
        if (formState.isSubmitSuccessful) reset(defaultValues);
    }, [formState, reset]);

    const submit: SubmitHandler<Transfer> = async data => {
        const response = await fetch("/api/transfer", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const error = (await response.json()) as ValidationError | ValidationError[];
            const isArray = Array.isArray(error);

            if (!isArray && error.type === "unknown") {
                toast.error(t("common.errors.unknown"), { toastId: error.type });
            } else {
                const errors = isArray ? error : [error];

                errors.forEach(e => {
                    form.setError(e.path, {
                        type: e.type,
                        ...((e.value || e.message) && { message: e.value?.toString() ?? e.message })
                    });
                });
            }

            return Promise.reject();
        }

        toast.success(t("pages.transfer-funds.success"), { toastId: "transfer" });
    };

    return (
        <Layout title="transfer-funds">
            <FormProvider {...form}>
                <form
                    onSubmit={form.handleSubmit(submit)}
                    className="flex flex-col xl:grid xl:grid-cols-3 xl:grid-rows-[auto_1fr_minmax(150px,1fr)] gap-8 flex-1"
                >
                    <Customer type="sender" />
                    <Customer type="payee" />
                    <Amount />
                    <Offices className="col-span-2 row-span-2" />
                    <Summary className="row-span-2" />
                </form>
            </FormProvider>
        </Layout>
    );
};
