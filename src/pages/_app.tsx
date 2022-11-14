import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import type { SSRConfig } from "next-i18next";
import type { SWRConfiguration } from "swr";
import type { AppProps } from "next/app";

import type { Database } from "@/types";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { appWithTranslation } from "next-i18next";

import { StrictMode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { apiFetcher } from "@/utils";

import "react-toastify/dist/ReactToastify.min.css";

import "@fontsource/libre-franklin/300.css";
import "@fontsource/libre-franklin/400.css";
import "@fontsource/libre-franklin/600.css";
import "@fontsource/libre-franklin/700.css";
import "@fontsource/libre-franklin/800.css";
import "@fontsource/libre-franklin/900.css";

import "@fontsource/quicksand/300.css";
import "@fontsource/quicksand/400.css";
import "@fontsource/quicksand/600.css";
import "@fontsource/quicksand/700.css";

import "@fontsource/dosis/300.css";
import "@fontsource/dosis/400.css";
import "@fontsource/dosis/600.css";
import "@fontsource/dosis/700.css";
import "@fontsource/dosis/800.css";

import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

import "@/styles/globals.css";

type SessionAppProps = AppProps<{ initialSession: Session }> & { pageProps: SSRConfig };

const config: SWRConfiguration = {
    refreshInterval: 0,
    fetcher: apiFetcher
};

const redirects: Partial<Record<AuthChangeEvent, string>> = {
    SIGNED_OUT: "/"
};

const App = ({ Component, pageProps }: SessionAppProps) => {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient<Database>());
    const router = useRouter();

    useEffect(() => {
        const { data } = supabaseClient.auth.onAuthStateChange(event => {
            const redirect = redirects[event];

            if (redirect) router.push(redirect);
        });

        return () => data.subscription.unsubscribe();
    }, [supabaseClient, router]);

    return (
        <StrictMode>
            <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
                <SWRConfig value={config}>
                    <Component {...pageProps} />
                    <ToastContainer className="w-auto" limit={3} bodyClassName="mr-4" theme="colored" />
                </SWRConfig>
            </SessionContextProvider>
        </StrictMode>
    );
};

// noinspection JSUnusedGlobalSymbols
export default appWithTranslation<SessionAppProps>(App);
