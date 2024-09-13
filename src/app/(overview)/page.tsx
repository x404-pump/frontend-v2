import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { TX404YamlFile } from "@/types";
import dynamic from "next/dynamic";

const ServiceSection = dynamic(() => import("./components/SolutionSection"));
const HeroSection = dynamic(() => import("./components/HeroSection"));
const IntroductionSection = dynamic(() => import("./components/IntroductionSection"));
const HeroIntroductionSection = dynamic(() => import("./components/HeroIntroductionSection"));
const HeroSolutionSection = dynamic(() => import("./components/HeroSolutionSection"));
const FlexSection = dynamic(() => import("./components/FlexSection"));
const DemoCreateCollectionSection = dynamic(() => import("./components/DemoCreateCollectionSection"));

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
        <FlexSection />
        <HeroSolutionSection />
        <ServiceSection app={x404.app} />
        <DemoCreateCollectionSection />
        <HeroIntroductionSection />
        <IntroductionSection app={x404.app} />
      </section>
  );
}
