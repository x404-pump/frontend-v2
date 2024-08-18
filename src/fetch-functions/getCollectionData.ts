import { aptosClient } from "@/utils/aptosClient";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";

export async function getCollectionData(collection_id: string) {
    const query = `
        query MyQuery ($collection_id: String!) {
            current_collections_v2 (where: {collection_id: {_eq: $collection_id}}) {
                collection_id
                max_supply
                mutable_description
                mutable_uri
                collection_name
                creator_address
                current_supply
                description
                uri
            }
        }
    `;

    const variables = {
        collection_id
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_collections_v2: GetCollectionDataResponse[];
        }>({
            query: {
                query,
                variables
            },
        });

        const collection = res.current_collections_v2[0];
        return collection;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}