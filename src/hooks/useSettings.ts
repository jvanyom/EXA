import type { PostgrestError } from "@supabase/supabase-js";
import type { Database, Settings } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import useSWR from "swr";

import { supabaseTableFetcher } from "@/utils";

export const useSettings = () => {
    const sb = useSupabaseClient<Database>();

    const { data, error } = useSWR("settings", supabaseTableFetcher(sb));

    return {
        settings: data?.reduce(
            (prev, { key, value }) => ({ ...prev, [key]: isNaN(+value) ? value : +value }),
            {} as Settings
        ),
        loadingSettings: !error && !data,
        settingsError: error as PostgrestError
    };
};
