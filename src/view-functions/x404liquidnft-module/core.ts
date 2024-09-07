import { X404LIQUIDNFT_MODULE_ADDRESS } from "@/config/contants";
import { aptosClient } from "@/utils/aptosClient";
import { MoveAddressType } from "@aptos-labs/ts-sdk";

export async function getTokenType(collection_id: string) {
    try {
        if(!collection_id) throw new Error('Collection ID is required');
        const [address, module, struct] = await aptosClient().view<[MoveAddressType, string, string]>({
            payload: {
                function: `${X404LIQUIDNFT_MODULE_ADDRESS}::core::get_token_type`,
                functionArguments: [collection_id]
            }
        });
        const coin = address + '::' + module + '::' + struct;
        return coin;
    } catch (error: any) {
        throw new Error(error);
    }
}
