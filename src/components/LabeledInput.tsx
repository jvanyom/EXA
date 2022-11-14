import type { ChangeHandler } from "react-hook-form";

import type { PropsWithClassName, TIcon } from "@/types";

import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { forwardRef } from "react";
import clsx from "clsx";

type InputProps = PropsWithClassName<{
    label: string;
    name: string;
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    i18nValues?: Record<string, never>;
    innerClassName?: string;
    Icon?: TIcon;
    type?: string;
}>;

export const LabeledInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { label, name, i18nValues, Icon, innerClassName, className, ...handlerProps } = props;

    const inputStyles = clsx(
        "w-full py-2 pl-1 lg:pl-4 border-none focus:border-none focus:ring-0 focus:outline-none text-lg text-primary",
        { "bg-[#eeeeee]": !innerClassName },
        innerClassName
    );

    const { t } = useTranslation();

    return (
        <motion.section layout className={clsx("flex flex-col space-y-2", className)}>
            <label
                className="first-letter:uppercase text-xl text-primary font-bold font-secondary select-none"
                htmlFor={name}
            >
                {t(label, i18nValues)}
            </label>
            <div className="flex shadow-md rounded-l-lg overflow-hidden">
                {Icon && (
                    <div className="flex items-center p-3 bg-primary">
                        <Icon width={20} strokeWidth={2} className="text-white hidden lg:block" />
                        <Icon width={30} strokeWidth={2} className="text-white lg:hidden" />
                    </div>
                )}
                <input ref={ref} id={name} name={name} {...handlerProps} className={inputStyles} />
            </div>
        </motion.section>
    );
});

LabeledInput.displayName = "LabeledInput";
