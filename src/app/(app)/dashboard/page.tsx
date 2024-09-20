'use client';

import dynamic from "next/dynamic";

import { Providers } from "./providers";
import CollectionsSection from "./components/collections-section";

function DashboardPage() {
  return (
    <Providers>
      <div className="space-y-8 h-full">
        <CollectionsSection />
      </div>
    </Providers>
  );
}

export default dynamic(() => Promise.resolve(DashboardPage));