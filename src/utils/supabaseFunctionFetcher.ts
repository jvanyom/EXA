import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types";

type Functions = Database["public"]["Functions"];

export const supabaseFunctionFetcher =
    (client: SupabaseClient<Database>) =>
    async <FunctionName extends keyof Functions>(
        functionName: FunctionName,
        args?: Functions[FunctionName]["Args"]
    ) => {
        const { data } = await client.rpc(functionName, args).throwOnError().maybeSingle();

        return data;
    };
