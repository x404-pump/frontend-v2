'use client';
import { useState } from 'react';
import { Chip } from "@nextui-org/chip";
import { motion } from 'framer-motion';
import { TX404AppYaml } from "@/types";
import clsx from "clsx";


interface SolutionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    tags?: string[];
    title?: string;
    tagline?: string;
    descriptions?: string[];
    isHovered?: boolean;
    onHover?: (hovered: boolean) => void;
}

function SolutionCard(props: SolutionCardProps) {
    const {
        tags,
        title,
        tagline,
        descriptions,
        isHovered,
        onHover,
        ...rest
    } = props;

    return (
        <div
            className={clsx(
                "flex flex-col items-start justify-start w-full h-full gap-4",
                "p-4 md:p-8 rounded-[32px] border border-default/25",
                "bg-transparent hover:bg-gradient-to-b from-secondary-500 to-secondary-700/0 to-85%",
                "relative z-50",
                "transition-transform-colors duration-1000 ease-in-out",
                { 'hovered': isHovered }
            )}
            onMouseEnter={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
        >
            <div className="w-full flex flex-row justify-start flex-wrap gap-4">
                {
                    tags?.map((tag, index) => (
                        <Chip key={index} color="default" size="sm" variant="bordered" className="border-default-foreground">{tag}</Chip>
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
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="w-full flex flex-col md:flex-row gap-8 items-start py-4">
            {
                app.features && app.solutions.map((solution, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={variants}
                        transition={{ duration: 1, delay: 0.2 * index }}
                        className="relative overflow-visible h-full w-full"
                    >
                        <SolutionCard
                            tags={solution.tags}
                            title={solution.name}
                            descriptions={solution.descriptions}
                            isHovered={hoveredIndex === index}
                            onHover={(hovered) => setHoveredIndex(hovered ? index : null)}
                        />
                        {hoveredIndex === index && (
                            <div
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-secondary blur-[64px] rounded-lg"
                            />
                        )}
                    </motion.div>
                ))
            }
        </section>
    )
}