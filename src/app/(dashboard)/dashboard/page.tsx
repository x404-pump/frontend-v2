'use client';

import { Providers } from "./providers";
import dynamic from "next/dynamic";

const CollectionsSection = dynamic(() => import('./components/collections-section'));
const MainHeader = dynamic(() => import('../components/MainHeader'));

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