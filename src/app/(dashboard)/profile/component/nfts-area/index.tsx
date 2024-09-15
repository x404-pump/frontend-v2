'use client';

import { NftCard } from "@/app/(dashboard)/collection/[id]/components/nfts-area/LazyNftCard";
import ScaleContainer from "@/components/ScaleContainer";
import { USING_MOCK } from "@/config/contants";
import { mockNfts } from "@/mock";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Index() {
    const { account } = useWallet();
    
    let nfts;
    if (USING_MOCK) {
        nfts = mockNfts;
    }

    return (
        <ScaleContainer>
            {
                nfts?.map((token) => (
                    <NftCard key={token.token_data_id} token={token} />
                ))
            }
        </ScaleContainer>
    )
}