import type { SSRConfig } from "next-i18next";
import type { GetStaticProps } from "next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Dashboard } from "@/components";

export default Dashboard;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps<SSRConfig> = async context => ({
    props: {
        ...(await serverSideTranslations(context.locale))
    }
});

// const { push, pathname, asPath, query } = useRouter();
// <button onClick={() => push({ pathname, query }, asPath, { locale: "es" })}>Change</button>
