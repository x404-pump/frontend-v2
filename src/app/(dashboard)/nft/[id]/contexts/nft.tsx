import { ICurrentTokenDatasV2 } from "@/fetch-functions";
import React from "react";

export type NftContextType = ICurrentTokenDatasV2 | null;
export const NftContext = React.createContext<NftContextType>(null);
export const NftProvider = ({ children, nft }: { children: React.ReactNode; nft: NftContextType }) => {
    return <NftContext.Provider value={nft}>{children}</NftContext.Provider>;
};
export const useNft = () => {
    const nft = React.useContext(NftContext);

    if (!nft) {
        throw new Error("useNft must be used within a NftProvider");
    }

    return nft;
};