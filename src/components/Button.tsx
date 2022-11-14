import type { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";

import type { PropsWithClassName, TIcon } from "@/types";

import { useTranslation } from "next-i18next";
import Link from "next/link";
import clsx from "clsx";

import { Spinner } from "@/components";

type PartialBy<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>;

type BaseButtonProps = {
    title: string;
    Icon: TIcon;
};

type Clickable = PropsWithClassName<{
    href?: string;
    left?: boolean;
    loading?: boolean;
    iconWidth?: number;
    rounded?: boolean;
    hoverAnimation?: boolean;
}> &
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export type ButtonProps = Omit<Clickable, "hasIcon"> &
    (PartialBy<BaseButtonProps, "title"> | PartialBy<BaseButtonProps, "Icon">) & {
        titleClassName?: string;
    };

const LinkOrButton = ({
    href,
    type = "button",
    onClick,
    left = false,
    loading = false,
    rounded = true,
    hoverAnimation = true,
    iconWidth,
    children,
    className
}: PropsWithChildren<Clickable>) => {
    const styles = clsx(
        "flex items-center justify-center py-3 px-6 font-secondary font-bold focus:outline-none",
        hoverAnimation && "transition duration-200 ease-out hover:ease-in hover:scale-105",
        loading && "justify-center cursor-pointer",
        left && "flex-row-reverse",
        rounded && "rounded-md",
        className
    );

    if (loading)
        return (
            <div className={styles}>
                <Spinner width={iconWidth} />
            </div>
        );

    return href ? (
        <Link href={href} passHref>
            <a className={styles}>{children}</a>
        </Link>
    ) : (
        <button onClick={onClick} className={styles} type={type}>
            {children}
        </button>
    );
};

export const Button = ({ title, titleClassName, Icon, iconWidth = 25, ...clickableProps }: ButtonProps) => {
    const { t } = useTranslation();

    return (
        <LinkOrButton {...clickableProps}>
            {Icon && <Icon className="hidden xl:inline" width={iconWidth} strokeWidth={2} />}
            <span className={titleClassName ?? "first-letter:uppercase"}>{t(title)}</span>
        </LinkOrButton>
    );
};
