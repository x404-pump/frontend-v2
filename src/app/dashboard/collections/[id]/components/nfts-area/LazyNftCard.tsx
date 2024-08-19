import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from "@nextui-org/skeleton";
import { Image } from "@nextui-org/image";
import { GetTokenDataResponse } from '@aptos-labs/ts-sdk';
import { usePathname, useRouter } from 'next/navigation';
import { i } from '@aptos-labs/ts-sdk/dist/common/accountAddress-NYtf3uZq';
import { truncate } from '@/lib';
import { Tooltip } from '@nextui-org/tooltip';
import clsx from 'clsx';

interface NftCardProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Partial<GetTokenDataResponse>;
}
export function NftCard(props: NftCardProps) {
    const { token } = props;
    const router = useRouter();
    const pathname = usePathname();

    React.useEffect(() => {
        console.log(token)
    }, [token])

    return (
        <div
            className="relative flex w-full flex-none flex-col gap-3 cursor-pointer"
            role="button"
            onClick={() => router.push(`${pathname}/${token.token_data_id}`)}
        >
            <Image
                src={token.token_uri}
                alt={token.token_name}
                className={clsx(
                    "w-full aspect-square object-cover",
                    token.token_uri ? "w-full" : "w-64"
                )}
                radius="lg"
                isLoading={!token.token_uri}
                fallbackSrc="https://via.placeholder.com/128x128"
                loading="lazy"
            />
            <div className="w-full">
                <Tooltip content={token.token_name}>
                    <h3 className="text-lg font-semibold cursor-pointer w-full break-words">
                        {truncate(token.token_name!, 24)}
                    </h3>
                </Tooltip>
                {/* <p className="text-sm text-gray-500">{token.description}</p> */}
            </div>
        </div>
    )

}

interface LazyNftCardProps {
    token: Partial<GetTokenDataResponse>;
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
        <div ref={ref} className="w-full aspect-square rounded-2xl">
            {isVisible ? <NftCard token={token} /> : <Skeleton className="w-full aspect-square rounded-2xl" />}
        </div>
    );
};

export default LazyNftCard;