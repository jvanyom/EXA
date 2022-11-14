import type { PostgrestError } from "@supabase/supabase-js";
import type { Database, Office } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseTableFetcher } from "@/utils";

export const useOffice = () => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR(
        ["profiles", "office:offices(id, names, country:countries(id, code, flag, names))" as const],
        supabaseTableFetcher(sb)
    );

    return {
        office: data?.[0]?.office as Office,
        loadingOffice: !error && !data?.[0]?.office,
        officeError: error as PostgrestError
    };
};
