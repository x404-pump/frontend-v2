'use client';

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Tooltip } from "@nextui-org/tooltip";
import clsx from "clsx";
import Link from "next/link";
import { items } from "./sidebar";
import { usePathname } from "next/navigation";

export default function BottomNavBar() {
    const pathname = usePathname();
    
    return (
        <div className="flex items-center justify-center py-4 md:hidden backdrop-blur-md fixed bottom-0 left-0 right-0 z-50">
            <Listbox
                classNames={{
                    list: "flex flex-row items-center justify-center px-3 py-2 gap-2 rounded-full bg-foreground-100 w-fit mx-auto",
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
                                pathname === item.href && "bg-primary text-primary-foreground"
                            )}
                        >
                            <Tooltip content={item.label} color="primary" placement="right" offset={16}>
                                {item.icon}
                            </Tooltip>
                        </ListboxItem>
                    ))
                }
            </Listbox>
        </div>
    )
}