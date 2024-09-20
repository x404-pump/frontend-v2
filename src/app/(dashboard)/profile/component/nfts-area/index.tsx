'use client';

import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { ResponsiveContainer } from "@/components/ui";
import { USING_MOCK } from "@/config/contants";
import { mockNfts } from "@/mock";
import { NftCard } from "@/components/nft";

export default function Index() {
    const { account } = useWallet();
    
    let nfts;
    if (USING_MOCK) {
        nfts = mockNfts;
    }

    return (
        <ResponsiveContainer>
            {
                nfts?.map((token) => (
                    <NftCard key={token.token_data_id} token={token} />
                ))
            }
        </ResponsiveContainer>
    )
}