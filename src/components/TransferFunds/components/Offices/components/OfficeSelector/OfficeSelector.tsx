import type { ChangeEvent } from "react";

import type { ControllerInputProps, Office } from "@/types";

import { FaceFrownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "next-i18next";
import { useMemo, useState } from "react";

import { useOffices, useSettings, useOffice } from "@/hooks";
import { Skeleton } from "@/components";

import { CardTitle } from "@/components/TransferFunds/components";

import { OfficeItem } from "./components";

type OfficeSelectorProps = Omit<ControllerInputProps<number>, "name">;

const getFilteredOffices = (offices: Office[], filter: string, language: string) => {
    const value = filter.toLocaleLowerCase(language);

    return offices?.filter(
        ({ names, country }) =>
            names[language].toLocaleLowerCase(language).includes(value) ||
            country.names[language].toLocaleLowerCase(language).includes(value)
    );
};

export const OfficeSelector = ({ value, onChange, onBlur }: OfficeSelectorProps) => {
    const { offices, loadingOffices } = useOffices();
    const { settings, loadingSettings } = useSettings();
    const { office, loadingOffice } = useOffice();

    const [collectionOffice, setCollectionOffice] = useState(value);
    const [filter, setFilter] = useState("");

    const { t, i18n } = useTranslation();

    const filteredOffices = useMemo(() => {
        return getFilteredOffices(offices, filter, i18n.resolvedLanguage);
    }, [offices, filter, i18n.resolvedLanguage]);

    const loading = loadingOffices || loadingOffice || loadingSettings || !filteredOffices;

    if (!value && value !== collectionOffice) setCollectionOffice(value);

    const filterOffices = (event: ChangeEvent<HTMLInputElement>) => setFilter(event.currentTarget.value);

    const select = (id: number) => () => {
        setCollectionOffice(id);
        onChange(id);
    };

    return (
        <>
            <section className="relative flex items-center">
                <CardTitle title="pages.transfer-funds.collection-office" />
                <div className="hidden sm:flex absolute right-3 items-center justify-end w-1/4">
                    <input
                        onChange={filterOffices}
                        placeholder={t("pages.transfer-funds.search-office")}
                        className="py-1.5 rounded-sm w-full"
                    />
                    <MagnifyingGlassIcon width={25} className="absolute right-3 text-smooth hidden xl:inline" />
                </div>
            </section>
            {loading ? (
                <Skeleton className="h-full" />
            ) : (
                <section className="flex flex-col flex-auto p-3">
                    <section className="grid grid-cols-3 p-3 font-bold text-lg bg-light-smooth text-smooth rounded-t-lg">
                        <span className="font-secondary capitalize">{t("common.terms.country")}</span>
                        <span className="font-secondary capitalize">{t("common.terms.city")}</span>
                        <span className="hidden xl:inline font-secondary first-letter:uppercase">
                            {t("pages.transfer-funds.available-cash", { currency: settings.currency })}
                        </span>
                        <span className="inline xl:hidden font-secondary">{settings.currency}</span>
                    </section>
                    <section className="relative flex-[1_0_1px] overflow-y-auto">
                        {filteredOffices.length ? (
                            filteredOffices
                                .filter(({ id }) => id !== office.id)
                                .map(({ id, names, country, availableCash }) => (
                                    <OfficeItem
                                        key={id}
                                        name={names[i18n.resolvedLanguage]}
                                        country={{ name: country.names[i18n.resolvedLanguage], flag: country.flag }}
                                        availableCash={availableCash}
                                        onSelect={select(id)}
                                        onBlur={onBlur}
                                        selected={id === collectionOffice}
                                    />
                                ))
                        ) : (
                            <section className="flex flex-col items-center justify-center h-full select-none">
                                <FaceFrownIcon className="text-smooth" width={65} />
                                <span className="text-smooth mt-4">{t("common.errors.empty")}</span>
                            </section>
                        )}
                    </section>
                </section>
            )}
        </>
    );
};
