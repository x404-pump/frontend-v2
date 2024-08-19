'use client';

import clsx from "clsx";
import React from "react";
import { useCollection } from "../../context/collection";
import { useGetNfts } from "@/hooks/aptos/useGetNfts";
import { Skeleton } from "@nextui-org/skeleton";
import LazyNftCard from "./LazyNftCard";



export function NftsArea() {
    const collection = useCollection();
    const { data, isLoading } = useGetNfts(collection.collection_id!);
    return (
        <div
            className={clsx(
                'my-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            )}
        >
            {
                isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-full aspect-square rounded-2xl" />
                    ))
                    : data?.map((token) => (
                        <LazyNftCard key={token.token_data_id} token={token} />
                    ))
            }
        </div>
    )
}