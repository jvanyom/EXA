import type { PropsWithClassName } from "@/types";

import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

import { useTranslation } from "next-i18next";
import Image from "next/future/image";

type OfficeItemProps = PropsWithClassName<{
    name: string;
    availableCash: number;
    selected: boolean;
    onSelect: () => void;
    onBlur: () => void;
    country: {
        name: string;
        flag: string;
    };
}>;

export const OfficeItem = ({ name, country, availableCash, onSelect, selected, onBlur }: OfficeItemProps) => {
    const styles = clsx(
        "relative grid grid-cols-3 items-center px-3 py-4 border-b border-light-smooth cursor-pointer transition duration-300 ease-out",
        {
            "bg-secondary text-white font-bold": selected,
            "text-secondary hover:bg-[#CFCFCF] hover:font-bold": !selected
        }
    );

    const { t } = useTranslation();

    return (
        <section className={styles} onClick={onSelect} onBlur={onBlur}>
            <section className="flex items-center space-x-2">
                <Image src={country.flag} width={35} height={23} alt={country.name} />
                <span className="hidden xl:inline">{country.name}</span>
            </section>
            <span>{name}</span>
            <span>{t("common.format.number", { value: availableCash })}</span>
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-3 flex items-center space-x-2 rounded-xl bg-white border border-green-500 p-2 text-green-500"
                    >
                        <CheckBadgeIcon width={17} />
                        <span className="text-xs uppercase font-bold">{t("common.terms.selected")}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
