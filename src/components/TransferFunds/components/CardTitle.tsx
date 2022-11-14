import type { PropsWithClassName } from "@/types";

import { useTranslation } from "next-i18next";
import clsx from "clsx";

type CardTitleProps = PropsWithClassName<{
    title: string;
}>;

export const CardTitle = ({ title, className }: CardTitleProps) => {
    const styles = clsx(
        "w-full p-3 first-letter:uppercase font-secondary font-bold text-2xl shadow-lg select-none",
        !className?.includes("bg-") && "bg-primary",
        !className?.includes("text-") && "text-white",
        className
    );

    const { t } = useTranslation();

    return <h2 className={styles}>{t(title)}</h2>;
};
