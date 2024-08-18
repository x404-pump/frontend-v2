"use client";

import { SidebarControlProvider } from "./sidebar";

interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <SidebarControlProvider>
            {children}
        </SidebarControlProvider>
    );
}
