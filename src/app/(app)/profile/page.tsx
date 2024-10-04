"use client";

import TransactionsArea from "./component/transactions-area"
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import EmptyContent from "@/components/empty-content";
import { ColumnContainer } from "@/components/ui";
import ConnectWalletDialog from "@/components/wallet/ConnectWalletDialog";
import ProfileArea from "./component/profile-area";
import TabContainer from "./component/tab-container";


export default function Page() {
    const { connected } = useWallet();

    if (!connected) return (
        <ColumnContainer className="w-full h-full">
            <EmptyContent content="Please connect your wallet!" className="m-auto">
                <ConnectWalletDialog />
            </EmptyContent>
        </ColumnContainer>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full h-full items-start">
            <div className="flex flex-col gap-8 items-start w-full">
                <ProfileArea />
                <TabContainer />
            </div>
            <div className="hidden lg:block">
                <TransactionsArea />
            </div>
        </div>

    )
}