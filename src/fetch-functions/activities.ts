import { API_URL } from "@/config/contants";
import axios from "axios";
import { IX404CollectionTransaction } from "./collection";
import { GetTokenActivityResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export interface IX404TokenActivity extends Partial<GetTokenActivityResponse> {
}
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
            token_activities_v2: IX404TokenActivity;
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

export const getX404SwapTransactions = async (collectionId: string | undefined) => {
    if (!collectionId) return [];
    const url = `${API_URL}/api/v1/transaction/x404swap?collectionId=${collectionId}`;
    const res = await axios.get<IX404CollectionTransaction[]>(url);

    return res.data;
}