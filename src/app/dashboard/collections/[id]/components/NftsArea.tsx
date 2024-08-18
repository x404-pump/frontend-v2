'use client';

import clsx from "clsx";
import React from "react";
import { GetTokenDataResponse } from '@aptos-labs/ts-sdk'
import { useCollection } from "../context/collection";
import { useGetNfts } from "@/hooks/aptos/useGetNfts";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/tooltip";
import { truncate } from "@/lib";

interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Partial<GetTokenDataResponse>;
}
export function NftCard(props: NftCardProps) {
    const { token } = props;

    return (
        <div className="relative flex w-full flex-none flex-col gap-3">
            <Image
                src={token.token_uri}
                alt={token.token_name}
                className="w-full aspect-square object-cover"
                radius="lg"
                fallbackSrc="https://via.placeholder.com/128x128"
                loading="lazy"
            />
            <div className="w-full">
                <Tooltip content={token.token_name}>
                    <h3 className="text-lg font-semibold cursor-pointer w-full break-words">
                        {truncate(token.token_name!, 24)}
                    </h3>
                </Tooltip>
                <p className="text-sm text-gray-500">{token.description}</p>
            </div>
        </div>
    )

}
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
                        <NftCard key={token.token_data_id} token={token} />
                    ))
            }
        </div>
    )
}