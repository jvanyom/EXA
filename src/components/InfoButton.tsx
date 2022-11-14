import type { ButtonProps } from "@/components";

import clsx from "clsx";

import { Button } from "@/components";

export const InfoButton = ({ className, ...buttonProps }: ButtonProps) => {
    return <Button {...buttonProps} className={clsx("bg-primary/40", className)} />;
};
