'use client';

import { useQuery } from "@tanstack/react-query";
import { USING_MOCK } from "@/config/contants";
import React from "react";

import { getCurrentCollectionsV2, IX404Collection } from "@/fetch-functions";
import { useSearch } from "@/components/search";
import EmptyContent from "@/components/empty-content";
import { ResponsiveContainer } from "@/components/ui";
import { mockCollections } from "@/mock";
import { CollectionCard, SkeletonCollectionCard } from "@/components/collection";

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