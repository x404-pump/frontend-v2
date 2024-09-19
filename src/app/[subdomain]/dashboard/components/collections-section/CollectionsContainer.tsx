'use client';

import numeral from "numeral";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { USING_MOCK } from "@/config/contants";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { RocketIcon, Tag01Icon } from "hugeicons-react";

import { getCurrentCollectionsV2, IX404Collection } from "@/fetch-functions";
import { useSearch } from "@/components/search";
import EmptyContent from "@/components/empty-content";
import { ResponsiveContainer } from "@/components/ui";
import { mockCollections } from "@/mock";

function ParamField({ label, value, icon }: { label: string, value?: string, icon?: React.ReactNode }) {
    return (
        <div className="flex flex-row items-center gap-2">
            {icon}
            <span className="text-xs">{value || '-'}</span>
        </div>
    )
}
export function CollectionCard({ collection }: { collection: IX404Collection }) {
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-2 w-full aspect-w-16 aspect-h-10",
                "bg-foreground-50 rounded-[32px]",
                "border border-default/25",
                "cursor-pointer hover:scale-[1.02] transition-transform duration-300 ease-in-out"
            )}
            role="link"
            tabIndex={0}
            onClick={() => window.open(`/collection/${collection.collection_address}`, "_parent")}
        >
            <Image
                src={collection.collection_image}
                alt={collection.collection_name}
                classNames={{
                    wrapper: "w-full h-auto object-cover !max-w-full",
                    img: "rounded-[24px] w-full aspect-video object-cover"
                }}
            />
            <div className="flex flex-col gap-2 p-4 items-center justify-center w-full">
                <h3 className="capitalize text-base font-semibold">{collection.collection_name}</h3>
                <div className="flex flex-row gap-4">
                    <ParamField
                        label="Initial Price"
                        value={collection.initial_price ? numeral(collection.initial_price).format("0.0a") : undefined}
                        icon={<RocketIcon className="text-foreground-400" />}
                    />
                    <ParamField
                        label="Supply"
                        value={collection.supply ? numeral(collection.supply).format("0.0a") : undefined}
                        icon={<Tag01Icon className="text-foreground-400" />}
                    />
                </div>
            </div>
        </div>
    )
}
export function SkeletonCollectionCard({ key }: React.HTMLProps<HTMLDivElement>) {
    return (
        <div className="flex flex-col gap-2">
            <Skeleton
                key={key}
                content="Loading"
                className="w-full aspect-video rounded-[24px] bg-foreground-50"
            />
        </div>
    );
}
export default function CollectionsAreas() {
    const [collections, setCollections] = React.useState<IX404Collection[]>([]);
    const { searchQuery } = useSearch();

    let { data = [], isLoading } = useQuery({
        queryKey: ["collections"],
        queryFn: () => getCurrentCollectionsV2(),
    });

    React.useEffect(() => {
        if (USING_MOCK) {
            setCollections(mockCollections);
        } else if (data.length > 0) {
            setCollections(data);
        }
    }, [data]);

    const flattenObject = (obj: any): string => {
        let result = '';
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result += flattenObject(obj[key]);
            } else {
                result += ` ${obj[key]}`;
            }
        }
        return result.toLowerCase();
    };

    const filteredCollections = collections.filter(collection =>
        flattenObject(collection).includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return (
            <ResponsiveContainer>
                {Array.from({ length: 20 }).map((_, index) => (
                    <SkeletonCollectionCard key={index} />
                ))}
            </ResponsiveContainer>
        )
    }
    return (
        filteredCollections.length > 0 ? (
            <ResponsiveContainer>
                {
                    filteredCollections.map((collection) => (
                        <CollectionCard key={collection.collection_address} collection={collection} />
                    ))
                }
            </ResponsiveContainer>

        )
            : (
                <EmptyContent content="No collections found" />
            )
    )
}