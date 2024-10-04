"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React from "react";

import { getCurrentCollectionsV2, IX404Collection } from "@/fetch-functions";
import EmptyContent from "@/components/empty-content";
import { Container, ResponsiveContainer } from "@/components/ui";
import { mockCollections } from "@/mock";
import { CollectionCard, SkeletonCollectionCard } from "@/components/collection";
import { USING_MOCK } from "@/config/contants";
import { toast } from "react-toastify";

export default function CollectionsAreas() {
    const searchParams = useSearchParams();
    const [collections, setCollections] = React.useState<IX404Collection[]>([]);
    const [searchQuery, setSearchQuery] = React.useState<string>(searchParams.get("search") || "");

    let { data = [], isLoading, error } = useQuery({
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

    React.useEffect(() => {
        if (searchParams.get("search")) {
            setSearchQuery(searchParams.get("search") || "");
        }
    }, [searchParams]);

    React.useEffect(() => {
        if (error) {
            toast.error("Failed to fetch collections");
        }
    }, [error]);

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
        <Container
            title={
                <span>
                    Collections <span className="text-foreground-500">({filteredCollections.length})</span>
                </span>
            }
        >
            {filteredCollections.length > 0 ? (
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
                )}
        </Container>
    )
}