"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CollectionMetadata = {
    name?: string;
    image?: File;
    description?: string;
    symbol?: string;
    supply?: string;
};
interface CollectionMetadataContextProps {
    collectionMetadata: CollectionMetadata | null;
    setCollectionMetadata: (collectionMetadata: CollectionMetadata | null) => void;
}

const CollectionMetadataContext = createContext<CollectionMetadataContextProps | undefined>(undefined);

export const CollectionMetadataProvider = ({ children }: { children: ReactNode }) => {
    const [collectionMetadata, setCollectionMetadata] = useState<CollectionMetadata | null>(null);

    return (
        <CollectionMetadataContext.Provider value={{ collectionMetadata, setCollectionMetadata }}>
            {children}
        </CollectionMetadataContext.Provider>
    );
};

export const useCollectionMetadata = () => {
    const context = useContext(CollectionMetadataContext);

    if (context === undefined) {
        throw new Error('useCollectionMetadata must be used within a CollectionMetadataProvider');
    }

    return context;
};