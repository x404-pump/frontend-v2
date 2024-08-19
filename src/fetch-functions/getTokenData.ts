import { GetCurrentTokenOwnershipResponse, GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export async function getTokenData(tokenId: string) {
    try {
        const query = `
        query MyQuery($token_id: String!) {
            current_token_datas_v2(where: {token_data_id: {_eq: $token_id}}) {
                current_collection {
                    collection_id
                    collection_name
                    uri
                }
                token_data_id
                token_name
                token_uri
                token_properties
                last_transaction_timestamp
                description
                current_collection {
                    creator_address
                    collection_name
                    collection_id
                }
            }
            current_token_ownerships {
                owner_address
            }
        }
        `;

        const variables = { token_id: tokenId };

        const res = await aptosClient().queryIndexer<{
            current_token_datas_v2: GetTokenDataResponse[];
        }>({
            query: {
                query,
                variables,
            },
        });

        const tokenData = res.current_token_datas_v2;
        return tokenData[0] || null;
    } catch (error) {
        throw new Error("Failed to fetch token data");
    }
}