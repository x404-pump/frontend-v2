import { GetCurrentTokenOwnershipResponse, GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export async function getTokenOwnerships(tokenId: string) {
    try {
        const query = `
        query MyQuery($token_id: String!) {
            current_token_ownerships_v2 (where: {token_data_id: {_eq: $token_id}}) {
                token_data_id
                owner_address
            }
        }
        `;

        const variables = { token_id: tokenId };

        const res = await aptosClient().queryIndexer<{
            current_token_ownerships_v2: GetCurrentTokenOwnershipResponse[];
        }>({
            query: {
                query,
                variables,
            },
        });

        const tokenData = res.current_token_ownerships_v2;
        return tokenData || [];
    } catch (error) {
        throw new Error("Failed to fetch token ownerships");
    }
}