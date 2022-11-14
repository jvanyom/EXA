import type { PropsWithChildren } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

import { GradientButton } from "@/components";
import { PropsWithClassName } from "@/types";
import clsx from "clsx";

type ModalProps = PropsWithClassName<
    PropsWithChildren<{
        display?: boolean;
        handleClose: () => void;
    }>
>;

const dropIn = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        y: "100vh",
        opacity: 0
    }
};

export const Modal = ({ display = false, handleClose, children, className }: ModalProps) => {
    return (
        <AnimatePresence initial={false} mode="wait">
            {display && (
                <motion.dialog
                    className="flex flex-col items-center justify-center fixed inset-0 bg-gray-500/70 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.section
                        onClick={e => e.stopPropagation()}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={clsx("flex flex-col box p-4 text-primary w-1/2", className)}
                    >
                        {children}
                        <GradientButton
                            title="common.terms.confirm"
                            onClick={handleClose}
                            className="xl:justify-center self-center w-1/3"
                            Icon={CheckIcon}
                            left
                        />
                    </motion.section>
                </motion.dialog>
            )}
        </AnimatePresence>
    );
};
