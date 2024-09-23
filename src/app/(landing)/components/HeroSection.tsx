'use client';

import { IoRocketSharp } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DocumentAttachmentIcon } from 'hugeicons-react';
import { Image } from "@nextui-org/image";

import { GradientBorder } from '@/components/GradientBorder';
import Spline from "@splinetool/react-spline";
import { Link } from "@nextui-org/link";
import { X404_APP, X404_DOCS } from "@/config/contants";




export default function HeroSection() {
    const router = useRouter();

    const handleScroll = () => {
        const flexSection = document.getElementById('flex');
        if (flexSection) {
            flexSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="w-full flex flex-col gap-8 justify-center items-start mb-16"
        >
            <motion.div
                className='flex flex-col gap-8 z-10 w-full'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className='relative w-full h-fit flex items-center justify-center'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Spline
                        scene="https://draft.spline.design/NqRsjdQPUgyBMUmX/scene.splinecode"
                        className='w-fit h-fit z-10'
                        style={{
                            width: '256px',
                            height: '256px',
                            zIndex: 10,
                        }}
                    />
                </motion.div>
                <motion.div
                    className="flex flex-col items-center gap-4 z-10 w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-2xl lg:text-4xl font-bold md:text-5xl text-default-foreground w-full break-words text-center">
                        Fractionalized-NFTs-Focused <br /> Launchpad
                    </h1>
                    <p className="text-base text-default-500 text-center max-w-screen-sm w-full">
                        X404 PUMP is a groundbreaking ecosystem built on the Aptos blockchain, centered around the new ERC404 standard for tokenized NFTs.
                    </p>
                    <div className='w-fit items-center justify-center gap-4 flex flex-row'>
                        <GradientBorder borderWidth={1.5} className="w-fit rounded-full bg-gradient-to-t from-secondary-700/50 via-white to-secondary-500">
                            <Button
                                as={Link}
                                href={X404_APP + '/dashboard'}
                                radius='full'
                                color='secondary'
                                endContent={<IoRocketSharp size={16} />}
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