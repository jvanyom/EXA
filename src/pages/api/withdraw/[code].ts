import type { NextApiRequest, NextApiResponse } from "next";

import type { Database, ID } from "@/types";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { constants } from "http2";

import { decode } from "@/utils/server/hasher";

const withdrawTransfer = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(constants.HTTP_STATUS_METHOD_NOT_ALLOWED).end();

    const sb = createServerSupabaseClient<Database>({ req, res });

    const {
        data: { session },
        error
    } = await sb.auth.getSession();

    if (!session || error) return res.status(constants.HTTP_STATUS_UNAUTHORIZED).end();

    try {
        const {
            data: { office }
        } = await sb.from("profiles").select("office:offices(id)").throwOnError().single();

        const { id: collectionOfficeId } = office as ID;

        const { data } = await sb
            .from("transfers")
            .update({ status: "completed" })
            .eq("id", decode(req.query.code as string))
            .eq("collection_office_id", collectionOfficeId)
            .eq("status", "pending");
    } catch {
        return res.status(constants.HTTP_STATUS_NOT_FOUND).end();
    }
};

export default withdrawTransfer;
