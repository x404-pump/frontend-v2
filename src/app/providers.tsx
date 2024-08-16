"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { WalletProvider } from "@/service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  return (
    <WalletProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </WalletProvider>
  );
}
