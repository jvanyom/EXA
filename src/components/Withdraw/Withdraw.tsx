import type { Database } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import { useState } from "react";

import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { parsePhoneNumber } from "libphonenumber-js";
import { useTranslation } from "next-i18next";

import { GradientButton, Layout, Spinner } from "@/components";
import { useOffice, useSettings, useTransfer } from "@/hooks";

export const Withdraw = () => {
    const sb = useSupabaseClient<Database>();
    const router = useRouter();

    const code = router.query.code as string;

    const { transfer, loadingTransfer, transferError } = useTransfer(code);

    const [loading, setLoading] = useState(false);

    const { office, loadingOffice } = useOffice();
    const { settings, loadingSettings } = useSettings();

    const { t, i18n } = useTranslation();

    const withdraw = async () => {
        setLoading(true);

        console.log("Hello");
    };

    return (
        <Layout>
            {loadingTransfer || loadingOffice || loadingSettings ? (
                <Spinner className="text-primary" fullPage />
            ) : (
                <section className="flex flex-col flex-1 items-center justify-center relative select-none">
                    {transferError ? (
                        <>
                            <FaceFrownIcon className="text-smooth" width={100} />
                            <span className="text-smooth mt-4 text-xl">
                                {t("pages.withdraws.errors.transfer.sorry-not-exists", { value: code })}
                            </span>
                        </>
                    ) : (
                        <>
                            <section className="flex flex-col gap-y-6 w-2/5 h-2/3 border-ticket p-14 bg-white rounded-md text-secondary [&_*]:font-inter">
                                <section className="grid grid-cols-2 items-center pb-8 border-b-2 border-dashed border-secondary text-2xl">
                                    <div className="flex justify-center gap-x-4 text-3xl bg-secondary py-2 rounded-md font-extrabold">
                                        <span className="text-tertiary !font-secondary">#</span>
                                        <span className="text-white">{code}</span>
                                    </div>
                                    <span className="font-bold text-smooth text-right">
                                        {t("common.format.date", { value: new Date(transfer?.createdAt) })}
                                    </span>
                                </section>
                                <div className="flex flex-col items-center gap-y-2 p-2 rounded-md shadow-md">
                                    <span className="max-w-full text-3xl text-center text-ellipsis uppercase font-extrabold overflow-hidden">
                                        {`${transfer.payee.name} ${transfer.payee.surname}`}
                                    </span>
                                    <span className="text-smooth">
                                        {parsePhoneNumber(transfer.payee.phone).formatNational()}
                                    </span>
                                </div>
                                <section className="flex justify-between">
                                    <div className="flex flex-col items-center gap-x-4 py-2 bg-primary rounded-md shadow-lg">
                                        <Image
                                            width={75}
                                            height={50}
                                            src={office.country.flag}
                                            alt={office.country.names[i18n.resolvedLanguage]}
                                            className="circle"
                                        />
                                        <span className="font-extrabold text-white uppercase">
                                            {office.names[i18n.resolvedLanguage]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-x-4 py-2 bg-primary rounded-md shadow-lg">
                                        <Image
                                            width={75}
                                            height={50}
                                            src={transfer.issuingOffice.country.flag}
                                            alt={transfer.issuingOffice.country.names[i18n.resolvedLanguage]}
                                            className="circle"
                                        />
                                        <span className="font-extrabold text-white uppercase">
                                            {transfer.issuingOffice.names[i18n.resolvedLanguage]}
                                        </span>
                                    </div>
                                </section>
                                <span className="mt-auto text-center text-5xl font-extrabold">
                                    {t("common.format.currency", {
                                        value: transfer.amount,
                                        currency: settings.currency
                                    })}
                                </span>
                            </section>
                            <GradientButton
                                title="common.terms.withdraw"
                                className="absolute bottom-0 w-1/3 text-3xl"
                                titleClassName="font-inter font-extrabold uppercase"
                                loading={loading}
                                onClick={withdraw}
                            />
                        </>
                    )}
                </section>
            )}
        </Layout>
    );
};
