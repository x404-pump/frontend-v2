'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Image } from '@nextui-org/image';

export default function DemoCreateCollectionSection() {
    return (
        <m.section
            className='w-full flex flex-col items-center justify-center gap-8 my-8'
        >
            <div className='flex flex-col items-center justify-center gap-0'>
                <p className='text-primary text-sm text-center'>ERC404 Tokenized</p>
                <h1 className='text-2xl md:text-4xl font-bold text-foreground text-center'>
                    Create Collection with X404
                </h1>
                <p className='text-sm lg:text-base text-center text-default-foreground break-words'>
                X404 is a good platform with strong support for nft generation
                </p>
            </div>
            <Image
                src="/assets/image-demo-ui-create-collection.png"
                alt="Create Collection"
                className="w-full object-cover"
                classNames={{
                    wrapper: 'rounded-[24px] lg:rounded-[48px] w-fit h-fit bg-foreground-100 flex items-center justify-center p-4',
                }}
            />
        </m.section>
    )
}
