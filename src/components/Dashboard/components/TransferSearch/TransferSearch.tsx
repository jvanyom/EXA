import type { ChangeEvent, FormEventHandler } from "react";

import type { TFormError } from "@/types";

import { LayoutGroup, motion } from "framer-motion";
import { ValidationError } from "yup";
import { useState } from "react";

import { Button, FormError } from "@/components";
import { transferCodeSchema } from "@/schemas";
import { LENGTH } from "@/utils/server/hasher";

import { useTransferState } from "./hooks";

export const TransferSearch = () => {
    const [error, setError] = useState<TFormError | "LENGTH">();
    const [code, setCode] = useState("");

    const { setTransferCode, loadingTransfer, transferError } = useTransferState();

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replaceAll(/\W/g, "");

        if (value.length <= LENGTH) setCode(value.toUpperCase());

        if (value.length === LENGTH) setError("LENGTH");
    };

    const submitSearch: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault();

        try {
            const validCode = await transferCodeSchema.validate(code);

            setError(null);
            setTransferCode(validCode);
        } catch (e) {
            if (e instanceof ValidationError) {
                setError({
                    type: e.type,
                    ...(e.message && { message: e.message }),
                    ...(e.params[e.type] && { value: e.params[e.type] as string | number })
                });
            }
        }
    };

    return (
        <form className="flex flex-col gap-y-2 z-20 brightness" onSubmit={submitSearch}>
            <LayoutGroup>
                <motion.input
                    value={code}
                    onChange={change}
                    layout
                    autoFocus
                    className="rounded-t-md font-dosis text-5xl text-center border-none placeholder:text-smooth focus:ring-0 focus:border-none"
                    placeholder="#84D2R9"
                />
                <FormError
                    error={error !== "LENGTH" && (error ?? transferError)}
                    field="pages.withdraws.ref-code"
                    lowercase={false}
                    rounded={false}
                />
                <motion.div layout className="w-full">
                    <Button
                        type="submit"
                        title="common.terms.search"
                        loading={loadingTransfer}
                        rounded={false}
                        hoverAnimation={false}
                        className="bg-tertiary text-primary text-2xl rounded-b-md w-full transition duration-200 ease-out hover:ease-in hover:bg-[#b0ac84] hover:text-white"
                        titleClassName="uppercase font-inter font-extrabold"
                    />
                </motion.div>
            </LayoutGroup>
        </form>
    );
};
