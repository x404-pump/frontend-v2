import { AccountAddress, GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export async function getCollections(account?: AccountAddress, where: any = {}, limit: number = 10): Promise<GetCollectionDataResponse[]> {
    try {
        // Thêm điều kiện vào đối tượng where nếu có accountf
        if (account) {
            where.creator_address = { _eq: account };
        }

        // Chuyển đổi đối tượng where thành chuỗi JSON
        const whereString = JSON.stringify(where);

        // Tạo query với tham số where
        const query = `
            query MyQuery ($limit: Int!) {
                current_collections_v2 (limit: $limit) {
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
            limit
        }
        const res = await aptosClient().queryIndexer<{
            current_collections_v2: GetCollectionDataResponse[];
        }>({
            query: {
                query,
                variables
            },
        });

        const collections = res.current_collections_v2;
        console.log('collections', collections);
        return collections || [];
    } catch (error) {
        console.error("Failed to fetch collections", error);
        throw new Error("Failed to fetch collections");
    }
}