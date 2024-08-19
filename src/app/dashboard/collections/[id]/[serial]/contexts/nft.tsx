import { GetTokenDataResponse } from "@aptos-labs/ts-sdk";
import React from "react";

type NftContextType = {
    token: Partial<GetTokenDataResponse>;
};
export const NftContext = React.createContext<Partial<GetTokenDataResponse>>({});
export const NftProvider = ({ children, nft }: { children: React.ReactNode; nft: Partial<GetTokenDataResponse> }) => {
    return <NftContext.Provider value={nft}>{children}</NftContext.Provider>;
};
export const useNft = () => {
    const nft = React.useContext(NftContext);
    if (!nft) {
        throw new Error("useNft must be used within a NftProvider");
    }
    return nft;
};