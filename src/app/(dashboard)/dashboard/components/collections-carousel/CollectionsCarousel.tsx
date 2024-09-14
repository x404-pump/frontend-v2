import { getCurrentCollectionsV2, IX404Collection } from "@/fetch-functions";
import numeral from "numeral";

import { useQuery } from "@tanstack/react-query";
import { mockCollections } from "../collections-table/mock";
import clsx from "clsx";
import { USING_MOCK } from "@/config/contants";
import React from "react";
import { RocketIcon, Tag01Icon } from "hugeicons-react";
import { Skeleton } from "@nextui-org/skeleton";

function ParamField({ label, value, icon }: { label: string, value?: string, icon?: React.ReactNode }) {
    return (
        <div className="flex flex-row items-center gap-2">
            {icon}
            <span className="text-xs">{value || '-'}</span>
        </div>
    )
}
function CollectionCard({ collection }: { collection: IX404Collection }) {
    if (!collection || !collection.collection_image) {
        return (
            <Skeleton
                content="Loading"
                className="min-w-[360px] aspect-w-16 aspect-h-10"
            />
        );
    };
    return (
        <div
            className={clsx(
                "flex flex-col items-start justify-end gap-2",
                "min-w-[360px]"
            )}
            style={{
                backgroundImage: `url(${collection.collection_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "24px",
                padding: "24px",
                aspectRatio: "16 / 10",
                boxShadow: "inset 0px -128px 128px rgba(0, 0, 0, 0.95)",
            }}
        >
            <h3 className="capitalize text-lg font-semibold">{collection.collection_name}</h3>
            <div className="flex flex-row gap-4">
                <ParamField
                    label="Initial Price"
                    value={collection.initial_price ? numeral(collection.initial_price).format("0.0a") : undefined}
                    icon={<RocketIcon />}
                />
                <ParamField
                    label="Supply"
                    value={collection.supply ? numeral(collection.supply).format("0.0a") : undefined}
                    icon={<Tag01Icon />}
                />
            </div>
        </div>
    )
}
export default function CollectionsCarousel() {
    let { data: collections = [], isLoading } = useQuery({
        queryKey: ["collections"],
        queryFn: () => getCurrentCollectionsV2(),
    });

    if (USING_MOCK) {
        collections = mockCollections;
    }
    return (
        <div className="flex flex-row gap-4 overflow-x-auto py-4">
            {collections.map((collection) => (
                <CollectionCard key={collection.collection_address} collection={collection} />
            ))}
        </div>
    )
}