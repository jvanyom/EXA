import type { CustomerType, Transfer } from "@/types";

import { useFormContext, useFormState, Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { FormError } from "@/components";

import { Card } from "@/components/TransferFunds/components";

import { PhoneInput } from "./components";
import { LayoutGroup } from "framer-motion";

type CustomerProps = {
    type: CustomerType;
};

const fieldStyles = "flex flex-col basis-full max-w-full gap-y-2";

export const Customer = ({ type }: CustomerProps) => {
    const { register } = useFormContext<Transfer>();

    const { errors } = useFormState<Transfer>({
        name: [`${type}.name`, `${type}.surname`, `${type}.phone`]
    });

    const { t } = useTranslation();

    return (
        <Card title={`common.terms.${type}`} bodyClassName="flex flex-wrap gap-3 py-8">
            <LayoutGroup id={type}>
                <div className={clsx(fieldStyles, "xl:flex-1")}>
                    <input
                        {...register(`${type}.name`, { setValueAs: value => value.toUpperCase() })}
                        placeholder={t("common.terms.name")}
                    />
                    <FormError error={errors[type]?.name} field="common.terms.name" />
                </div>
                <div className={clsx(fieldStyles, "xl:flex-1")}>
                    <input
                        {...register(`${type}.surname`, { setValueAs: value => value.toUpperCase() })}
                        placeholder={t("common.terms.surname")}
                    />
                    <FormError error={errors[type]?.surname} field="common.terms.surname" />
                </div>
                <div className={fieldStyles}>
                    <Controller name={`${type}.phone`} render={({ field }) => <PhoneInput {...field} />} />
                    <FormError
                        error={errors[type]?.phone}
                        field="common.terms.phone"
                        namespace={
                            errors[type]?.phone?.type === "phone.discrepancy"
                                ? "pages.transfer-funds.errors"
                                : undefined
                        }
                    />
                </div>
            </LayoutGroup>
        </Card>
    );
};
