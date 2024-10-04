"use client";

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useNft } from "../../contexts/nft";
import { useNftMarketplaceListings } from "../../contexts/nftMarketplaceListing";
import React from "react";
import { NftMarketplaceListing } from "@/fetch-functions";
import { Container, Field } from "@/components/ui";

export default function DetailsArea() {
    const nft = useNft();
    const nftMarketplaceListings = useNftMarketplaceListings();

    const [nftMarketplaceListing, setNftMarketplaceListing] = React.useState<NftMarketplaceListing | undefined>();

    const fields = [
        {
            name: "Contract Address",
            content: truncateAddress(nftMarketplaceListing?.contract_address),
            vaalue: nftMarketplaceListing?.contract_address,
            copyable: true
        },
        {
            name: "Token Id",
            content: truncateAddress(nft.token_data_id),
            value: nft.token_data_id,
            copyable: true
        },
        {
            name: "Token Standard",
            content: nft.token_standard?.toUpperCase(),
            value: nft.token_standard,
        },
        {
            name: "Last Updated",
            content: new Date(nft.last_transaction_timestamp!).toLocaleDateString()
        },
        {
            name: "Creator",
            content: truncateAddress(nft.current_collection?.creator_address),
            value: nft.current_collection?.creator_address,
            copyable: true
        }
    ];
    React.useEffect(() => {
        if (nftMarketplaceListings.length) {
            setNftMarketplaceListing(nftMarketplaceListings.pop());
        }
    }, [nftMarketplaceListings]);

    return (
        <Container className="w-full relative" title="Details">
            <div className="flex-col w-full items-start justify-center">
                {
                    fields.map((field, index) => (
                        <Field key={index} className="w-full justify-between" {...field} direction="row"/>
                    ))
                }
            </div>
        </Container>
    )
}