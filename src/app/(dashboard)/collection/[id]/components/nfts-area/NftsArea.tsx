'use client';

import clsx from "clsx";
import React from "react";
import { useCollection } from "../../context/collection";
import { Skeleton } from "@nextui-org/skeleton";
import LazyNftCard from "./LazyNftCard";
import { useQuery } from "@tanstack/react-query";
import { getCollectionNfts } from "@/fetch-functions/collection";
import { USING_MOCK } from "@/config/contants";
import { mockNfts } from "@/mock";



export function NftsArea() {
    const collection = useCollection();

    let { data, isLoading } = useQuery({
        queryKey: ['getNfts', collection.collection_address],
        queryFn: () => getCollectionNfts(collection.collection_address!),
    });

    if (USING_MOCK) {
        data = mockNfts;
    }


    return (
        <div
            className={clsx(
                'grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'
            )}
        >
            {
                isLoading
                    ? Array.from({ length: 100 }).map((_, i) => (
                        <Skeleton key={i} className="w-full min-w-64 aspect-square rounded-2xl" />
                    ))
                    : data?.map((token) => (
                        <LazyNftCard key={token.token_data_id} token={token} />
                    ))
            }
        </div>
    )
}