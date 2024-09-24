'use client';

import { TX404AppYaml } from "@/types";
import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { motion } from 'framer-motion';
import { ArrowDataTransferHorizontalIcon, BankIcon, Chatting01Icon, CheckmarkCircle01Icon, FlashIcon, NanoTechnologyIcon, PackageReceiveIcon } from "hugeicons-react";
import dynamic from "next/dynamic";

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
    const getFeatureIcon = (feature: string) => {
        switch (feature.toLowerCase()) {
            case "wrap nft into erc404":
                return <PackageReceiveIcon size={16} />
            case "aip404 in defi":
                return <BankIcon size={16} />
            case "cross-chain nft":
                return <ArrowDataTransferHorizontalIcon size={16} />
            case "technical-wise":
                return <NanoTechnologyIcon size={16} />
            case "social platform":
                return <Chatting01Icon size={16} />
            case "governance token":
                return <CheckmarkCircle01Icon size={16} />
            default:
                return <FlashIcon size={16} />
        }
    }

    return (
        <motion.div
            key={index}
            className={
                clsx(
                    "flex flex-row items-center gap-2 p-4 bg-foreground-50 rounded-3xl w-full h-full backdrop-blur-md border border-default/50",
                )
            }
        >
            <div className="relative w-8 h-8 p-2 bg-foreground-200 rounded-full flex items-center justify-center">
                {getFeatureIcon(title)}
                <div className="bg-primary w-6 h-6 -z-10 rounded-full absolute blur-2xl" />
            </div>
            <div className="flex flex-col gap-0 justify-center">

                <h6 className={clsx(
                    "text-lg font-semibold text-foreground-900",
                    classNames?.title
                )}>
                    {title}
                </h6>
                <p className={clsx(
                    "text-sm text-foreground-500",
                    classNames?.content
                )}>
                    {description}
                </p>
            </div>
        </motion.div>
    )
}

interface IntroductionSectionProps {
    app: TX404AppYaml;
}
export default function IntroductionSection({ app }: IntroductionSectionProps) {
    return (
        <section
            id="introduction"
            className="w-full flex flex-col gap-8 justify-between items-center relative"
        >
            <div className="flex items-center flex-col">
                <h4 className="text-2xl lg:text-4xl font-bold text-foreground">Introduction</h4>
                <p className="text-sm lg:text-base text-foreground-500 max-w-screen-sm break-words">
                    Explore all the features of X404
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
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
