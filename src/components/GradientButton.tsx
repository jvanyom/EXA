import type { ButtonProps } from "@/components";

import clsx from "clsx";

import { Button } from "@/components";

export const GradientButton = ({ className, ...buttonProps }: ButtonProps) => {
    return <Button {...buttonProps} className={clsx("gradient-theme shadow-md text-white", className)} />;
};
