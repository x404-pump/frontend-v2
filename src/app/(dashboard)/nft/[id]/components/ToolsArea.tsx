'use client';

import clsx from "clsx";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/button";
import { BitcoinMoney02Icon, SaleTag01Icon } from "hugeicons-react";
import React from "react";
import { Tooltip } from "@nextui-org/tooltip";
import numeral from "numeral";

import { useNft } from "../contexts/nft";
import { useNftMarketplaceListings } from "../contexts/nftMarketplaceListing";
import { GradientBorder } from "@/components/GradientBorder";

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
            <div className="w-full">
                <h3 className="text-2xl text-default-foreground font-semibold capitalize">{nft.token_name}</h3>
                <div className="flex flex-row items-center justify-start gap-4 w-full md:justify-between">
                    <span className="text-default-500 font-medium w-fit text-base">Owned by</span>
                    <span className="text-yellow-500 font-medium cursor-pointer">
                        <Tooltip
                            content={ownerAddress}
                            placement="top"
                            classNames={{
                                content: "w-full break-words",
                            }}
                        >
                            {truncateAddress(ownerAddress) || "-"}
                        </Tooltip>
                    </span>
                </div>
            </div>
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
                <p className="text-foreground-500 text-base font-bold w-fit">Not for sale</p>
            )}
        </div>
    );
}