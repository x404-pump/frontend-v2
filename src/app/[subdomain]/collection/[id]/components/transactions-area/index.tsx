'use client';

import React from "react";
import { toast } from "react-toastify";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { useQuery } from "@tanstack/react-query";

import { IX404CollectionTransaction } from "@/fetch-functions";
import { USING_MOCK } from "@/config/contants";
import { mockTokenActivities } from "@/mock";
import { timeAgo } from "@/lib";
import { Container } from "@/components/ui";

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
        <div className="min-w-fit flex flex-row gap-2 p-4 bg-foreground-50 rounded-[20px] border border-default/25 items-center justify-between">
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
                        {activity.from_address.slice(0, 5) || "_"}
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
                        {activity.to_address.slice(0, 5) || '_'}
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
                • {timeAgo(new Date(activity.transaction_timestamp))}
            </p>
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
        <Container className="space-y-4 w-full relative max-h-screen overflow-y-scroll" title="Activities">
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-24 rounded-[20px] bg-foreground-100" />
                    ))
                    : activities && activities.map((activity: IX404CollectionTransaction) => (
                        <TransactionCard key={activity.transaction_timestamp} activity={activity} />
                    ))
            }
        </Container>
    )
}