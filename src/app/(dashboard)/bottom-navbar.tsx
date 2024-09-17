'use client';

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Tooltip } from "@nextui-org/tooltip";
import clsx from "clsx";
import Link from "next/link";
import { items } from "./sidebar";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

function BottomNavBar() {
    const pathname = usePathname();
    
    return (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center h-fit w-full py-4">
            <Listbox
                classNames={{
                    list: clsx(
                        "flex flex-row items-center justify-center px-3 py-2 gap-6 rounded-full bg-foreground-50 w-fit mx-auto my-auto",
                        "border border-default/25 shadow-lg"
                    ),
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
                                "rounded-full flex items-center justify-center text-foreground-500 overflow-visible",
                                pathname === item.href && "text-foreground-900"
                            )}
                            classNames={{
                                wrapper: "w-fit h-fit min-w-8 min-h-8 overflow-visible"
                            }}
                        >
                            <Tooltip content={item.label} color="primary" placement="right" offset={16} className="overflow-visible" classNames={{
                                base: "overflow-visible"
                            }}>
                                {item.icon}
                            </Tooltip>
                        </ListboxItem>
                    ))
                }
            </Listbox>
        </div>
    )
}
export default dynamic(() => Promise.resolve(BottomNavBar), {
    ssr: false
});