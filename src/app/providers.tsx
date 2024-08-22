"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { WalletProvider } from "@/service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <WalletProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <QueryClientProvider client={queryClient}>
            <LazyMotion features={domAnimation}>
              <ToastContainer
                theme={'colored'}
              />
              {children}
            </LazyMotion>
          </QueryClientProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </WalletProvider>
  );
}
