import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { useRouter } from 'next/navigation';
import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';

import { getImage, truncate } from '@/lib';
import { ICurrentTokenDatasV2, IX404TokenData } from '@/fetch-functions';
import numeral from 'numeral';


interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Partial<IX404TokenData>;
}

export function NftCard(props: NftCardProps) {
    const { token } = props;
    const router = useRouter();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    
    const fetchImage = React.useCallback(async () => {
        const image = await getImage(token);
        setImageSrc(image);
    }, [token]);

    React.useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    if(!imageSrc) {
        return(
            <Skeleton className="w-full aspect-[4/3] rounded-2xl" />
        )
    }
    return (
        <div
            className="relative flex w-full flex-none flex-col gap-4 cursor-pointer transition duration-500 hover:scale-105 transform"
            role="button"
            onClick={() => router.push(`/nft/${token.token_data_id}`)}
            onKeyDown={() => router.push(`/nft/${token.token_data_id}`)}
        >
            <Image
                src={imageSrc || ""}
                alt={token.token_name}
                className={clsx(
                    "w-full min-w-full aspect-[4/3] object-cover rounded-3xl",
                )}
                width={'100%'}
                height={'100%'}
                isLoading={!imageSrc}
                fallbackSrc="https://via.placeholder.com/1000x1000"
                loading="eager"
            />
            <div className="w-full">
                <Tooltip content={token.token_name}>
                    <h3 className="text-lg font-semibold cursor-pointer w-full break-words capitalize">
                        {truncate(token.token_name!, 24)}
                    </h3>
                </Tooltip>
                <div className='flex flex-row justify-between w-full gap-2'>
                    <h6 className='text-sm text-foreground-500'>Price</h6>
                    <p className="text-sm font-semibold">
                        {numeral(token.price).format('0,0.00')}
                    </p>
                </div>
            </div>
        </div>
    )

}

interface LazyNftCardProps {
    token: Partial<ICurrentTokenDatasV2>;
}

const LazyNftCard: React.FC<LazyNftCardProps> = ({ token }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div ref={ref} className="rounded-2xl">
            {isVisible ? <NftCard token={token} /> : <Skeleton className="w-full aspect-square rounded-2xl" />}
        </div>
    );
};

export default LazyNftCard;