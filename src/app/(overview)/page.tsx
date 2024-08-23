import fs from "fs";
import path from "path";
import yaml from "js-yaml";

import { HeroSection } from "./components/HeroSection";
import { FlexSection } from "./components/FlexSection";
import { IntroductionSection } from "./components/IntroductionSection";
import ServiceSection from "./components/SolutionSection";
import { TX404YamlFile } from "@/types";
import HeroIntroductionSection from "./components/HeroIntroductionSection";
import HeroSolutionSection from "./components/HeroSolutionSection";

function fetchX404AppYaml() {
  const x404AppFile = fs.readFileSync(path.join(process.cwd(), "config/x404.yaml"), "utf8");
  const x404AppData = yaml.load(x404AppFile) as TX404YamlFile;
  return x404AppData;
}
export default function Home() {
  const x404 = fetchX404AppYaml();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <HeroSection />
      <FlexSection />
      <HeroSolutionSection />
      <ServiceSection app={x404.app} />
      <HeroIntroductionSection />
      <IntroductionSection app={x404.app}/>
    </section>
  );
}
