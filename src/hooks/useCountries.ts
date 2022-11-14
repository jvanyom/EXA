import type { PostgrestError } from "@supabase/supabase-js";
import type { Country, Database } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseTableFetcher } from "@/utils";

export const useCountries = () => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR(
        "countries",
        supabaseTableFetcher(sb, filter => filter.order("id", { ascending: true }))
    );

    return {
        countries: data as Country[],
        loadingCountries: !error && !data,
        countriesError: error as PostgrestError
    };
};
