"use client";

import clsx from "clsx";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/button";
import { BitcoinMoney02Icon, SaleTag01Icon } from "hugeicons-react";
import React from "react";
import numeral from "numeral";

import { useNft } from "../contexts/nft";
import { useNftMarketplaceListings } from "../contexts/nftMarketplaceListing";

export default function ToolsArea() {
    const nft = useNft();
    const nftMarketplaceListing = useNftMarketplaceListings().pop();
    const [ownerAddress, setOwnerAddress] = React.useState<string | undefined>();

    React.useEffect(() => {
        if (nft.current_token_ownerships && nft.current_token_ownerships.length) {
            setOwnerAddress(nft.current_token_ownerships.pop()?.owner_address);
        }
    }, [nft]);

    return (
        <div
            className={clsx(
                "w-full flex flex-col md:flex-row gap-4 justify-between items-center",
                "py-5 rounded-3xl w-full",
            )}
        >
            {nftMarketplaceListing ? (
                <>
                    <div className="w-full">
                        <div className="p-2 rounded-xl bg-primary flex flex-row items-center gap-2 rotate-3 shadow-2xl shadow-primary">
                            <div className="bg-primary-600 p-1 rounded-lg">
                                <SaleTag01Icon size={16} className="text-primary-foreground" />
                            </div>
                            <p className="text-primary-foreground text-base font-bold">
                                {numeral(nftMarketplaceListing.price).format("$0,0.00")}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-foreground-500 text-base font-bold w-fit">Not for sale</p>
            )}
        </div>
    );
}