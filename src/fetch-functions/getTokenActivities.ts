import { GetTokenActivityResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export async function getTokenActivities(tokenId: string) {
    try {
        const query = `
                    query MyQuery($token_id: String!) {
                        token_activities_v2(where: {token_data_id: {_eq: $token_id}}) {
                            from_address
                            to_address
                            before_value
                            after_value
                            token_data_id
                            entry_function_id_str
                            transaction_timestamp
                        }
                    }
                    `;

        const variables = { token_id: tokenId };

        const res = await aptosClient().queryIndexer<{
            token_activities_v2: GetTokenActivityResponse;
        }>({
            query: {
                query,
                variables,
            },
        });

        const tokenData = res.token_activities_v2;

        return tokenData || [];
    } catch (error) {
        throw new Error("Failed to fetch token data");
    }
}