import type { GetResult } from "@supabase/postgrest-js/dist/module/select-query-parser";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";

import type { Database } from "@/types";

type DB = Database["public"];
type Tables = DB["Tables"];

type Table<T extends keyof Tables> = Tables[T]["Row"];

type Result<T extends keyof Tables, C extends string> = GetResult<DB, Table<T>, C>;

type FilterBuilder<T extends keyof Tables, C extends string> = PostgrestFilterBuilder<DB, Table<T>, Result<T, C>>;

type Filter<T extends keyof Tables, C extends string> = (filter: FilterBuilder<T, C>) => FilterBuilder<T, C>;

export const supabaseTableFetcher =
    <TableName extends keyof Tables, Columns extends string = "*">(
        client: SupabaseClient<Database>,
        filter?: Filter<TableName, Columns>
    ) =>
    async (tableName: TableName, columns: Columns) => {
        const select = client.from(tableName).select(columns).throwOnError();

        const query = typeof filter === "function" ? filter(select) : select;

        const { data } = await query;

        return data;
    };
