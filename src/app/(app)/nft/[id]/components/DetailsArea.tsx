'use client';

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useNft } from "../contexts/nft";
import { useNftMarketplaceListings } from "../contexts/nftMarketplaceListing";
import React from "react";
import { NftMarketplaceListing } from "@/fetch-functions";
import { Container } from "@/components/ui";

function DetailField({ label, value }: { label?: string, value?: string }) {

    return (
        <div className="flex flex-row justify-between items-center">
            <p className="text-sm font-normal text-default-500">{label || '_'}</p>
            <p className="text-xs font-medium text-default-foreground">{value || '_'}</p>
        </div>
    );
}
export default function DetailsArea() {
    const nft = useNft();
    const nftMarketplaceListings = useNftMarketplaceListings();
    
    const [nftMarketplaceListing, setNftMarketplaceListing] = React.useState<NftMarketplaceListing | undefined>();

    React.useEffect(() => {
        if (nftMarketplaceListings.length) {
            setNftMarketplaceListing(nftMarketplaceListings.pop());
        }
    }, [nftMarketplaceListings]);
    
    return (
        <Container className="space-y-4 w-full relative" title="Details">
            <div className="flex-col w-full items-start justify-center">
                <DetailField label="Contract Address" value={truncateAddress(nftMarketplaceListing?.contract_address)} />
                <DetailField label="Token Id" value={truncateAddress(nft.token_data_id)} />
                <DetailField label="Token Standard" value={nft.token_standard?.toUpperCase()} />
                <DetailField label="Last Updated" value={
                    new Date(nft.last_transaction_timestamp!).toLocaleDateString()
                } />
                <DetailField label="Created" value="2021-10-01" />
                <DetailField label="Creator" value={truncateAddress(nft.current_collection?.creator_address)} />
            </div>
        </Container>
    )
}