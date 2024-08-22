'use client';

import clsx from "clsx";
import { useNft } from "../contexts/nft";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/button";
import { BitcoinMoney02Icon } from "hugeicons-react";
import React  from "react";
import { Tooltip } from "@nextui-org/tooltip";

import { useNftMarketplaceListings } from "../contexts/nftMarketplaceListing";
import { GradientBorder } from "@/components/GradientBorder";

// Utility function to format the price
const formatPrice = (price: number, decimals: number = 8) => {
    return (price / Math.pow(10, decimals)).toFixed(2);
};

export default function ToolsArea() {
    const nft = useNft();
    const nftMarketplaceListing = useNftMarketplaceListings().pop();
    const [ownerAddress, setOwnerAddress] = React.useState<string | undefined>();

    React.useEffect(() => {
        
        if (nft.current_token_ownerships.length) {
            setOwnerAddress(nft.current_token_ownerships.pop()?.owner_address);
        }
    }, [nft]);

    return (
        <div
            className={clsx(
                "flex flex-col md:flex-row gap-4 justify-between items-center",
                "px-8 py-5 rounded-3xl w-full",
                "bg-foreground-50 border border-default/25",
            )}
        >
            <div className="w-full">
                <h3 className="text-2xl text-default-foreground font-semibold">{nft.token_name}</h3>
                <div className="flex flex-row items-center justify-start gap-4">
                    <span className="text-default-500 font-medium w-fit">Owned by</span>
                    <span className="text-yellow-500 font-medium cursor-pointer">
                        <Tooltip
                            content={ownerAddress}
                            placement="top"
                        >
                            {truncateAddress(ownerAddress) || "-"}
                        </Tooltip>
                    </span>
                </div>
            </div>
            {nftMarketplaceListing ? (
                <>
                    <div className="w-full">
                        <span className="flex flex-row items-end">Current Price</span>
                        <div className="text-2xl text-default-foreground font-semibold w-fit">
                            <span className="text-secondary text-2xl font-bold">
                                {formatPrice(Number(nftMarketplaceListing.price))}
                            </span>
                            <span className="text-xs text-foreground-500">_</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 md:justify-end w-full">
                        <Button radius="full" variant="solid">
                            Make offer
                        </Button>
                        <GradientBorder
                            borderWidth={1}
                            className="bg-gradient-to-tr from-[#F3E7FF] via-[#C081FF] to-secondary rounded-full font-semibold w-fit"
                        >
                            <Button
                                color="secondary"
                                radius="full"
                                variant="solid"
                                endContent={<BitcoinMoney02Icon size={24} />}
                            >
                                Buy now
                            </Button>
                        </GradientBorder>
                    </div>
                </>
            ) : (
                <div>Not for sale</div>
            )}
        </div>
    );
}