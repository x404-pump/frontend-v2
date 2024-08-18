import { GetCollectionDataResponse } from '@aptos-labs/ts-sdk';
import React from 'react';

export const CollectionContext = React.createContext<Partial<GetCollectionDataResponse>>({});
export function CollectionProvider({ children, collection }: { children: React.ReactNode; collection: GetCollectionDataResponse | Partial<GetCollectionDataResponse> }) {
    return <CollectionContext.Provider value={collection}>{children}</CollectionContext.Provider>;
}
export function useCollection() {
    if (!React.useContext(CollectionContext)) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return React.useContext(CollectionContext);
}