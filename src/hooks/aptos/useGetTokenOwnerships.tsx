import { useQuery } from "@tanstack/react-query";
import { getTokenOwnerships } from "@/fetch-functions";

/**
 * A react hook to get all token ownerships for a specific token.
 * 
 * This call can be pretty expensive when fetching a big number of token ownerships,
 * therefore it is not recommended to use it in production
 * 
 */
export function useGetTokenOwnerships(tokenId: string) {
    return useQuery({
        queryKey: ["tokenOwnerships", tokenId],
        queryFn: () => getTokenOwnerships(tokenId),
    });
}