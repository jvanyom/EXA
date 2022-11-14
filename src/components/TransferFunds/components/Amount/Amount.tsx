import type { Transfer } from "@/types";

import { Controller, useFormState } from "react-hook-form";

import { FormError } from "@/components";

import { Card } from "@/components/TransferFunds/components";

import { AmountInput } from "./components";

export const Amount = () => {
    const { errors } = useFormState<Transfer>({ name: "amount" });

    return (
        <Card title="common.terms.amount" bodyClassName="flex flex-col flex-1 justify-center">
            <Controller name="amount" render={({ field }) => <AmountInput {...field} />} />
            <FormError error={errors.amount} field="common.terms.amount" />
        </Card>
    );
};
