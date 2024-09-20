import { NftCard } from "@/components/nft";
import clsx from "clsx";

export default function NFTContainer() {
    return(
        <div
        className={clsx(
            'grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'
        )}
    >
        <NftCard 
            token={{
                
            }}
        />
        </div>
    )
}