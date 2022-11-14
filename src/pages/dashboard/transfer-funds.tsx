import type { SSRConfig } from "next-i18next";
import type { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { TransferFunds } from "@/components";

export default TransferFunds;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<SSRConfig> = async context => ({
    props: {
        ...(await serverSideTranslations(context.locale))
    }
});
