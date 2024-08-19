'use client';

import { WelcomeSection } from "./components/WelcomeSection";
import { CollectionsSection } from "./components/CollectionsSection";

export default function DashboardPage() {
  return (
    <>
      <WelcomeSection />
      <CollectionsSection/>
    </>
  );
}
