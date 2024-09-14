'use client';

import { GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { NftContextType, NftProvider } from "./contexts/nft";
import { NftMarketplaceListingProvider, NftMarketplaceListingsContextType } from "./contexts/nftMarketplaceListing";

interface ProvidersProps {
    children: React.ReactNode;
    nft: NftContextType;
    nftMarketplaceListings: NftMarketplaceListingsContextType;
}
export default function Providers({
    children,
    nft,
    nftMarketplaceListings
}: ProvidersProps
) {
    return (
        <NftProvider nft={nft}>
            <NftMarketplaceListingProvider nftMarketplaceListings={nftMarketplaceListings}>
                {children}
            </NftMarketplaceListingProvider>
        </NftProvider>
    );
}