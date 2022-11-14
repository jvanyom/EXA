import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types";

import { useTranslation } from "next-i18next";
import clsx from "clsx";

import { Spinner } from "@/components";

type MetricProps = PropsWithChildren<
    PropsWithClassName<{
        title: string;
        metric: number;
        type?: "number" | "percentage";
        currency?: string;
        titleClassName?: string;
        metricClassName?: string;
        bodyClassName?: string;
        loading?: boolean;
    }>
>;

export const Metric = ({
    type = "number",
    loading = false,
    title,
    metric,
    currency,
    children,
    className,
    titleClassName,
    metricClassName,
    bodyClassName
}: MetricProps) => {
    const { t } = useTranslation();

    return (
        <section className={clsx("flex items-center justify-between select-none", className)}>
            <section className={children ? "flex gap-x-2" : undefined}>
                <p className={clsx(bodyClassName, titleClassName)}>{t(title)}</p>
                {children}
            </section>
            {loading ? (
                <Spinner width={23} className="text-primary" />
            ) : (
                <span className={clsx(bodyClassName, metricClassName)}>
                    {t(`common.format.${currency ? "currency" : type}`, {
                        value: metric,
                        ...(currency && { currency })
                    })}
                </span>
            )}
        </section>
    );
};
