'use client';

import { IoRocketSharp } from "react-icons/io5";
import { Button } from '@nextui-org/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowDown01Icon } from 'hugeicons-react';
import { Image } from "@nextui-org/image";
import dynamic from "next/dynamic";

import { GradientBorder } from '@/components/GradientBorder';



const Spline = dynamic(() => import('@splinetool/react-spline'));

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
            className="w-full flex flex-col gap-8 justify-center items-start mb-64"
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
                    <h1 className="text-4xl font-bold md:text-5xl text-default-foreground w-full break-words text-center">
                        Fractionalized-NFTs-Focused <br/> Launchpad
                    </h1>
                    <p className="text-base md:text-2xl text-default-500 text-center">
                        Fractional Ownership and Enhanced Liquidity for NFT Collections
                    </p>
                    <div className='w-fit items-center justify-center gap-4 flex flex-row'>
                        <GradientBorder borderWidth={1.5} className="w-fit rounded-full bg-gradient-to-t from-secondary-700/50 via-white to-secondary-500">
                            <Button
                                radius='full'
                                color='secondary'
                                endContent={<IoRocketSharp size={16} />}
                                className="bg-secondary"
                                onClick={() => router.push('../dashboard')}
                            >
                                Lauch now
                            </Button>
                        </GradientBorder>
                        <Button
                            radius='full'
                            variant='bordered'
                            size="md"
                            endContent={<ArrowDown01Icon size={24} />}
                            onClick={handleScroll}
                        >
                            Explore now
                        </Button>
                    </div>
                </motion.div>
            </motion.div>
            <Image
                src="/assets/image-demo-ui-collection.png"
                alt="Hero Image"
                className="w-full object-cover"
            />
        </section>
    )
}