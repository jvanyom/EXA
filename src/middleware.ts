import type { NextRequest } from "next/server";

import type { Database } from "@/types";

import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// noinspection JSUnusedGlobalSymbols
export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next();

    const sb = createMiddlewareSupabaseClient<Database>({ req, res });

    const {
        data: { session },
        error
    } = await sb.auth.getSession();

    if (!session || error) {
        const redirectURL = req.nextUrl.clone();
        redirectURL.pathname = "/";

        return NextResponse.redirect(redirectURL);
    }

    return res;
};

// noinspection JSUnusedGlobalSymbols
export const config = {
    matcher: "/dashboard/:path*"
};
