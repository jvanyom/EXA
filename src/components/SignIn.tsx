import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import type { Credential } from "@/types";

import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LayoutGroup, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useEffect } from "react";

import { FormError, GradientButton, LabeledInput, Logo, Spinner } from "@/components";
import { credentialSchema } from "@/schemas";

export const SignIn = () => {
    const { register, handleSubmit, formState } = useForm<Credential>({
        resolver: yupResolver(credentialSchema)
    });

    const { isLoading, supabaseClient } = useSessionContext();
    const user = useUser();

    const { t } = useTranslation();
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/dashboard");
    }, [router]);

    useEffect(() => {
        if (user && !isLoading) router.push("/dashboard");
    }, [user, isLoading, router]);

    const submit: SubmitHandler<Credential> = async credential => {
        const { error } = await supabaseClient.auth.signInWithPassword(credential);

        if (error) {
            toast.error(
                t("common.errors.non-valid", { context: "female", count: 2, field: "common.terms.credentials" }),
                { toastId: "non-valid-credentials", className: "uppercase" }
            );

            return Promise.reject(error);
        }
    };

    if (user || isLoading) return <Spinner className="text-primary" fullPage />;

    return (
        <div className="flex items-center justify-center h-screen bg-primary/40 overflow-hidden">
            <LayoutGroup>
                <motion.section
                    layout
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center space-y-14 py-14 px-20 bg-white/75 rounded-none lg:rounded-sm overflow-hidden shadow-lg w-full xl:w-1/4 h-full xl:h-auto"
                >
                    <Logo width={220} />
                    <motion.form layout onSubmit={handleSubmit(submit)} className="flex flex-col w-full">
                        <LabeledInput {...register("email")} label="common.terms.email" Icon={AtSymbolIcon} />
                        <FormError
                            error={
                                formState.errors.email?.type === "email" ? { type: "invalid" } : formState.errors.email
                            }
                            field="common.terms.email"
                        />
                        <LabeledInput
                            {...register("password")}
                            type="password"
                            label="common.terms.password"
                            className="mt-2 xl:mt-12"
                            Icon={LockClosedIcon}
                        />
                        <FormError error={formState.errors.password} field="common.terms.password" context="female" />
                        <GradientButton
                            type="submit"
                            title="pages.sign-in.name"
                            className="text-lg justify-center mt-14"
                            loading={formState.isSubmitting || formState.isValidating}
                        />
                    </motion.form>
                </motion.section>
            </LayoutGroup>
        </div>
    );
};
