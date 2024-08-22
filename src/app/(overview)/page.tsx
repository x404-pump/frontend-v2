
// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";
import { HeroSection } from "./components/HeroSection";
import { FlexSection } from "./components/FlexSection";
import { IntroductionSection } from "./components/IntroductionSection";
import ServiceSection from "./components/ServiceSection";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <HeroSection />
      <FlexSection />
      <ServiceSection />
      <IntroductionSection />
    </section>
  );
}
