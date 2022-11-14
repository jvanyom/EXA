import type { PropsWithChildren } from "react";

import type { PropsWithClassName } from "@/types";

import clsx from "clsx";

import { Box } from "@/components";

import { CardTitle } from "./CardTitle";

type CardProps = PropsWithChildren<
    PropsWithClassName<{
        title: string;
        bodyClassName?: string;
    }>
>;

export const Card = ({ title, children, className, bodyClassName }: CardProps) => {
    return (
        <Box className={className}>
            <CardTitle title={title} />
            <section className={clsx("p-3", bodyClassName)}>{children}</section>
        </Box>
    );
};
