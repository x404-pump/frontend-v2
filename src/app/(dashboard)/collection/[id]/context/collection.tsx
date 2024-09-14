import { Collection } from '@/fetch-functions';
import React from 'react';

export type CollectionContextType = Partial<Collection>;
export const CollectionContext = React.createContext<CollectionContextType>({});
export function CollectionProvider({ children, collection }: { children: React.ReactNode; collection: CollectionContextType }) {
    return <CollectionContext.Provider value={collection}>{children}</CollectionContext.Provider>;
}
export function useCollection() {
    if (!React.useContext(CollectionContext)) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }

    return React.useContext(CollectionContext);
}