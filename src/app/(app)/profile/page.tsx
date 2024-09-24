'use client';

import dynamic from "next/dynamic"
import TransactionsArea from "./component/transactions-area"
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import EmptyContent from "@/components/empty-content";
import ConnectWalletDialog from "@/components/wallet/ConnectWalletDialog";
import { ColumnContainer } from "@/components/ui";

const ProfileArea = dynamic(() => import("./component/profile-area"))
const TabContainer = dynamic(() => import("./component/tab-container"))

function Page() {
    const { connected } = useWallet();

    if (!connected) return (
        <ColumnContainer className="w-full h-full mx-auto my-auto">
            <EmptyContent content="Please connect your wallet!" >
                <div className="px-32 lg:hidden">
                    <ConnectWalletDialog />
                </div>
            </EmptyContent>
        </ColumnContainer>
    );
    return (
        <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
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
export default dynamic(() => Promise.resolve(Page), { ssr: false })