import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { NavBar } from "./navbar";
import { Providers } from "./providers";
import dynamic from "next/dynamic";
import { D } from "@aptos-labs/ts-sdk/dist/common/accountAddress-LOYE4_sG";

const DynamicSideBar = dynamic(() => import("./sidebar"));
const DynamicBottomNavbar = dynamic(() => import("./bottom-navbar"));

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
      <div className="flex flex-row h-screen relative mx-auto p-4">
        <DynamicSideBar />
        <DynamicBottomNavbar />
        <div className="flex flex-col w-full">
          <main className="flex-grow w-full py-8 md:ml-4 h-screen overflow-auto px-4">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}