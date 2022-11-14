import type { Gender, PropsWithClassName, TFormError } from "@/types";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import clsx from "clsx";

type FormErrorProps = PropsWithClassName<{
    error: TFormError | null | false;
    namespace?: string;
    field?: string;
    context?: Gender;
    plural?: boolean;
    rounded?: boolean;
    lowercase?: boolean;
}>;

export const FormError = ({
    error,
    field,
    namespace,
    context = "male",
    plural = false,
    lowercase = true,
    rounded = true,
    className
}: FormErrorProps) => {
    const styles = clsx(
        "flex items-center text-xs my-3 p-2 bg-red-800 select-none text-white font-bold font-secondary",
        rounded && "rounded-md",
        className
    );

    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles}
                >
                    <ExclamationTriangleIcon className="mr-4" width={20} />
                    <span className={clsx("first-letter:uppercase", lowercase && "lowercase")}>
                        {t(`${namespace ?? error.path ?? "common.errors"}.${error.type}`, {
                            field,
                            context,
                            count: plural ? 2 : 1,
                            ...((error.value || error.message) && { value: error.value ?? error.message })
                        })}
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
