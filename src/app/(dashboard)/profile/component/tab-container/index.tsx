'use client';

import { Tabs, Tab } from "@nextui-org/tabs"
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const NftsArea = dynamic(() => import("../nfts-area"));
const CollectionsArea = dynamic(() => import("../collections-area"));

export default function TabContainer() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const createQueryString = React.useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )


    return (
        <Tabs
            variant="light"
            radius="full"
            selectedKey={searchParams.get("tab") || "collections"}
            onSelectionChange={(key) => {
                router.push(`${pathname}?${createQueryString("tab", key.toString())}`)
            }}
        >
            <Tab title="Collections" className="w-full">
                <CollectionsArea />
            </Tab>
            <Tab title="NFTs" className="w-full">
                <NftsArea />
            </Tab>
        </Tabs>
    )
}