import { useQuery } from "@tanstack/react-query";
import { getNfts } from "@/fetch-functions";

/**
 * A react hook to get all NFTs under a specific collection.
 *
 * This call can be pretty expensive when fetching a big number of NFTs,
 * therefore it is not recommended to use it in production
 *
 */
export function useGetNfts(collectionId: string) {
    return useQuery({
        queryKey: ["nfts", collectionId],
        queryFn: () => getNfts(collectionId),
    });
}