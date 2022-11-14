import type { PropsWithChildren } from "react";
import type { Variants } from "framer-motion";

import type { PropsWithClassName, Database, TIcon } from "@/types";

import {
    ArrowRightOnRectangleIcon,
    ArrowLongRightIcon,
    BuildingOfficeIcon,
    RectangleGroupIcon,
    LanguageIcon,
    Bars3Icon
} from "@heroicons/react/24/outline";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { TransparentButton, GradientButton, Logo, Title } from "@/components";

type MenuItem = PropsWithClassName<{
    Icon: TIcon;
    title: string;
    href: string;
}>;

type LayoutProps = PropsWithChildren<{
    title?: string;
}>;

const variants: Variants = {
    in: {
        opacity: 1,
        transition: {
            duration: 0.25,
            ease: "easeIn"
        }
    },
    out: {
        opacity: 0,
        transition: {
            duration: 0.35,
            delay: 0.1
        }
    }
};

const menu: (Omit<MenuItem, "className" | "href"> & { href?: string })[] = [
    { Icon: RectangleGroupIcon, title: "pages.dashboard.name" },
    { Icon: BuildingOfficeIcon, title: "pages.office.name" },
    // { Icon: ChartPieIcon, title: "pages.stats.name" },
    { Icon: LanguageIcon, title: "menu.language.name" }
];

const menuButtonCommonStyles = "gap-x-0 xl:gap-x-4";

export const Layout = ({ children, title }: LayoutProps) => {
    const [openMenu, setOpenMenu] = useState(true);

    const sb = useSupabaseClient<Database>();

    const signOut = async () => await sb.auth.signOut();

    const toggleMenu = () => setOpenMenu(v => !v);

    return (
        <section className="flex flex-col lg:flex-row h-screen">
            <header className="flex flex-col lg:basis-1/6 relative lg:shadow-2xl">
                <div className="flex justify-between items-center lg:justify-center bg-white py-5 px-7 z-20">
                    <Logo width={200} />
                    <Bars3Icon width={50} className="block lg:hidden text-primary" onClick={toggleMenu} />
                </div>
                <AnimatePresence>
                    {openMenu && (
                        <motion.section
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "-100%" }}
                            className="flex flex-col h-full p-4 xl:p-8 bg-white shadow-2xl lg:shadow-none"
                        >
                            <GradientButton
                                className={"mb-8 capitalize ".concat(menuButtonCommonStyles)}
                                title="pages.transfer-funds.new-transfer"
                                href="/dashboard/transfer-funds"
                                Icon={ArrowLongRightIcon}
                                left
                            />
                            <nav className="flex flex-col space-y-5">
                                {menu.map(({ href, title, Icon }) => (
                                    <TransparentButton
                                        key={title}
                                        title={title}
                                        Icon={Icon}
                                        href={
                                            href ??
                                            `/dashboard${title.includes("dashboard") ? "" : `/${title.split(".")[1]}`}`
                                        }
                                        className={"xl:justify-start ".concat(menuButtonCommonStyles)}
                                    />
                                ))}
                            </nav>
                            <TransparentButton
                                title="menu.logout.name"
                                onClick={signOut}
                                className={"mt-5 lg:mt-auto xl:justify-start ".concat(menuButtonCommonStyles)}
                                Icon={ArrowRightOnRectangleIcon}
                            />
                        </motion.section>
                    )}
                </AnimatePresence>
            </header>
            <motion.main
                variants={variants}
                initial="out"
                animate="in"
                exit="out"
                className="flex flex-col flex-1 max-h-full overflow-y-auto px-10 py-5 bg-[#eeeeee]"
            >
                {title && <Title title={`pages.${title}.name`} className="mb-6" />}
                {children}
            </motion.main>
        </section>
    );
};
