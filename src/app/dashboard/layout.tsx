import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { SideBar } from "./sidebar";
import { NavBar } from "./navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex h-screen overflow-visible relative container mx-auto max-w-7xl">
        <SideBar />
        <div className="flex flex-col w-full">
          <NavBar />
          <main className="flex-grow w-full pt-8 px-6">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}