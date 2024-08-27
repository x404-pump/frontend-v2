import { aptosClient } from "@/utils/aptosClient";

// ============================================================
// ========================= SCHEMA ===========================
// ============================================================

export interface ICurrentCollectionsV2 {
    collection_id: string;
    collection_name: string;
    collection_properties?: { [key: string]: any }; // Assuming jsonb is an object
    creator_address: string;
    current_supply: number;
    description: string;
    last_transaction_timestamp: string; // ISO 8601 format
    last_transaction_version: number;
    max_supply?: number;
    mutable_description?: boolean;
    mutable_uri?: boolean;
    table_handle_v1?: string;
    token_standard: string;
    total_minted_v2?: number;
    uri: string;
    cdn_asset_uris?: {
        animation_optimizer_retry_count: number;
        asset_uri: string;
        cdn_animation_uri?: string;
        cdn_image_uri?: string;
        cdn_json_uri?: string;
        image_optimizer_retry_count: number;
        json_parser_retry_count: number;
        raw_animation_uri?: string;
        raw_image_uri?: string;
    }; // Assuming this is an object relationship
}

interface ICurrentTokenOwnershipsV2 {
    amount: number;
    composed_nfts: ICurrentTokenOwnershipsV2[];
    composed_nfts_aggregate: any;
    current_token_data: ICurrentTokenDatasV2;
    is_fungible_v2: boolean;
    is_soulbound_v2: boolean;
    last_transaction_timestamp: string; // Assuming ISO string format for timestamp
    last_transaction_version: bigint;
    non_transferrable_by_owner: boolean;
    owner_address: string;
    property_version_v1: number;
    storage_id: string;
    table_type_v1?: string;
    token_data_id: string;
    token_properties_mutated_v1: (path: string) => any; // Assuming JSONB type
    token_standard: string;
}

interface ICurrentTokenOwnershipsV2Aggregate {
    [key: string]: any;
}

export interface ICurrentTokenDatasV2 {
    aptos_name: any;
    cdn_asset_uris: any;
    collection_id: string;
    current_collection: ICurrentCollectionsV2;
    current_token_ownerships: ICurrentTokenOwnershipsV2[];
    current_token_ownerships_aggregate: ICurrentTokenOwnershipsV2Aggregate;
    decimals: bigint;
    description: string;
    is_deleted_v2: boolean;
    is_fungible_v2: boolean;
    largest_property_version_v1: number;
    last_transaction_timestamp: string; // Assuming ISO string format for timestamp
    last_transaction_version: bigint;
    maximum: number;
    supply: number;
    token_data_id: string;
    token_name: string;
    token_properties: (path: string) => any; // Assuming JSONB type
    token_standard: string;
    token_uri: string;
}
// ============================================================
// ========================= COLLECTION =======================
// ============================================================

export async function getCurrentCollectionsV2(offset?: number, limit?: number): Promise<ICurrentCollectionsV2[]> {
    const query = `
        query MyQuery {
            current_collections_v2 (
                limit: ${limit || 100},
                offset: ${offset || 0},
            ) {
                collection_id
                collection_name
                creator_address
                current_supply
                description
                uri
                collection_properties
                total_minted_v2
                cdn_asset_uris {
                cdn_animation_uri
                cdn_image_uri
                cdn_json_uri
                raw_animation_uri
                raw_image_uri
                }
            }
        }
    `;

    const variables = {
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_collections_v2: ICurrentCollectionsV2[];
        }>({
            query: {
                query,
                variables
            },
        });

        const collections = res.current_collections_v2;

        return collections || [];
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

export async function getCollectionData(collection_id: string) {
    const query = `
        query MyQuery($collection_id: String = "") {
        current_collections_v2_by_pk(collection_id: $collection_id) {
            collection_id
            collection_name
            collection_properties
            creator_address
            last_transaction_version
            last_transaction_timestamp
            description
            current_supply
            max_supply
            mutable_description
            mutable_uri
            table_handle_v1
            token_standard
            total_minted_v2
            uri
            cdn_asset_uris {
            cdn_image_uri
            cdn_json_uri
            }
        }
        }
    `;

    const variables = {
        collection_id,
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_collections_v2_by_pk: ICurrentCollectionsV2;
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_collections_v2_by_pk;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

export async function getCollectionNfts(collection_id: string) {
    const query = `
        query GetTokensDataByName($collection_id: String_comparison_exp ) {
            current_token_datas_v2(
                where: {collection_id: $collection_id, is_deleted_v2: {_eq: false}}
            ) {
                collection_id
                token_data_id
                token_name
                description
                token_standard
                token_properties
                token_uri
            }
        }
       `

    const variables = {
        collection_id: {
            _eq: collection_id
        }
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_token_datas_v2: ICurrentTokenDatasV2[];
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_token_datas_v2;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

// ============================================================
// ========================= TOKEN ============================
// ============================================================
export async function getCurrentTokenDatasV2(): Promise<ICurrentTokenDatasV2[]> {
    try {
        const query = `
        query MyQuery {
            current_token_datas_v2 {
                aptos_name
                cdn_asset_uris
                collection_id
                current_collection {
                    collection_id
                    collection_name
                    creator_address
                    current_supply
                    description
                    last_transaction_timestamp
                    max_supply
                    mutable_description
                    mutable_uri
                    table_handle_v1
                    token_standard
                    total_minted_v2
                    uri
                }
                current_token_ownerships {
                    owner_address
                }
            }

        }
    `;
        const variables = {
        };

        const res = await aptosClient().queryIndexer<{
            current_token_datas_v2: ICurrentTokenDatasV2[];
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_token_datas_v2;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

export async function getTokenData(token_data_id: string) {
    try {
        const query = `
        query MyQuery($token_data_id: String!) {
            current_token_datas_v2(where: {token_data_id: {_eq: $token_data_id }}) {
                collection_id
                token_data_id
                token_name
                token_uri
                current_collection {
                    collection_id
                    collection_name
                    creator_address
                    current_supply
                    description
                    last_transaction_timestamp
                    max_supply
                    mutable_description
                    mutable_uri
                    table_handle_v1
                    token_standard
                    total_minted_v2
                    uri
                }
                current_token_ownerships {
                    owner_address
                }
            }
        }
        `;
        const variables = { token_data_id };

        const res = await aptosClient().queryIndexer<{
            current_token_datas_v2: ICurrentTokenDatasV2[];
        }>({
            query: {
                query,
                variables
            },
        });

        const tokenData = res.current_token_datas_v2;

        if (tokenData.length === 0) {
            throw new Error("Token not found");
        }

        return tokenData[0] || null;
    } catch (error) {
        throw new Error("Failed to fetch token data");
    }
}
export async function getTokenMetadataByName(name: string, collection_name: string) {
    const query = `
    query GetTokensDataByName($name: String, $collectionName: String) {
        current_token_datas(
            where: {name: {_eq: $name}, collection_name: {_eq: $collectionName}}
        ) {
            metadata_uri
            __typename
        }
    }
    `;

    const variables = {
        name,
        collectionName: collection_name,
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_token_datas: any[];
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_token_datas;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

export async function getTokenMetadataById(token_id: string) {
    const query = `
    query GetTokensDataById($token_id: String) {
        current_token_datas(
            where: {token_id: {_eq: $token_id}}
        ) {
            metadata_uri
            __typename
        }
    }
    `;
    const variables = {
        token_id,
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_token_datas: any[];
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_token_datas;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}


// ============================================================
// ================== ACCOUNT COLLECTION ======================
// ============================================================

export async function getAccountCollections(account_id: string): Promise<ICurrentCollectionsV2[]> {
    const query = `
    query GetAccountNftCollections($address: String) {
        current_collection_ownership_v2_view(
            where: {owner_address: {_eq: $address}},
            limit: 1000000,
            offset: 0,
            order_by: [{last_transaction_version: desc}, {collection_id: asc}]
        ) {
            collection_id
            distinct_tokens
            last_transaction_version
            owner_address
            current_collection {
                collection_id
                collection_name
                creator_address
                current_supply
                description
                last_transaction_timestamp
                last_transaction_version
                max_supply
                mutable_description
                mutable_uri
                table_handle_v1
                token_standard
                total_minted_v2
                uri
            __typename
            }
            __typename
        }
    }
    `;

    const variables = {
        address: account_id,
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_collection_ownership_v2_view: ICurrentCollectionsV2[];
        }>({
            query: {
                query,
                variables
            },
        });

        const collections = res.current_collection_ownership_v2_view;

        return collections || [];
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}

export async function getAccountNfts(account_id: string) {
    const query = `
    query GetAccountNfts($address: String) {
        current_token_ownerships_v2(
            where: {owner_address: {_eq: $address}, amount: {_gt: "0"}}
        ) {
            current_token_data {
            collection_id
            largest_property_version_v1
            current_collection {
                collection_id
                collection_name
                description
                creator_address
                uri
                __typename
            }
            description
            token_name
            token_data_id
            token_standard
            token_uri
            __typename
            }
            owner_address
            amount
            __typename
        }
    }
    `;

    const variables = {
        address: account_id,
    };

    try {
        const res = await aptosClient().queryIndexer<{
            current_token_ownerships_v2: any[];
        }>({
            query: {
                query,
                variables
            },
        });

        return res.current_token_ownerships_v2;
    } catch (error) {
        console.error("Error fetching collection data:", error);
        throw new Error("Failed to fetch collection data");
    }
}