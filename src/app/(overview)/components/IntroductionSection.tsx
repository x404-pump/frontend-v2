'use client';

import { TX404AppYaml } from "@/types";
import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { motion } from 'framer-motion';

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    tags?: string[];
    classNames?: {
        border?: string;
        container?: string;
        title?: string;
        content?: string;
    };
    index?: number;
}

function FeatureCard({ title, description, classNames, tags, index }: ServiceCardProps) {
    return (
        <motion.div
            key={index}
            className={
                clsx(
                    "flex flex-col items-center gap-2 p-2 md:p-4 bg-foreground-50 rounded-[32px] md:rounded-[64px] w-full h-full backdrop-blur-md border border-default/50",
                    classNames?.container
                )
            }
            initial={{ opacity: 0, y: 50, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: index! * 0.2 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <Image
                src={`/assets/image-for-sol-${index}.svg`}
                alt={title}
                className="w-full"
                classNames={{
                    wrapper: "w-full"
                }}
            />
            <h2 className={clsx(
                "text-base md:text-2xl font-semibold text-foreground-900 text-center",
                classNames?.title
            )}>
                {title}
            </h2>
            <p className={clsx(
                "text-xs md:text-base text-default-500",
                classNames?.content
            )}>
                {description}
            </p>
        </motion.div>
    )
}

interface IntroductionSectionProps {
    app: TX404AppYaml;
}
export function IntroductionSection({ app }: IntroductionSectionProps) {
    return (
        <section
            id="introduction"
            className="w-full flex flex-col gap-8 justify-between items-center relative"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {
                    app.features && app.features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            index={index + 1}
                            title={feature.name}
                            description={feature.description || ""}
                        />
                    ))
                }
            </div>
        </section>
    )
}