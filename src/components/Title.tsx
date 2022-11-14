import type { PropsWithClassName } from "@/types";

import { useTranslation } from "next-i18next";
import clsx from "clsx";

type TitleProps = PropsWithClassName<{
    title: string;
}>;

export const Title = ({ title, className }: TitleProps) => {
    const { t } = useTranslation();

    return (
        <section className={clsx("box p-4", className)}>
            <h2 className="text-2xl lg:text-3xl font-extrabold first-letter:uppercase font-secondary bg-clip-text text-transparent gradient-theme w-fit select-none">
                {t(title)}
            </h2>
        </section>
    );
};
