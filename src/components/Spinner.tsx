import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types";

import clsx from "clsx";

type SpinnerProps = PropsWithClassName<{
    width?: number;
    fullPage?: boolean;
}>;

const FullPage = ({ fullPage, children }: PropsWithChildren<Pick<SpinnerProps, "fullPage">>) => {
    return fullPage ? <div className="grid place-content-center h-screen">{children}</div> : <>{children}</>;
};

export const Spinner = ({ width = 35, className, fullPage = false }: SpinnerProps) => {
    return (
        <FullPage fullPage={fullPage}>
            <svg className={clsx("animate-spin", className)} viewBox="0 0 24 24" width={fullPage ? 150 : width}>
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={4}
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        </FullPage>
    );
};
