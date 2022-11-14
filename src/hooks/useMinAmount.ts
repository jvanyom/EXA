import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseFunctionFetcher } from "@/utils";

export const useMinAmount = () => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR<number, PostgrestError>("min_transfer_amount", supabaseFunctionFetcher(sb));

    return {
        minAmount: data,
        loadingMinAmount: !data && !error,
        minAmountError: error
    };
};
