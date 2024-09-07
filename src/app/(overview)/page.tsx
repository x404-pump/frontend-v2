import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { TX404YamlFile } from "@/types";
import dynamic from "next/dynamic";

const DynamicServiceSection = dynamic(() => import("./components/SolutionSection"));
const DynamicHeroSection = dynamic(() => import("./components/HeroSection"));
const DynamicIntroductionSection = dynamic(() => import("./components/IntroductionSection"));
const DynamicHeroIntroductionSection = dynamic(() => import("./components/HeroIntroductionSection"));
const DynamicHeroSolutionSection = dynamic(() => import("./components/HeroSolutionSection"));
const DynamicFlexSection = dynamic(() => import("./components/FlexSection"));
const DynamicDemoCreateCollectionSection = dynamic(() => import("./components/DemoCreateCollectionSection"));

function fetchX404AppYaml() {
  const x404AppFile = fs.readFileSync(path.join(process.cwd(), "config/x404.yaml"), "utf8");
  const x404AppData = yaml.load(x404AppFile) as TX404YamlFile;
  return x404AppData;
}
export default function Home() {
  const x404 = fetchX404AppYaml();

  return (
      <section className="flex flex-col items-center justify-center gap-4 py-4 md:py-10">
        <DynamicHeroSection />
        <DynamicFlexSection />
        <DynamicHeroSolutionSection />
        <DynamicServiceSection app={x404.app} />
        <DynamicDemoCreateCollectionSection />
        <DynamicHeroIntroductionSection />
        <DynamicIntroductionSection app={x404.app} />
      </section>
  );
}
