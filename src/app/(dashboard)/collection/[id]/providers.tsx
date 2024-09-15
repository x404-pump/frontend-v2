"use client";

import * as React from "react";
import { CollectionProvider } from "./context/collection";
import { IX404Collection } from "@/fetch-functions";

export interface ProvidersProps {
    children: React.ReactNode;
    collection: Partial<IX404Collection>;
}

export function Providers({ children, collection }: ProvidersProps) {
    
    return (
        <CollectionProvider collection={collection}>
            {children}
        </CollectionProvider>
    );
}
