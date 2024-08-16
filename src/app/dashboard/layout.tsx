import { Metadata } from "next";

import { siteConfig } from "@/config/site";
import { Navbar } from "./navbar";
import { NavBar, SideBar } from "./sidebar";

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
    <div className="flex h-screen overflow-x-clip relative container mx-auto max-w-7xl">
      <SideBar />
      <div className="flex flex-col flex-grow w-full">
        <NavBar />
        <main className="container w-full pt-8 px-6">
          {children}
        </main>
      </div>
    </div>
  );
}