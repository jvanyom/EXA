import type { PostgrestError } from "@supabase/supabase-js";

export const isPostgrestError = (e: object): e is PostgrestError => {
    return ["message", "hint", "details", "code"].every(property => property in e);
};
