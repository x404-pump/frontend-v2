'use client';

import { useGetTokenActivities } from "@/hooks/aptos/useGetTokenActivities";
import { useNft } from "../../[serial]/contexts/nft";
import React from "react";
import { toast } from "react-toastify";
import { GetTokenActivityResponse } from "@aptos-labs/ts-sdk";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";

function ActivityCard({ activity }: { activity: GetTokenActivityResponse[0] }) {

    return (
        <div className="flex flex-col gap-2 p-4 bg-foreground-50 rounded-[20px] border border-default/25">
            <div className="flex flex-row items-center justify-between">
                <Chip
                    color="secondary"
                    variant="bordered"
                    radius="full"
                    className="text-base font-normal text-secondary"
                >
                    {activity.type || 'Action'}
                </Chip>
                <p className="text-xs font-medium text-secondary">
                    {new Date(activity.transaction_timestamp).toLocaleString()}
                </p>
            </div>
            <div className="flex flex-row items-center justify-between">
                <p className="flex flex-col gap-0">
                    <span className="text-tiny text-foreground-500">From</span>
                    <span
                        className="text-base text-foreground-900 cursor-pointer"
                        role="button"
                        onClick={() => {
                            try {
                                copy(activity.from_address!);
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
                            content={activity.from_address}
                            placement="top"
                        >
                            {truncateAddress(activity.from_address!) || 'N/A'}
                        </Tooltip>
                    </span>
                </p>
                <p className="flex flex-col gap-0">
                    <span className="text-tiny text-foreground-500">To</span>
                    <span
                        className="text-base text-foreground-900 cursor-pointer"
                        role="button"
                        onClick={() => {
                            try {
                                copy(activity.from_address!);
                                toast.success("Copied to clipboard", {
                                    type: "success",
                                });
                                console.log(activity.to_address);
                            } catch (error) {
                                toast.error("Failed to copy address", {
                                    type: "error",
                                });
                            }
                        }}
                    >
                        <Tooltip
                            content={activity.to_address}
                            placement="top"
                        >
                            {truncateAddress(activity.to_address!) || 'N/A'}
                        </Tooltip>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function ActivitiesArea() {
    const nft = useNft();
    const { data: activities, isLoading, isError } = useGetTokenActivities(nft.token_data_id!);
    React.useEffect(() => {
        if (isError) {
            toast.error("Failed to fetch token activities", {
                type: "error",
            });
        }
    }, [isError]);

    return (
        <div className="space-y-4 w-full relative">
            <h6 className="text-2xl font-semibold text-default-foreground">Activities</h6>
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-24 rounded-[20px]" />
                    ))
                    : activities && activities.map((activity) => (
                        <ActivityCard key={activity.transaction_timestamp} activity={activity} />
                    ))
            }
        </div>
    )
}