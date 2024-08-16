import { AccountAddress, GetCollectionDataResponse, GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import { useState, useEffect } from "react";

import { aptosClient } from "@/utils/aptosClient";
import { useQuery } from "@tanstack/react-query";
import { getCollections } from "@/fetch-functions";

/**
 * A react hook to get all collections under the current contract.
 *
 * This call can be pretty expensive when fetching a big number of collections,
 * therefore it is not recommended to use it in production
 *
 */

/**
 * A react hook to get all collections under the current contract.
 *
 * This call can be pretty expensive when fetching a big number of collections,
 * therefore it is not recommended to use it in production
 *
 */
export function useGetCollections(account?: AccountAddress, where: any = {}, limit: number = 10) {
    return useQuery({
        queryKey: ["collections", account],
        queryFn: () => getCollections(account, where, limit),
    });
}