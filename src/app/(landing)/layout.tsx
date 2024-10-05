import "@/styles/globals.css";
import { Metadata } from "next";


import { siteConfig } from "@/config/site";
import Footer from "./footer";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: siteConfig.slogan,
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
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-4 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
