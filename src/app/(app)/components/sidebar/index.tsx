"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import React from "react";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { DashboardCircleAddIcon, Store01Icon, UserIcon } from "hugeicons-react";

import SearchEngine from "@/components/search";
import { ColumnContainer } from "@/components/ui";
import Copyright from "./Copyright";
import LogoApp from "./LogoApp";
import Tools from "./Tools";
import WalletCardV2 from "../wallet/WalletCardV2";


export const items: {
    label: string;
    href: string;
    icon: React.ReactNode;
}[] = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardCircleAddIcon size={16} filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" />,
        },
        {
            label: 'Marketplace',
            href: '/marketplace',
            icon: <Store01Icon size={16} filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" />,
        },
        {
            label: "Profile",
            href: '/profile',
            icon: <UserIcon size={16} filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" />,
        },
    ];


interface ItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}
function ItemGroup({ title, children, ...props }: ItemGroupProps) {
    return (
        <ColumnContainer className="w-full" {...props}>
            <h6 className="text-foreground-900 text-base font-semibold">{title}</h6>
            {children}
        </ColumnContainer>
    )
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
}
function Item({ children, ...props }: ItemProps) {
    return (
        <div className="px-2 w-full" {...props}>
            {children}
        </div>
    )
}


export default function SideBar() {
    const pathname = usePathname();

    return (
        <aside
            className={clsx(
                "py-4 h-full min-w-48 flex-col gap-8 items-center justify-between",
                "lg:flex hidden"
            )}
        >
            <Item>
                <LogoApp />
            </Item>
            <Item>
                <SearchEngine />
            </Item>
            <Listbox
                aria-label="Main navigation"
                className="lg:flex hidden"
                classNames={{
                    list: "flex flex-col items-center justify-center gap-2",
                    base: "h-fit"
                }}
            >
                {
                    items.map((item) => (
                        <ListboxItem
                            as={Link}
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "rounded-md text-foreground-500 px-4 py-2 data-[hover=true]:bg-foreground-100 data-[hover=true]:text-foreground-900",
                                "transition-all duration-200 ease-in-out",
                                pathname.startsWith(item.href) && "bg-gradient-to-r from-primary/50 to-primary/25 text-primary-300 border-l-3 border-primary shadow"
                            )}
                            classNames={{
                                title: clsx(
                                    pathname.startsWith(item.href) && "font-semibold"
                                ),
                            }}
                            startContent={item.icon}
                        >
                            {item.label}
                        </ListboxItem>
                    ))
                }
            </Listbox>
            <ItemGroup title="Tool">
                <Item>
                    <Tools />
                </Item>
            </ItemGroup>

            {/* Empty box */}
            <div className="h-full" />
            <Item>
                <WalletCardV2 />
            </Item>
            <Item>
                <Copyright />
            </Item>
        </aside>
    );
}