import { NftMarketplaceListing } from "@/fetch-functions";
import React from "react";

export type NftMarketplaceListingsContextType = NftMarketplaceListing [] | [];
export const NftMarketplaceListingContext = React.createContext<NftMarketplaceListingsContextType>([]);
export const NftMarketplaceListingProvider = ({ children, nftMarketplaceListings }: { children: React.ReactNode; nftMarketplaceListings: NftMarketplaceListingsContextType}) => {
    return <NftMarketplaceListingContext.Provider value={nftMarketplaceListings}>{children}</NftMarketplaceListingContext.Provider>;
};

export const useNftMarketplaceListings = () => {
    const nftMarketplaceListing = React.useContext(NftMarketplaceListingContext);

    if (!nftMarketplaceListing) {
        throw new Error("useNftMarketplaceListing must be used within a NftMarketplaceListingProvider");
    }

    return nftMarketplaceListing;
};