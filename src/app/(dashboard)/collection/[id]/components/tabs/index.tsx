'use client';

import { Tab, Tabs } from "@nextui-org/tabs";
import dynamic from "next/dynamic";

const TransactionsArea = dynamic(() => import("../transactions-area"));
const NftsArea = dynamic(() =>
    import("../nfts-area/NftsArea").then((mod) => mod.NftsArea)
);

export default function TabContainer() {
    return(
        <Tabs
            variant="light"
            radius="full"
        >
            <Tab title="Transactions">
                <TransactionsArea />
            </Tab>
            <Tab title="NFTs">
                <NftsArea />
            </Tab>
        </Tabs>
    )
}