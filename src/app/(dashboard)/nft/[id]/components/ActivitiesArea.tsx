'use client';

import { useNft } from "../contexts/nft";
import React from "react";
import { toast } from "react-toastify";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";
import { useQuery } from "@tanstack/react-query";

import { getTokenActivities } from "@/fetch-functions";
import { USING_MOCK } from "@/config/contants";
import { mockTokenActivities } from "@/mock";
import { TransactionCard } from "@/components/transaction-card";
import { Container } from "@/components/ui";

function getFormattedFunctionName(entryFunctionIdStr: string): string {
    const parts = entryFunctionIdStr.split("::");
    const functionName = parts[parts.length - 1];

    return functionName
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}


export default function ActivitiesArea() {
    const nft = useNft();
    let { data: activities, isLoading, isError } = useQuery({
        queryKey: ["getTokenActivities", nft.token_data_id],
        queryFn: async () => {
            if (!nft.token_data_id) {
                return [];
            }
            return await getTokenActivities(nft.token_data_id);
        }
    });

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
        <Container className="space-y-4 w-full relative" title="Activities">
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-24 rounded-[20px]" />
                    ))
                    : activities && activities.map((activity) => (
                        <TransactionCard key={activity?.transaction_timestamp}
                            from={activity?.from_address}
                            to={activity?.to_address}
                            time={activity?.transaction_timestamp}
                            tag={
                                <Chip
                                    color="default"
                                    radius="full"
                                    size="sm"
                                    className="text-xs"
                                >
                                    {getFormattedFunctionName(activity?.entry_function_id_str || "")}
                                </Chip>
                            }
                        />
                    ))
            }
        </Container>
    )
}