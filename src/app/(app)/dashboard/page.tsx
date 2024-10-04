"use client";


import { Providers } from "./providers";
import CollectionsSection from "./components/collections-section";

export default function DashboardPage() {
  return (
    <Providers>
      <div className="space-y-8 h-full">
        <CollectionsSection />
      </div>
    </Providers>
  );
}
