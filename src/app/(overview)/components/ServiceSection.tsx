'use client';
import { Chip } from "@nextui-org/chip";
import dynamic from "next/dynamic";
import { motion } from 'framer-motion';

const SphereLightSvg = dynamic(() => import('../assets/LightSphereSvg'), { ssr: false });

interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    tags?: string[];
    title: string;
    tagline: string;
    description: string;
}

function ServiceCard(props: ServiceCardProps) {
    const {
        tags,
        title,
        tagline,
        description,
        ...rest
    } = props;

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex flex-row flex-wrap gap-4">
                {
                    tags?.map((tag, index) => (
                        <Chip key={index} color="default" variant="bordered" className="border-default-foreground">{tag}</Chip>
                    ))
                }
            </div>
            <div className="space-y-0">
                <h2 className="text-2xl font-bold text-default-foreground">{title}</h2>
                <p className="text-xs text-default-500">{tagline}</p>
            </div>
            <p className="text-base text-default-foreground w-full md:max-w-screen-sm break-words">{description}</p>
        </div>
    )
}

export default function ServiceSection() {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="w-full flex flex-col justify-center items-center py-4 md:py-16">
            <SphereLightSvg width={"2048"} height={"2048"} className="absolute scale-50 2xl:scale-100 left-0 -translate-x-1/2 text-background -rotate-90 overflow-visible z-0" />
            <div className="w-full flex flex-col items-end gap-8 z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <ServiceCard
                        tags={["NFT", "Marketplace"]}
                        title="NFT Marketplace"
                        tagline="Buy and sell NFTs"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    <ServiceCard
                        tags={["NFT", "Marketplace"]}
                        title="NFT Marketplace"
                        tagline="Buy and sell NFTs"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </motion.div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    <ServiceCard
                        tags={["NFT", "Marketplace"]}
                        title="NFT Marketplace"
                        tagline="Buy and sell NFTs"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    />
                </motion.div>
            </div>
        </section>
    )
}