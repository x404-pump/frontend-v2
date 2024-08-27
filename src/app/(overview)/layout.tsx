import "@/styles/globals.css";
import { Metadata } from "next";
import { Link } from "@nextui-org/link";


import { siteConfig } from "@/config/site";
import { Image } from "@nextui-org/image";
import dynamic from "next/dynamic";
import Footer from "./footer";

const Navbar = dynamic(() => import('@/components/navbar'), { ssr: false })

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
    <div className="flex flex-col h-fit overflow-x-clip w-full relative">
      <Image
        src="/assets/pattern-light-sphere.svg"
        alt="ligth sphere"
        width={'auto'}
        height={'auto'}
        className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
      />
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
