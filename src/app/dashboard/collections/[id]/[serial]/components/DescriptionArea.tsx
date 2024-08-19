'use client';
import { useNft } from "../contexts/nft"

export default function DescriptionArea() {
    const nft = useNft();

    return (
        <div>
            <p className="text-base font-normal text-default-foreground my-auto w-full break-words">
                {nft.description}
            </p>
        </div>
    )
}