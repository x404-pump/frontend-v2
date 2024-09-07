'use client';

import dynamic from "next/dynamic";
import { MainHeader } from "./components/MainHeader";

const DynamicCollectionsSection = dynamic(() => import('./components/CollectionsSection'));
export default function DashboardPage() {
  return (
    <>
      <MainHeader />
      <DynamicCollectionsSection />
    </>
  );
}
