'use client';

import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { Chip } from "@nextui-org/chip";
import dynamic from "next/dynamic";
import { motion } from 'framer-motion';

const RectangleForFlexSvg = dynamic(() => import('../assets/RectangleForFlexSvg'), { ssr: false });

export function FlexSection() {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section
            id="x404-flex"
            className={clsx(
                "relative flex flex-col items-center justify-center w-full",
                "py-32 md:py-64 overflow-visible z-10 2xl:mb-64"
            )}
        >
            <div className="flex flex-col items-center gap-2 justify-center">
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-center text-secondary z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    X404.PUMP
                </motion.h1>
                <motion.h1
                    className="text-4xl md:text-5xl font-semibold text-center text-default-foreground z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.4 }}
                >
                    Hackathon Winner
                </motion.h1>
                <motion.p
                    className="text-center text-default-foreground z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Winner of NFTs, Social, Gaming at Move <br /> On Aptos Hackathon 2024
                </motion.p>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <Image
                        src='https://static.vecteezy.com/system/resources/previews/009/312/977/original/3d-medal-first-winner-icon-illustration-png.png'
                        alt='1st place winner'
                        className="object-cover w-32 h-auto filter brightness-90 max-w-screen-sm mx-auto"
                    />
                </motion.div>
            </div>
            <div className={clsx(
                "flex flex-col gap-8 items-center justify-center",
                "w-full",
            )}>
                <RectangleForFlexSvg className="text-background absolute max-w-[360px] md:max-w-screen-md bottom-0 z-0 overflow-visible" />

                <motion.div
                    className="w-full flex flex-row items-start justify-between"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={variants}
                    transition={{ duration: 1, delay: 1 }}
                >
                    <Chip color="default" className="w-1/3 border-none" variant="dot">Move on Aptos</Chip>
                    <Chip color="default" className="w-1/3 border-none" variant="dot">2024</Chip>
                </motion.div>
            </div>
        </section>
    );
}