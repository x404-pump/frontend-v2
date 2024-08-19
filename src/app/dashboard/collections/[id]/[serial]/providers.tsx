'use client';

import { GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { NftProvider } from "./contexts/nft";

export default function Providers({
    children,
    nft,
}: {
    children: React.ReactNode;
    nft: GetTokenDataResponse;
}) {
    return (
        <NftProvider nft={nft}>
            {children}
        </NftProvider>
    );
}