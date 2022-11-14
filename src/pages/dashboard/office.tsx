import type { SSRConfig } from "next-i18next";
import type { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ComingSoon, Layout } from "@/components";

export default function Office() {
    return (
        <Layout>
            <ComingSoon />
        </Layout>
    );
}

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<SSRConfig> = async context => ({
    props: {
        ...(await serverSideTranslations(context.locale))
    }
});
