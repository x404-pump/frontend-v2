'use client';

import { title } from "@/components/primitives";
import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WelcomeSection } from "./components/WelcomeSection";
import { CollectionsSection } from "./components/CollectionsSection";

export default function DashboardPage() {
  const { theme } = useTheme();
  return (
    <>
      <ToastContainer
        theme={
          theme === 'dark' ? 'dark' : 'light'
        }
      />
      <WelcomeSection />
      <CollectionsSection/>
    </>
  );
}
