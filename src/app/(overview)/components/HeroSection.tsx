'use client';

import { IoRocketSharp } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

import { GradientBorder } from '@/components/GradientBorder';
import { useRouter } from 'next/navigation';
import { ArrowDown01Icon } from 'hugeicons-react';

export function HeroSection() {
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
            className="w-full flex flex-col-reverse md:flex-col gap-8 justify-center items-start mb-64 md:my-16"
        >
            <motion.div
                className='flex flex-col gap-8 z-10 w-full'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-4 z-10 w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl font-bold md:text-5xl text-default-foreground w-full break-words text-center">
                        Fractionalized-NFTs-Focused Launchpad
                    </h1>
                    <p className="text-base md:text-2xl text-default-500 text-center">
                        Fractional Ownership and Enhanced Liquidity for NFT Collections
                    </p>
                    <div className='w-fit items-center justify-center gap-4 flex flex-row'>
                        <GradientBorder borderWidth={1} className="w-fit rounded-full bg-gradient-to-tr from-foreground-700 via-[rgba(212,170,255,25)] to-secondary-400">
                            <Button
                                radius='full'
                                color='secondary'
                                endContent={<IoRocketSharp size={16} />}
                                onClick={() => router.push('../dashboard')}
                            >
                                Lauch now
                            </Button>
                        </GradientBorder>
                        <Button
                            radius='full'
                            variant='bordered'
                            endContent={<ArrowDown01Icon size={24} />}
                            className="md:hidden"
                            onClick={handleScroll}
                        >
                            Explore now
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
            <div className='w-full sm:flex flex-row items-center justify-between'>
                <div className='w-fit space-y-2 hidden md:flex flex-col items-end'>
                    <p>Explore all amazing features</p>
                    <Button
                        radius='full'
                        variant='bordered'
                        endContent={<ArrowDown01Icon size={24} />}
                        onClick={handleScroll}
                        className="hidden md:flex"
                    >
                        Explore now
                    </Button>
                </div>
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
                <div className='w-fit space-y-2 hidden md:flex flex-col items-end'>
                    <p className='text-default-500'>Explore all amazing features</p>
                </div>
            </div>
        </section>
    )
}