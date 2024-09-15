'use client';

import React from "react";
import { toast } from "react-toastify";
import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { useQuery } from "@tanstack/react-query";

import { IX404CollectionTransaction } from "@/fetch-functions";
import { USING_MOCK } from "@/config/contants";
import { mockTokenActivities } from "@/mock";

function getFormattedFunctionName(entryFunctionIdStr: string): string {
    const parts = entryFunctionIdStr.split("::");
    const functionName = parts[parts.length - 1];

    return functionName
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function TransactionCard({ activity }: { activity: IX404CollectionTransaction }) {
    const formattedFunctionName = getFormattedFunctionName(activity.entry_function_id_str || '');

    return (
        <div className="flex flex-col gap-2 p-4 bg-foreground-50 rounded-[20px] border border-default/25">
            <div className="flex flex-row flex-wrap gap-2 items-center justify-between">
                <Chip
                    color="secondary"
                    variant="bordered"
                    radius="full"
                    className="text-base font-normal text-secondary"
                >
                    {formattedFunctionName}
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
                        tabIndex={0}
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
                            {truncateAddress(activity.from_address!) || '_'}
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
                            {truncateAddress(activity.to_address!) || '_'}
                        </Tooltip>
                    </span>
                </p>
            </div>
        </div>
    );
}

export default function ActivitiesArea() {
    let { data: activities, isLoading, isError } = useQuery<any>({
        queryKey: ["tokenActivities"],
        queryFn: async () => {
            return [];
        }
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
        <div className="space-y-4 w-full relative max-h-screen overflow-y-scroll">
            <h6 className="text-2xl font-semibold text-default-foreground">Activities</h6>
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-24 rounded-[20px]" />
                    ))
                    : activities && activities.map((activity: IX404CollectionTransaction) => (
                        <TransactionCard key={activity.transaction_timestamp} activity={activity} />
                    ))
            }
        </div>
    )
}