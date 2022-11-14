import type { NumberFormatValues } from "react-number-format";

import type { ControllerInputProps, InputStatus, Transfer } from "@/types";

import NumberFormat from "react-number-format";
import { useTranslation } from "next-i18next";
import { forwardRef, useState } from "react";
import { useWatch } from "react-hook-form";

import { useMaxAmount, useSettings } from "@/hooks";
import { FormError, Spinner } from "@/components";

type AmountInputProps = ControllerInputProps<number, string>;

const AMOUNT_STEP = 1000;

const stepper = (maxAmount: number, amount: number | string) => {
    const steppedAmount = Math.min(
        amount ? (typeof amount === "string" ? parseInt(amount) : amount) : 0,
        Math.floor(maxAmount / AMOUNT_STEP)
    );

    return {
        value: steppedAmount * AMOUNT_STEP,
        formatted: (steppedAmount || "").toString()
    };
};

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(({ value, onChange, onBlur }, ref) => {
    const { settings, loadingSettings } = useSettings();

    const collectionOffice = useWatch<Transfer>({ name: "collectionOffice" });
    const [prevCollectionOffice, setPrevCollectionOffice] = useState(collectionOffice);

    const { maxAmount, loadingMaxAmount } = useMaxAmount(collectionOffice as number);

    const [status, setStatus] = useState<InputStatus>("empty");
    const [amount, setAmount] = useState(value);

    const { t } = useTranslation();

    if (!value && value !== amount) {
        setAmount(value);
        setStatus("empty");
    }

    if (collectionOffice !== prevCollectionOffice) {
        setPrevCollectionOffice(collectionOffice);
        setStatus("empty");
    }

    const format = ({ floatValue }: NumberFormatValues) => {
        setStatus(floatValue ? "typing" : "empty");

        const allowedValue = stepper(maxAmount, floatValue);

        setAmount(allowedValue.formatted);
        onChange(allowedValue.value);
    };

    const validator = ({ floatValue, value }: NumberFormatValues) => {
        setStatus(maxAmount ? "typing" : "error");

        const max = Math.floor(maxAmount / AMOUNT_STEP);

        return maxAmount && (!floatValue || floatValue <= max || value.length <= max.toString().length);
    };

    return (
        <section className="flex flex-col gap-y-2 w-full">
            <section className="relative flex items-center">
                <NumberFormat
                    getInputRef={ref}
                    name="amount"
                    value={amount}
                    onBlur={onBlur}
                    onValueChange={format}
                    isAllowed={validator}
                    placeholder="0"
                    className="input p-6 text-2xl w-full focus:ring-0 focus:border-smooth"
                    allowEmptyFormatting={false}
                    allowLeadingZeros={false}
                    allowNegative={false}
                    decimalScale={0}
                    decimalSeparator=","
                    thousandSeparator="."
                />
                {!loadingSettings && (
                    <section className="flex items-center space-x-2 absolute right-4 select-none">
                        <span className="text-smooth text-lg">
                            {t("pages.transfer-funds.amount-multiplier", { value: AMOUNT_STEP })}
                        </span>
                        <span className="text-2xl font-bold text-primary">{settings.currency}</span>
                    </section>
                )}
            </section>
            <span className="flex items-center gap-x-1 ml-1 text-smooth text-sm select-none">
                {loadingMaxAmount ? (
                    <>
                        ({t("common.terms.max")}: {<Spinner className="text-smooth" width={15} />})
                    </>
                ) : (
                    t("pages.transfer-funds.max-amount", { value: maxAmount })
                )}
            </span>
            <FormError
                error={
                    status === "error" && {
                        path: "pages.transfer-funds.errors",
                        type: "office.unselected"
                    }
                }
            />
        </section>
    );
});

AmountInput.displayName = "AmountInput";
