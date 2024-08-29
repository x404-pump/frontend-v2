'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Image } from '@nextui-org/image';

export default function DemoCreateCollectionSection() {
    return (
        <m.section
            className='w-full flex flex-col items-center justify-center gap-4 my-64'
        >
            <div className='flex flex-col items-center justify-center gap-0'>
                <h1 className='text-lg md:text-4xl font-bold text-default-foreground text-center'>
                    No-code NFT Collection
                    <br/>
                    creation & instant launching
                </h1>
                <p className='text-xs md:text-base text-center text-default-foreground break-words'>
                X404 is a good platform with strong support for nft generation
                </p>
            </div>
            <Image
                src="/assets/image-demo-ui-create-collection.png"
                alt="Create Collection"
                className="w-full object-cover"
            />
        </m.section>
    )
}