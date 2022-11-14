import type { PropsWithClassName } from "@/types";

import { useFormState } from "react-hook-form";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { GradientButton, Metric } from "@/components";

import { Card } from "@/components/TransferFunds/components";

import { useCommission } from "./hooks";

export const Summary = ({ className }: PropsWithClassName) => {
    const { commission, transferAmount, total, loadingCommission } = useCommission();
    const { isSubmitting, isValidating } = useFormState();

    const { t } = useTranslation();

    return (
        <section className={clsx("flex flex-col md:text-lg xl:text-xl", className)}>
            <Card title="common.terms.summary" bodyClassName="flex flex-col gap-y-2 text-smooth">
                <Metric
                    title="common.terms.subtotal"
                    metric={transferAmount}
                    className="mt-6"
                    titleClassName="first-letter:uppercase"
                    loading={loadingCommission}
                />
                <Metric
                    title="common.terms.rate"
                    metric={commission.amount}
                    titleClassName="first-letter:uppercase"
                    loading={loadingCommission}
                >
                    {!!commission.percentage && (
                        <span className="font-bold">
                            ({t("common.format.percentage", { value: commission.percentage })})
                        </span>
                    )}
                </Metric>
                {!!commission.compensation && (
                    <Metric
                        title="common.terms.compensation"
                        metric={commission.compensation}
                        titleClassName="first-letter:uppercase"
                        loading={loadingCommission}
                    />
                )}
                <div className="h-1 mb-4 rounded-2xl bg-light-smooth" />
                <Metric
                    title="common.terms.total"
                    metric={total}
                    className="font-bold"
                    titleClassName="first-letter:uppercase"
                    loading={loadingCommission}
                />
            </Card>
            <GradientButton
                type="submit"
                title="common.terms.send"
                className="mt-4 xl:mt-auto"
                loading={isSubmitting || isValidating}
            />
        </section>
    );
};
