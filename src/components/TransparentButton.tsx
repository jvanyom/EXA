import type { ButtonProps } from "@/components";

import clsx from "clsx";

import { Button } from "@/components";

export const TransparentButton = ({ className, ...buttonProps }: ButtonProps) => {
    return (
        <Button
            {...buttonProps}
            className={clsx("text-smooth hover:shadow-lg hover:bg-primary hover:text-white", className)}
        />
    );
};
