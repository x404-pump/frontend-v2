'use client';

import dynamic from "next/dynamic";

import CollectionsSection from "./components/collections-table";
import { Providers } from "./providers";

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