'use client';

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Add01Icon, DashboardCircleAddIcon, Store01Icon, UserIcon } from "hugeicons-react";
import { Link } from "@nextui-org/link";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/button";
import WalletCardV2 from "./components/wallet/WalletCardV2";


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
            label: "Create Collection",
            href: '/create-collection',
            icon:
                <Button
                    variant="solid"
                    color="primary"
                    size="sm"
                    radius="full"
                    isIconOnly
                >
                    {<Add01Icon size={16} />}
                </Button>
        },
        {
            label: "Profile",
            href: '/profile',
            icon: <UserIcon size={16} filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))" />,
        },
        {
            label: "Switch",
            href: '/switch',
            icon: <ThemeSwitch />,
        }
    ];

function Copyright() {
    return (
        <p className="text-xs text-foreground-500">
            © 2024 X404. All rights reserved.
        </p>
    );
}
function SideBar() {
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
                "py-4 h-full min-w-fit flex-col gap-8 items-center justify-between",
                "lg:flex hidden"
            )}
        >
            <div className="px-2 w-full">
                <WalletCardV2 />
            </div>
            <Listbox
                classNames={{
                    list: "flex flex-col items-center justify-center gap-2 p-4 rounded-[24px] border border-default/40 bg-foreground-50",
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
export default dynamic(() => Promise.resolve(SideBar));