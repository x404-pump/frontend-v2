import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { TX404YamlFile } from "@/types";
import DemoCreateCollectionSection from "./components/demo-create-collection-form-section";
import FlexSection from "./components/flex-section";
import HeroSection from "./components/hero-section";
import IntroductionSection from "./components/introduction-section";
import ServiceSection from "./components/solution-section";
import HeroSolutionSection from "./components/solution-section/HeroSolutionSection";
import DemoDashboard from "./components/demo-dashboard";

function fetchX404AppYaml() {
  const x404AppFile = fs.readFileSync(path.join(process.cwd(), "config/x404.yaml"), "utf8");
  const x404AppData = yaml.load(x404AppFile) as TX404YamlFile;

  return x404AppData;
}
export default function Home() {
  const x404 = fetchX404AppYaml();

  return (
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-10">
        <HeroSection />
        <DemoDashboard />
        <FlexSection />
        <HeroSolutionSection />
        <ServiceSection app={x404.app} />
        <DemoCreateCollectionSection />
        <IntroductionSection app={x404.app} />
      </section>
  );
}
