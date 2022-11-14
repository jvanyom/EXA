import type { GetServerSideProps } from "next";
import type { SSRConfig } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Withdraw } from "@/components";

export default Withdraw;

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<SSRConfig> = async context => ({
    props: {
        ...(await serverSideTranslations(context.locale))
    }
});
