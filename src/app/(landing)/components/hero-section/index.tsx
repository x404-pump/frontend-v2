"use client";

import { IoRocketSharp } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DocumentAttachmentIcon } from 'hugeicons-react';

import Spline from "@splinetool/react-spline";
import { Link } from "@nextui-org/link";
import { X404_APP, X404_DOCS } from "@/config/contants";
import { Chip } from "@nextui-org/chip";
import { GradientBorder } from "@/components/ui/gradient-border";




export default function HeroSection() {
    const router = useRouter();

    return (
        <section
            id="hero"
            className="w-full flex flex-col gap-8 justify-center items-center mb-16"
        >
            <Chip
                className="bg-foreground-50/25 shadow-2xl shadow-primary py-2 h-fit px-4"
                classNames={{
                    content: "text-foreground [text-shadow:_0px_2px_8px_rgba(255,255,255,0.5)]"
                }}
                color="primary"
                variant="bordered"
                radius="full"
                size="lg"
            >
                On Aptos Chain
            </Chip>
            <motion.div
                className='flex flex-col gap-8 z-10 w-full items-center'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="flex flex-col items-center lg:items-center gap-4 z-10 w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-2xl text-center font-bold md:text-6xl text-foreground w-full break-words ">
                        Fractionalized, NFTs and Focused <br /> Launchpad
                    </h1>
                    <p className="text-center text-base lg:text-lg font-medium text-foreground-500 max-w-sm lg:max-w-screen-sm w-full">
                        Groundbreaking ecosystem built on the Aptos blockchain, centered around the new ERC404 standard for tokenized NFTs.
                    </p>
                    <div className='w-fit items-center justify-center gap-4 flex flex-row'>
                        <GradientBorder borderWidth={1.5} className="w-fit rounded-full bg-gradient-to-t from-secondary-700/50 via-white to-secondary-500">
                            <Button
                                as={Link}
                                href={X404_APP + '/dashboard'}
                                radius='full'
                                color='secondary'
                                startContent={<IoRocketSharp size={16} />}
                                className="bg-[#422B58]"
                            >
                                Lauch now
                            </Button>
                        </GradientBorder>
                        <Button
                            as={Link}
                            href={X404_DOCS}
                            radius='full'
                            variant='bordered'
                            size="md"
                            startContent={<DocumentAttachmentIcon size={16} className="text-foreground-500" />}
                            className="border-foreground border-1"
                        >
                            <b>Docs</b> | X404 docs
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}