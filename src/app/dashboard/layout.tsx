import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("./sidebar"));
const BottomNavbar = dynamic(() => import("./bottom-navbar"));

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
      <div className="flex flex-row h-screen relative mx-auto overflow-y-scroll overflow-hidden">
        <SideBar />
        <BottomNavbar />
        <main className="flex-grow w-full mb-32 md:mb-0 md:ml-4 h-full overflow-y-scroll p-4">
          {children}
        </main>
      </div>
    </Providers>
  );
}