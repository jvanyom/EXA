import type { PostgrestError } from "@supabase/supabase-js";
import type { Key } from "swr";

import type { Database, Transfer } from "@/types";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useWatch } from "react-hook-form";
import useSWR from "swr";

import { supabaseFunctionFetcher } from "@/utils";

type CompensationCommission = {
    compensation: number;
    commission: number;
    percentage: number;
}

export const useCommission = () => {
    const sb = useSupabaseClient<Database>();

    const collectionOffice = useWatch<Transfer>({ name: "collectionOffice" }) as number;
    const senderPhone = useWatch<Transfer>({ name: "sender.phone" }) as string;
    const amount = useWatch<Transfer>({ name: "amount" }) as number;

    const validParams = isValidPhoneNumber(senderPhone ?? "") && !!collectionOffice && !!amount;

    const key: Key = [
        "compensation_commission",
        {
            "sender_phone": senderPhone,
            "collection_office": collectionOffice,
            amount
        } as const
    ];

    const { data, error } = useSWR<CompensationCommission, PostgrestError>(
        validParams && key,
        supabaseFunctionFetcher(sb)
    );

    return {
        commission: {
            compensation: data?.compensation ?? 0,
            percentage: data?.percentage ?? 0,
            amount: data?.commission ?? 0
        },
        transferAmount: amount || 0,
        loadingCommission: !data && !error && validParams,
        total: data && Object.values(data).every(v => v !== null)
            ? amount + data.commission + data.compensation
            : 0
    };
};
