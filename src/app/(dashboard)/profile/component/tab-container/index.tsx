'use client';

import { Tabs, Tab } from "@nextui-org/tabs"
import dynamic from "next/dynamic";

const NftsArea = dynamic(() => import("../nfts-area"));
const CollectionsArea = dynamic(() => import("../collections-area"));

export default function TabContainer() {
    return (
        <Tabs
            variant="light"
            radius="full"
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