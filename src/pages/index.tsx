import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SignIn } from "@/components";

export default SignIn;

// noinspection JSUnusedGlobalSymbols
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale))
    }
});
