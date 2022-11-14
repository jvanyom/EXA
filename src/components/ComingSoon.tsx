import { useTranslation } from "next-i18next";

export const ComingSoon = () => {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col flex-1 items-center justify-center">
            <h3 className="font-inter font-extrabold uppercase bg-clip-text text-4xl text-transparent bg-gradient-to-r from-secondary to-primary w-fit select-none">
                {t("common.terms.coming-soon")}
            </h3>
        </section>
    );
};
