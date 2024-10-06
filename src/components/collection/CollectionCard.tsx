"use client";

import clsx from "clsx";
import React from "react";
import { Skeleton, SkeletonProps } from "@nextui-org/skeleton";

import { IX404Collection } from "@/fetch-functions";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui";
import { PriceTag } from "../tag";


export function CollectionCard({ collection }: { collection: IX404Collection }) {
    const router = useRouter();

    return (
        <div
            className={clsx(
                "flex flex-row items-center justify-between gap-2 w-full h-fit p-3",
                "bg-foreground-50 rounded-medium",
                "border-2 border-default-200",
                "cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            )}
            role="link"
            tabIndex={0}
            onClick={() => router.push(`../collection/${collection.collection_address}`)}
        >
            <img
                src={collection.collection_image}
                alt={collection.collection_name}
                className="w-16 aspect-square rounded-small bg-foreground-100 shadow"
            />
            <div className="flex flex-col gap-2 items-start justify-center w-full">
                <h3 className="capitalize text-base font-semibold w-full">
                    {collection.collection_name.length > 20
                        ? collection.collection_name.slice(0, 20) + "..."
                        : collection.collection_name}
                </h3>
                <div className="flex flex-row gap-4">
                    <Field
                        value={collection.supply.toString()}
                        name="Supply"
                        direction="row"
                    />
                </div>
            </div>
            <PriceTag price={(Number(collection.initial_price) / 10e8).toString()} unit="APT" />
        </div>
    )
}
export function SkeletonCollectionCard({ ...props }: SkeletonProps) {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton
                content="Loading"
                className="w-full aspect-video rounded-[24px] bg-foreground-50"
                {...props}
            />
        </div>
    );
}