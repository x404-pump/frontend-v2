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

    return (
        <section
            id="hero"
            className="w-full flex flex-col justify-center items-center py-4 md:py-16"
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
                    <h1 className="text-4xl font-semibold md:text-5xl text-default-foreground w-full break-words text-center">
                        Instant Launching Care-free Trading
                    </h1>
                    <p className="text-base md:text-2xl text-default-500 text-center">
                        Fractionalized-NFTs-Focused Launchpad
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
                        >
                            Explore now
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
            <div className='w-full sm:flex flex-row items-end justify-between hidden'>
                <div className='w-fit space-y-2'>
                    <p>Explore all amazing features</p>
                    <Button
                        radius='full'
                        variant='bordered'
                        endContent={<ArrowDown01Icon size={24} />}
                    >
                        Explore now
                    </Button>
                </div>
                <motion.div
                    className='relative w-fit h-fit'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Spline
                        scene="https://draft.spline.design/uSjoSvRNEFyAJjg8/scene.splinecode"
                        className='w-fit h-fit z-10'
                        style={{
                            width: '512px',
                            height: '512px',
                            zIndex: 10,
                        }}
                    />
                </motion.div>
                <div className='w-fit space-y-2'>
                    <p className='text-default-500'>Explore all amazing features</p>
                </div>
            </div>
        </section>
    )
}