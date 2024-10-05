import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import SideBar from "./components/sidebar";
import BottomNavbar from "./components/bottom-navbar";
import "./styles.css";

export const metadata: Metadata = {
  title: "Explore X404 dashboard",
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
      <div className="flex flex-row h-screen relative mx-auto hidden-scrollbar gap-6">
        <SideBar />
        <BottomNavbar />
        <main className="flex-grow w-full pb-32 lg:pb-0 lg:ml-4 h-full py-4 hidden-scrollbar">
          {children}
        </main>
      </div>
    </Providers>
  );
}

export default DashboardLayout;