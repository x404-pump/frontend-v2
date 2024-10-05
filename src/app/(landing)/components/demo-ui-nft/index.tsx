"use client";

import React from 'react';
import { m } from 'framer-motion';
import { Image } from '@nextui-org/image';

export default function DemoUINFTSection() {
    return (
        <m.section
            className='w-full flex flex-col items-center justify-center gap-8 my-8'
        >
            <div className='flex flex-col items-center justify-center gap-0'>
                <h1 className='text-2xl md:text-4xl font-bold text-foreground text-center'>
                    Easily to track and operate with nft
                </h1>
                <p className='text-sm lg:text-base text-center text-foreground break-words'>
                    Best UI/UX design for better visualization
                </p>
            </div>
            <Image
                src="/assets/image-demo-ui-nft.png"
                alt="Create Collection"
                className="w-full object-cover"
                classNames={{
                    wrapper: 'rounded-[24px] lg:rounded-[48px] w-fit h-fit bg-foreground-100 flex items-center justify-center p-4',
                }}
            />
        </m.section>
    )
}
