'use client';

import { PropsWithChildren } from "react";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { toast } from "react-toastify";
import { appConfig } from "@/config";


export function WalletProvider({ children }: PropsWithChildren) {
    return (
        <AptosWalletAdapterProvider
            autoConnect={true}
            dappConfig={{ network: appConfig.constants.NETWORK }}
            onError={(error) => {
                toast("Error connect to wallet", { type: "error" });
                console.error('Error connect to wallet', error);
            }}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
}
