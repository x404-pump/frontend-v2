'use client';

import dynamic from "next/dynamic";
import { MainHeader } from "../components/MainHeader";

const CollectionsSection = dynamic(() => import('./components/collections-table'));
const CollectionsCarouselSection = dynamic(() => import('./components/collections-carousel'));

export default function DashboardPage() {
  return (
    <>
      <MainHeader />
      <CollectionsCarouselSection />
      <CollectionsSection />
    </>
  );
}
