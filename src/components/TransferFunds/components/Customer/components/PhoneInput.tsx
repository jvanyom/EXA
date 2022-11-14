import type { CountryCode } from "libphonenumber-js";
import type { ChangeEvent } from "react";

import type { ControllerInputProps } from "@/types";

import { AsYouType, validatePhoneNumberLength } from "libphonenumber-js";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { forwardRef, useState } from "react";
import Image from "next/future/image";

import { Skeleton } from "@/components";
import { useCountries } from "@/hooks";

type PhoneInputProps = ControllerInputProps;

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(({ value, name, onChange, onBlur }, ref) => {
    const { countries, loadingCountries } = useCountries();

    const [isSelectorVisible, setIsSelectorVisible] = useState(false);
    const [country, setCountry] = useState(0);
    const [search, setSearch] = useState("");

    const [phone, setPhone] = useState(value);

    const { t, i18n } = useTranslation();

    if (!value && value !== phone) setPhone(value);

    const formatPhoneNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const countryCode = countries[country].code.toUpperCase() as CountryCode;
        const formatter = new AsYouType(countryCode);

        const formattedPhone = formatter.input(event.currentTarget.value);

        const phoneLength = validatePhoneNumberLength(formattedPhone, countryCode);

        if (!phoneLength || ["TOO_SHORT", "NOT_A_NUMBER"].includes(phoneLength)) {
            onChange(formatter.getNumberValue());
            setPhone(formattedPhone);
        }
    };

    const toggleCountrySelector = () => {
        if (!isSelectorVisible) setSearch("");

        setIsSelectorVisible(value => !value);
    };

    const filterCountries = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value.toUpperCase());
    };

    const selectCountry = (countryCode: Lowercase<CountryCode>) => () => {
        setCountry(countries.findIndex(({ code }) => code.toLowerCase() === countryCode));

        toggleCountrySelector();

        onChange("");
        setPhone("");
    };

    if (loadingCountries) return <Skeleton className="h-14" />;

    return (
        <>
            {isSelectorVisible && <div className="absolute inset-0 z-20" onClick={toggleCountrySelector} />}
            <section className="relative">
                <div className="flex flex-wrap gap-3 z-10">
                    <section className="flex flex-1 justify-between md:justify-start 2xl:justify-between items-center input p-3">
                        <Image
                            src={countries[country].flag}
                            width={40}
                            height="0"
                            className="h-auto select-none"
                            alt={countries[country].names[i18n.resolvedLanguage]}
                        />
                        <span className="hidden sm:inline 2xl:hidden ml-2 text-secondary">
                            {countries[country].names[i18n.resolvedLanguage]}
                        </span>
                        <span className="inline xl:hidden 2xl:inline ml-2 2xl:ml-0 text-secondary">
                            (+{countries[country].prefix})
                        </span>
                        <motion.div
                            animate={isSelectorVisible ? { rotate: -180 } : { rotate: 0 }}
                            transition={{ duration: 0.2 }}
                            className="ml-auto 2xl:ml-0 cursor-pointer"
                        >
                            <ChevronDownIcon width={25} className="text-smooth" onClick={toggleCountrySelector} />
                        </motion.div>
                    </section>
                    <input
                        ref={ref}
                        name={name}
                        value={phone}
                        onChange={formatPhoneNumber}
                        onBlur={onBlur}
                        placeholder={t("common.terms.phone")}
                        className="basis-full 2xl:flex-[2]"
                    />
                </div>
                <AnimatePresence>
                    {isSelectorVisible && (
                        <motion.div
                            className="absolute flex flex-col w-full bg-light-smooth border border-smooth overflow-hidden rounded-md shadow-xl max-h-80 z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, y: 15 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <input
                                autoFocus
                                value={search}
                                onChange={filterCountries}
                                placeholder={t("pages.transfer-funds.search-country")}
                                className="py-2 max-w-full m-4"
                            />
                            <ul className="max-h-full overflow-y-scroll">
                                {countries
                                    .filter(({ names }) => names[i18n.resolvedLanguage].toUpperCase().includes(search))
                                    .map(({ code, names, flag }) => (
                                        <li
                                            key={code}
                                            onClick={selectCountry(code)}
                                            className="flex items-center space-x-4 pl-4 py-4 text-secondary cursor-pointer transition duration-200 hover:bg-primary hover:text-white"
                                        >
                                            <Image
                                                src={flag}
                                                width={35}
                                                height="0"
                                                alt={names[i18n.resolvedLanguage]}
                                                className="h-auto border border-white"
                                            />
                                            <span className="font-bold select-none">
                                                {names[i18n.resolvedLanguage]}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
});

PhoneInput.displayName = "PhoneInput";
