'use client';

import React from "react";
import { toast } from "react-toastify";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { useQuery } from "@tanstack/react-query";

import { getX404SwapTransactions, IX404CollectionTransaction } from "@/fetch-functions";
import { USING_MOCK } from "@/config/contants";
import { mockTokenActivities } from "@/mock";
import { Container } from "@/components/ui";
import { useCollection } from "../../context/collection";

type TransactionType = "TokenWithdraw" | "TokenDeposit" | "NftWithdraw" | "NftDeposit";

function getFormattedFunctionName(type: string): string {
    const mappingName: Record<TransactionType, string> = {
        "TokenWithdraw": "Sell",
        "TokenDeposit": "Buy",
        "NftWithdraw": "Burn NFT",
        "NftDeposit": "Mint NFT",
    };

    return mappingName[type as TransactionType] || type;
}

function formatAddress(address: string): string {
    if (!address) return "";

    return `${address.slice(0, 5)}...${address.slice(-4)}`;
}

function TransactionCard({ activity }: { activity: IX404CollectionTransaction }) {
    const formattedFunctionName = getFormattedFunctionName(activity.type || '');

    return (
        <div className="min-w-fit flex flex-row gap-2 p-4 bg-foreground-50 rounded-[20px] border border-default/25 items-center justify-between">
            {/* <p className="flex flex-col gap-0">
                <span className="text-tiny text-foreground-500">From</span>
                <span
                    className="text-base text-foreground-900 cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                        try {
                            copy(activity.user_address!);
                            toast.success("Copied to clipboard", {
                                type: "success",
                            });
                        } catch (error) {
                            toast.error("Failed to copy address", {
                                type: "error",
                            });
                        }
                    }}
                >
                    <Tooltip
                        content={activity.user_address}
                        placement="top"
                    >
                        {activity.user_address.slice(0, 5) || "_"}
                    </Tooltip>
                </span>
            </p> */}
            <p className="flex flex-col gap-0">
                <span className="text-tiny text-foreground-500">User Address</span>
                <span
                    className="text-base text-foreground-900 cursor-pointer"
                    role="button"
                    onClick={() => {
                        try {
                            copy(activity.user_address!);
                            toast.success("Copied to clipboard", {
                                type: "success",
                            });
                        } catch (error) {
                            toast.error("Failed to copy address", {
                                type: "error",
                            });
                        }
                    }}
                >
                    <Tooltip
                        content={activity.user_address}
                        placement="top"
                    >
                        {formatAddress(activity.user_address) || '_'}
                    </Tooltip>
                </span>
            </p>
            <Chip
                color="default"
                radius="full"
                size="sm"
                className="text-xs"
            >
                {formattedFunctionName}
            </Chip>
            <p className="text-xs text-foreground-500">
                {activity.amount} {formattedFunctionName === "Buy" ? "FA" : ""} {formattedFunctionName === "Sell" ? "APT" : ""}
            </p>
            <p className="text-xs text-foreground-500">
                {activity.block_height}
            </p>
        </div>
    );
}

export default function ActivitiesArea() {
    const collection = useCollection();

    let { data: activities, isLoading, isError } = useQuery<any>({
        queryKey: ["tokenActivities"],
        queryFn: async () => getX404SwapTransactions(collection.collection_address),
    })

    if (USING_MOCK) {
        activities = mockTokenActivities;
    }

    React.useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch token activities", {
                type: "error",
            });
        }
    }, [isError]);

    return (
        <Container className="space-y-4 w-full relative max-h-full overflow-y-scroll" title="Activities">
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-24 rounded-[20px] bg-foreground-100" />
                    ))
                    : activities && activities.map((activity: IX404CollectionTransaction) => (
                        <TransactionCard key={activity.block_height} activity={activity} />
                    ))
            }
        </Container>
    )
}