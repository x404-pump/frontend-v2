import "@/styles/globals.css";
import { Metadata } from "next";


import { siteConfig } from "@/config/site";
import Footer from "./footer";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-fit w-full relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] aspect-[3/1] bg-gradient-to-b from-secondary-500 to-secondary-700/0 blur-[64px] lg:blur-[128px] rounded-full"
      />
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-4 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
