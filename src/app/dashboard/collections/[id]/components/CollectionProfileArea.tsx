'use client';

import { truncateAddress } from "@aptos-labs/wallet-adapter-react";
import { useCollection } from "../context/collection";
import { Tooltip } from "@nextui-org/tooltip";
import { Image } from "@nextui-org/image";
import MintToken from "./MintToken";

const truncate = (string: string, length: number) => {
    return string.length > length ? `${string.substring(0, length)}...` : string;
};

function HeaderField({ label, value }: { label: string; value: string }) {
    return (
        <div className="w-full flex flex-row items-center gap-4 justify-between">
            <span className="text-base font-medium text-default-500">{label}</span>
            <span className="text-base font-medium text-foreground-900">{value}</span>
        </div>
    );
};

function Header() {
    const collection = useCollection();

    return (
        <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start w-full">
            <Image
                src={collection.uri}
                alt={collection.collection_name}
                radius="lg"
                classNames={{
                    wrapper: "object-cover w-full aspect-square md:w-32 md:h-32",
                }}
                fallbackSrc="https://via.placeholder.com/128x128"
                loading="lazy"
            />
            <div className="flex flex-col gap-8 w-full">
                <Tooltip content={collection.collection_name}>
                    <h1 className="text-2xl font-bold text-secondary cursor-pointer w-full break-words">
                        {truncate(collection.collection_name!, 32)}
                    </h1>
                </Tooltip>
                <div className="w-full flex flex-col gap-4 items-start">
                    <HeaderField label="Creator" value={truncateAddress(collection.creator_address) || 'N/A'} />
                    <HeaderField label="Current Supply" value={collection.current_supply} />
                </div>
            </div>
        </div>
    );
}

function Body() {
    const collection = useCollection();

    return (
        <div className="w-full">
            <p className="text-base text-foreground-800 w-full break-words">{collection.description || "No description available"}</p>
        </div>
    );
}
function Tools() {
    return (
        <div className="flex flex-row gap-4 items-center">
            <MintToken />
        </div>
    );
}
export function CollectionProfileArea() {
    return (
        <div className="bg-foreground-50 rounded-3xl border border-default/25 p-4 w-full flex flex-col gap-8">
            <Header />
            <Body />
            <Tools />
        </div>
    );
}