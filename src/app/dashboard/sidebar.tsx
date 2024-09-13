'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { DashboardCircleAddIcon, Store01Icon, UserIcon } from "hugeicons-react";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Logo } from "@/components/icons";
import { Tooltip } from "@nextui-org/tooltip";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const WalletCard = dynamic(() => import("./WalletCard"));

export const items: {
    label: string;
    href: string;
    icon: React.ReactNode;
}[] = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <DashboardCircleAddIcon className="w-6 h-6" />,
        },
        {
            label: 'Marketplace',
            href: '/marketplace',
            icon: <Store01Icon className="w-6 h-6" />,
        },
        {
            label: "Profile",
            href: '/dashboard/profile',
            icon: <UserIcon className="w-6 h-6" />,
        }
    ];


export default function SideBar() {
    const [isClient, setIsClient] = useState(false);
    const pathname= usePathname();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    return (
        <aside
            className={clsx(
                "py-4 h-full flex-col gap-4 items-center justify-center",
                "md:flex hidden"
            )}
        >
            <Logo className="w-8 h-8" />
            <div>
            </div>
            <Listbox 
                classNames={{
                    list: "flex flex-col items-center justify-center gap-2 py-2 px-2 rounded-full bg-foreground-100",
                    base: "my-auto"
                }}
            >
                {
                    items.map((item) => (
                        <ListboxItem
                            as={Link}
                            key={item.href}
                            href={item.href}
                            color="primary"
                            className={clsx(
                                "rounded-full w-fit h-fit p-2 flex items-center justify-center text-foreground-500",
                                pathname.startsWith(item.href) && "bg-primary text-primary-foreground"
                            )}
                        >
                            <Tooltip content={item.label} color="primary" placement="right" offset={16}>
                                {item.icon}
                            </Tooltip>
                        </ListboxItem>
                    ))
                }
            </Listbox>
            <WalletCard />
        </aside>
    );
}