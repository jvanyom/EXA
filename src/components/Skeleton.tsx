import type { PropsWithClassName } from "@/types";

import clsx from "clsx";

type SkeletonProps = PropsWithClassName<{
    type?: "rect" | "circle";
}>;

export const Skeleton = ({ type = "rect", className }: SkeletonProps) => {
    return (
        <div
            className={clsx(
                "w-full",
                "animate-pulse",
                "bg-light-smooth",
                `rounded-${{ rect: "md", circle: "full" }[type]}`,
                className
            )}
        />
    );
};
