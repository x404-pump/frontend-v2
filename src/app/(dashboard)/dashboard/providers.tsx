import { SearchProvider } from "@/components/search";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren){
    return(
        <SearchProvider>
            {children}
        </SearchProvider>
    )
}