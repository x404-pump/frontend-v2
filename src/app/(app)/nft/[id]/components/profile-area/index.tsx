"use client";

import { useNft } from "../../contexts/nft"

export default function Profile() {
    const nft = useNft();
    return(
        <div>
            <h3 className="text-2xl lg:text-4xl font-semibold text-foreground">{nft.token_name}</h3>
            <p className="text-base text-foreground-500">{nft.description}</p>
        </div>
    )
}