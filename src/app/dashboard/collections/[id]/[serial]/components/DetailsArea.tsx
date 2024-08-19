'use client';

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useNft } from "../contexts/nft";
import clsx from "clsx";

function DetailField({ label, value }: { label?: string, value?: string }) {

    return (
        <div className="flex flex-row justify-between items-center">
            <p className="text-base font-normal text-default-500">{label || 'N/A'}</p>
            <p className="text-base font-medium text-default-foreground">{value || 'N/A'}</p>
        </div>
    );
}
export default function DetailsArea() {
    const nft = useNft();

    return (
        <div className="space-y-4 w-full relative">
            <h6 className="text-2xl font-semibold text-default-foreground">Details</h6>
            <div className="flex-col w-full items-start justify-center">
                <DetailField label="Token Id" value={truncateAddress(nft.token_data_id)} />
                <DetailField label="Token Standard" value={nft.token_standard?.toUpperCase()} />
                <DetailField label="Last Updated" value={
                    new Date(nft.last_transaction_timestamp).toLocaleDateString()
                } />
                <DetailField label="Created" value="2021-10-01" />
                <DetailField label="Creator" value={truncateAddress(nft.current_collection?.creator_address)} />
            </div>
        </div>
    )
}