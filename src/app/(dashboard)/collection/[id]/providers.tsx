"use client";

import * as React from "react";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
import { CollectionProvider } from "./context/collection";

export interface ProvidersProps {
    children: React.ReactNode;
    collection: Partial<GetCollectionDataResponse>;
}

export function Providers({ children, collection }: ProvidersProps) {
    
    return (
        <CollectionProvider collection={collection}>
            {children}
        </CollectionProvider>
    );
}
