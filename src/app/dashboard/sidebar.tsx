'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { m, useAnimationControls } from "framer-motion";
import { DashboardCircleAddIcon, Store01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { GradientBorder } from "@/components/GradientBorder";
import { PiShootingStarBold } from "react-icons/pi";
import dynamic from "next/dynamic";

const WalletCard = dynamic(() => import('./WalletCard'), { ssr: false });

export const SidebarControlContext = React.createContext({
    isExpanded: false,
    setIsExpanded: (isExpanded: boolean) => { },
    toggleIsExpanded: () => { },
});

export function SidebarControlProvider({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleIsExpanded = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <SidebarControlContext.Provider value={{ isExpanded, setIsExpanded, toggleIsExpanded }}>
            {children}
        </SidebarControlContext.Provider>
    );
}
export const useSidebarControl = () => React.useContext(SidebarControlContext);

const items: {
    label: string;
    href: string;
    icon: React.ReactNode;
}[] = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardCircleAddIcon className="min-w-8 w-8" />,
        },
        {
            label: 'Marketplace',
            href: '/marketplace',
            icon: <Store01Icon className="min-w-8 w-8" />,
        },
    ];

const containerVariants = {
    collapsed: {
        width: 0,
        minWidth: 0,
        transition: {
            duration: 0.3,
            damping: 10,
        },
    },
    expanded: {
        width: "16rem",
        minWidth: "16rem",
        transition: {
            duration: 0.3,
            damping: 10,
        },
    },
};

export function SideBar() {
    const containerControl = useAnimationControls();
    const { setIsExpanded, isExpanded } = useSidebarControl();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isExpanded) {
            containerControl.start("expanded");
        } else {
            containerControl.start("collapsed");
        }
    }, [isExpanded, containerControl]);

    if (!isClient) {
        return null;
    }

    return (
        <m.nav
            variants={containerVariants}
            initial={"collapsed"}
            animate={containerControl}
            className={clsx(
                "py-4 text-white h-screen flex flex-col gap-4 items-start overflow-hidden",
                "bg-background/1 backdrop-blur-lg",
                "z-50 rounded-tr-2xl",
                "flex",
            )}
        >
            <li className="relative mb-2 w-full list-none px-3" role="presentation" slot="base">
                <WalletCard />
            </li>
            <li className="relative mb-2 w-full list-none" role="presentation" slot="base">
                <span className="pl-1 text-tiny text-foreground-500" slot="heading">Overview</span>
                <Listbox>
                    {
                        items.map((item) => (
                            <ListboxItem
                                as={Link}
                                key={item.href}
                                startContent={item.icon}
                                href={item.href}
                                onClick={() => setIsExpanded(false)}
                                classNames={{
                                    base: clsx(
                                        "w-full text-default-500",
                                        "hover:border hover:border-default/50",
                                        "rounded-large px-3 py-1.5",
                                        "data-[hover=true]:bg-foreground-50",
                                    ),
                                }}
                            >
                                {item.label}
                            </ListboxItem>
                        ))
                    }
                </Listbox>
            </li>

            <li className="relative mb-2 w-full list-none" role="presentation" slot="base">
                <span className="pl-1 text-tiny text-foreground-500" slot="heading">Tool</span>
                <Listbox>
                    <ListboxItem
                        as={Link}
                        key={'create-collection'}
                        classNames={{
                            base: clsx(
                                "w-full text-default-500",
                                "rounded-large",
                                "data-[hover=true]:bg-transparent",
                            ),
                        }}
                        textValue="Create collection"
                    >
                        <GradientBorder
                            borderWidth={1}
                            className="bg-gradient-to-tr from-[#F3E7FF] via-[#C081FF] to-secondary rounded-large font-semibold w-full"
                        >
                            <Button
                                as={Link}
                                color="secondary"
                                radius="lg"
                                fullWidth
                                variant="solid"
                                href="/dashboard/create-collection"
                                endContent={<PiShootingStarBold size={16} />}
                            >
                                Create collection
                            </Button>
                        </GradientBorder>
                    </ListboxItem>
                </Listbox>
            </li>
        </m.nav>
    );
}