import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types";

import clsx from "clsx";

export const Box = ({ children, className }: PropsWithChildren<PropsWithClassName>) => {
    return <section className={clsx("box flex flex-col", className)}>{children}</section>;
};
