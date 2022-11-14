import type { TFormError } from "@/types";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useTransfer } from "@/hooks";

export const useTransferState = () => {
    const [code, setCode] = useState("");

    const { transfer, loadingTransfer, transferError } = useTransfer(code);

    const router = useRouter();

    useEffect(() => {
        if (transfer && !loadingTransfer && !transferError) {
            router.push(`/dashboard/withdraws/${code}`);
        }
    }, [transfer, loadingTransfer, transferError, router, code]);

    return {
        loadingTransfer,
        setTransferCode: setCode,
        transferError: transferError
            ? ({ path: "pages.withdraws.errors.transfer", type: "not-exists", value: code } as TFormError)
            : null
    };
};
