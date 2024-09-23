import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import "./styles.css";
import SideBar from "./sidebar";
import BottomNavbar from "./bottom-navbar";

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


function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="flex flex-row h-screen relative mx-auto overflow-x-hidden hidden-scrollbar">
        <SideBar />
        <BottomNavbar />
        <main className="flex-grow w-full mb-64 lg:mb-0 lg:ml-4 h-full p-4 hidden-scrollbar overflow-x-hidden">
          {children}
        </main>
      </div>
    </Providers>
  );
}

export default DashboardLayout;