'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Profile() {
    const { account } = useWallet();

    return (
        <div className="bg-foreground-50 rounded-3xl p-8 w-full flex flex-col md:flex-row items-center md:items-end gap-8">
            
            <div className="w-full flex flex-col gap-4 items-end">
            </div>
        </div>
    )
}