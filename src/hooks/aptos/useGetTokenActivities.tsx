import { useQuery } from "@tanstack/react-query";
import { getNfts, getTokenActivities } from "@/fetch-functions";

/**
 * A react hook to get all NFTs under a specific collection.
 *
 * This call can be pretty expensive when fetching a big number of NFTs,
 * therefore it is not recommended to use it in production
 *
 */
export function useGetTokenActivities(tokenId: string) {
    return useQuery({
        queryKey: ["token_activities", tokenId],
        queryFn: () => getTokenActivities(tokenId),
    });
}