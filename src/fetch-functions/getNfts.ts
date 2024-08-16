import { GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export async function getNfts(collectionId: string) {
    try {
        const query = `
        query MyQuery($collection_id: String!) {
            current_token_datas_v2(where: {collection_id: {_eq: $collection_id}}) {
                current_collection {
                    collection_id
                    collection_name
                    uri
                }
                token_name
                token_uri
                last_transaction_timestamp
                description
            }
        }
        `;

        const variables = { collection_id: collectionId };

        const res = await aptosClient().queryIndexer<{
            current_token_datas_v2: GetTokenDataResponse [];
        }>({
            query: {
                query,
                variables,
            },
        });

        const nfts = res.current_token_datas_v2;
        return nfts || [];
    } catch (error) {
        throw new Error("Failed to fetch nfts");
    }
}