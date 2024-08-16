'use client';

import { Logo } from '@/components/icons';
import { IoRocketSharp } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

import './HeroSection.css';
import { GradientBorder } from '@/components/GradientBorder';
import { useRouter } from 'next/navigation';
import { useMedia } from '@/hooks';

export function HeroSection() {
    const router = useRouter();
    const { isMobile } = useMedia();
    return (
        <section
            id="hero"
            className="w-full flex flex-col md:flex-row justify-between py-4 md:py-16"
        >
            <motion.div
                className='flex flex-col gap-8 z-10 w-full'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <GradientBorder borderWidth={1} className="w-fit rounded-full bg-gradient-to-tr from-foreground-50 to-foreground-900">
                    <div
                        className="flex flex-row bg-foreground-50 px-4 py-2 rounded-full items-center gap-4 h-full w-full z-10"
                    >
                        <Logo size={32} />
                        x
                        <img src='/aptos.svg' alt='Aptos Logo' sizes='32px' />
                    </div>
                </GradientBorder>
                <motion.div
                    className="flex flex-col gap-4 z-10 w-full"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl font-bold md:text-6xl text-default-foreground">
                        Instant Launching Care-free Trading
                    </h1>
                    <p className="text-base md:text-2xl text-default-500">
                        Fractionalized-NFTs-Focused Launchpad
                    </p>
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
                </motion.div>
            </motion.div>
            {!isMobile && (
                <motion.div
                    className='relative w-fit h-fit'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Spline
                        scene="https://draft.spline.design/AnNJYj4C-MzlkEGi/scene.splinecode"
                        className='w-fit h-fit z-10'
                        style={{
                            width: '512px',
                            height: '512px',
                            zIndex: 10,
                        }}
                    />
                </motion.div>
            )}
        </section>
    )
}