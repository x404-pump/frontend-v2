'use client';
import { Chip } from "@nextui-org/chip";
import dynamic from "next/dynamic";
import { motion } from 'framer-motion';
import { TX404AppYaml } from "@/types";

const SphereLightSvg = dynamic(() => import('../assets/LightSphereSvg'), { ssr: false });

interface SolutionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    tags?: string[];
    title?: string;
    tagline?: string;
    descriptions?: string[];
}

function SolutionCard(props: SolutionCardProps) {
    const {
        tags,
        title,
        tagline,
        descriptions,
        ...rest
    } = props;

    return (
        <div className="flex flex-col items-start w-full gap-4">
            <div className="w-full flex flex-row flex-wrap gap-4">
                {
                    tags?.map((tag, index) => (
                        <Chip key={index} color="default" variant="bordered" className="border-default-foreground">{tag}</Chip>
                    ))
                }
            </div>
            <div className="space-y-0">
                <h2 className="text-lg md:text-2xl font-bold text-default-foreground">{title}</h2>
                <p className="text-xs text-default-500">{tagline}</p>
            </div>
            <p className="text-sm md:text-base text-default-foreground w-full md:max-w-screen-sm break-words">
                {
                    descriptions?.map((description, index) => (
                        <span key={index}>{description}<br /></span>
                    ))
                }
            </p>
        </div>
    )
}

interface ServiceSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    app: TX404AppYaml;
}
export default function ServiceSection(props: ServiceSectionProps) {
    const { app } = props;

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="w-full flex flex-col gap-8 justify-center items-center py-4 md:py-16">
            <SphereLightSvg width={"2048"} height={"2048"} className="absolute scale-50 2xl:scale-100 left-0 md:-translate-x-1/2 text-background -rotate-90 overflow-visible z-0" />
            <div className="w-full flex flex-col items-start gap-8 z-10 ml-auto  md:ml-[75vw]">
                {
                    app.features && app.solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={variants}
                            transition={{ duration: 1, delay: 0.2 * index }}
                        >
                            <SolutionCard
                                tags={solution.tags}
                                title={solution.name}
                                descriptions={solution.descriptions}
                            />
                        </motion.div>
                    ))
                }
            </div>
        </section>
    )
}