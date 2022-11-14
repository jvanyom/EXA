import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database, ID } from "@/types";

export const getUserOffice = async (supabaseClient: SupabaseClient<Database>) => {
    const {
        data: { office }
    } = await supabaseClient.from("profiles").select("office:offices(id)").throwOnError().single();

    const { id } = office as ID;

    return id;
};
