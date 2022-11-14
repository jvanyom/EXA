import type { PostgrestError } from "@supabase/supabase-js";
import type { Database, Office } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseTableFetcher } from "@/utils";

export const useOffices = () => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR(
        ["offices", "id, names, country:countries(id, names, flag), availableCash:available_cash" as const],
        supabaseTableFetcher(sb)
    );

    return {
        offices: data as Office[],
        loadingOffices: !error && !data,
        officesError: error as PostgrestError
    };
};
