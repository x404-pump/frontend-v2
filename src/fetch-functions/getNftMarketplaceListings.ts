
import { aptosClient } from "@/utils/aptosClient";
import { GetTokenDataResponse } from "@aptos-labs/ts-sdk";

export interface NftMarketplaceListing {
    coin_type: string;
    collection_id: string;
    contract_address: string;
    current_token_data: GetTokenDataResponse;
    entry_function_id_str: string;
    fee_schedule_id: string;
    is_deleted: boolean;
    last_transaction_timestamp: string;
    last_transaction_version: bigint;
    listing_id: string;
    marketplace: string;
    price: number;
    seller: string;
    token_amount: number;
    token_data_id: string;
    token_standard: string;
}

export async function getNftMarketplaceListings() {
    try {
        const query = `
        query MyQuery {
            nft_marketplace_v2_current_nft_marketplace_listings {
                contract_address
                collection_id
                token_data_id
                token_standard
                seller
                price
                entry_function_id_str
                last_transaction_timestamp
            }
        }
        `;

        const res = await aptosClient().queryIndexer<{
            nft_marketplace_v2_current_nft_marketplace_listings: NftMarketplaceListing[];
        }>({
            query: {
                query,
            },
        });

        const data = res.nft_marketplace_v2_current_nft_marketplace_listings;

        return data || [];
    } catch (error) {
        throw new Error("Failed to fetch token data");
    }
}

export async function getNftMarketplaceListingByListingId(listingId: string) {
    try {
        const query = `
        query MyQuery($listing_id: String!) {
            nft_marketplace_v2_current_nft_marketplace_listings(where: {listing_id: {_eq: $listing_id}}) {
                order_by: {last_transaction_timestamp: asc}
                contract_address
                collection_id
                token_data_id
                token_standard
                seller
                price
                entry_function_id_str
                last_transaction_timestamp
            }
        }
        `;

        const variables = { listing_id: listingId };

        const res = await aptosClient().queryIndexer<{
            nft_marketplace_v2_current_nft_marketplace_listings: NftMarketplaceListing[];
        }>({
            query: {
                query,
                variables,
            },
        });

        const data = res.nft_marketplace_v2_current_nft_marketplace_listings;

        return data[0] || null;
    } catch (error) {
        throw new Error("Failed to fetch token data");
    }
}

export async function getNftMarketplaceListingByTokenDataId(tokenDataId: string) {
    try {
        const query = `
        query MyQuery($token_data_id: String!) {
            nft_marketplace_v2_current_nft_marketplace_listings(
                where: {token_data_id: {_eq: $token_data_id}} 
                order_by: {last_transaction_timestamp: asc}
            ) {
                contract_address
                collection_id
                token_data_id
                token_standard
                seller
                price
                entry_function_id_str
                last_transaction_timestamp
            }
        }
        `;

        const variables = {
            token_data_id: tokenDataId,
        };

        const res = await aptosClient().queryIndexer<{
            nft_marketplace_v2_current_nft_marketplace_listings: NftMarketplaceListing[];
        }>({
            query: {
                query,
                variables,
            },
        });

        const data = res.nft_marketplace_v2_current_nft_marketplace_listings;

        return data || [];
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch token data");
    }
}