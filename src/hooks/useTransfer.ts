import type { TransferResponse } from "@/types";

import useSWR from "swr";

export const useTransfer = (code?: string) => {
    const { data, error } = useSWR<TransferResponse, Error>(code && `/api/transfer/${code}`, {
        shouldRetryOnError: false
    });

    return {
        transfer: data,
        loadingTransfer: code && !data && !error,
        transferError: error
    };
};
