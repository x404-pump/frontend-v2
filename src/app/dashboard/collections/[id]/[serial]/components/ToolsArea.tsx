'use client';

import clsx from "clsx";
import { useNft } from "../contexts/nft";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/button";
import { GradientBorder } from "@/components/GradientBorder";
import { BitcoinMoney02Icon } from "hugeicons-react";
import { useGetTokenOwnerships } from "@/hooks/aptos/useGetTokenOwnerships";
import React from "react";
import { toast } from "react-toastify";
import { Skeleton } from "@nextui-org/skeleton";
import { Tooltip } from "@nextui-org/tooltip";

export default function ToolsArea() {
    const nft = useNft();
    const { data: nftOwners, isError, isLoading} = useGetTokenOwnerships(nft.token_data_id!);
    
    React.useEffect(() => {
        if(isError) {
            toast.error("Failed to fetch token owners", {
                type: "error",
            });
            console.error(isError);
        }
    }, [isError]);
    React.useEffect(() => {
        console.log('nftOwners', nftOwners);
    }, [nftOwners]);
    
    return (
        <div
            className={clsx(
                "flex flex-col md:flex-row gap-4 justify-between items-center",
                "px-8 py-5 rounded-3xl w-full",
                "bg-foreground-50 border border-default/25",
            )}
        >
            <div className="space-y-4 w-full">
                <h3 className="text-2xl text-default-foreground font-semibold">{nft.token_name}</h3>
                <div className="flex flex-row items-center justify-start gap-4">
                    <span className="text-default-500 font-medium w-fit">Owned by</span>
                    <span className="text-yellow-500 font-medium cursor-pointer">
                        {isLoading ?
                         <Skeleton/> : 
                            <Tooltip
                                content={truncateAddress(nftOwners?.[nftOwners.length - 1]?.owner_address)}
                                placement="top"
                            >
                                {truncateAddress(nftOwners?.[nftOwners.length - 1]?.owner_address)}
                            </Tooltip>
                        }
                    </span>
                </div>
            </div>
            <div className="flex flex-row items-center gap-4 md:justify-end w-full">
                <Button
                    radius="full"
                    variant="solid"
                >
                    Buy now
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
                        Make offer
                    </Button>
                </GradientBorder>
            </div>
        </div>

    )
}