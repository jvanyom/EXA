import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseFunctionFetcher } from "@/utils";

export const useMaxAmount = (office?: number) => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR<number, PostgrestError>(
        !!office && ["max_transfer_amount", { office }],
        supabaseFunctionFetcher(sb)
    );

    return {
        maxAmount: data ?? 0,
        loadingMaxAmount: !data && !error && office,
        maxAmountError: error
    };
};
