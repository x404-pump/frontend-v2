'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { DashboardCircleAddIcon, Store01Icon, UserIcon } from "hugeicons-react";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const WalletCard = dynamic(() => import("./components/wallet/WalletCardV2"));

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
        }
    ];

function Copyright() {
    return (
        <p className="text-xs text-foreground-500">
            © 2024 X404. All rights reserved.
        </p>
    );
}
export default function SideBar() {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <aside
            className={clsx(
                "py-4 h-full flex-col gap-8 items-center justify-between",
                "lg:flex hidden"
            )}
        >
            <WalletCard />
            <Listbox
                classNames={{
                    list: "flex flex-col items-center justify-center gap-2 p-4 rounded-[24px] border border-default/40 bg-foreground-100",
                    base: "h-full"
                }}
            >
                {
                    items.map((item) => (
                        <ListboxItem
                            as={Link}
                            key={item.href}
                            href={item.href}
                            color="default"
                            className={clsx(
                                "rounded-full text-foreground-500 px-4 py-2",
                                pathname.startsWith(item.href) && "bg-foreground-200 text-foreground-900 border border-default/40"
                            )}
                            startContent={
                                item.icon 
                            }
                        >
                            {item.label}
                        </ListboxItem>
                    ))
                }
            </Listbox>
            <Copyright />
        </aside>
    );
}