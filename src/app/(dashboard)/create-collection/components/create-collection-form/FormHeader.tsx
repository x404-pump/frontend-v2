'use client';

import { Chip } from "@nextui-org/chip";
import { AiMagicIcon } from "hugeicons-react";

const tagItems = [
    "Auto Generated",
    "Metadata Supported",
];

export default function FormHeader() {
    return (
        <header className="flex flex-col items-start justify-center w-full py-4">
            <div className="flex flex-row gap-4 items-center w-fit">
                <AiMagicIcon className="text-primary" size={32} />
                <h1 className="text-2xl md:text-4xl font-bold text-default-foreground">Create a collection</h1>
            </div>
            <p className="text-sm md:text-base text-default-foreground font-medium">Create your collection easily with X404</p>
            <div className="flex flex-row gap-2 mt-4">
                {
                    tagItems.map((tag) => (
                        <Chip key={tag} variant="bordered" radius="full" size="sm">
                            {tag}
                        </Chip>
                    ))
                }
            </div>
        </header>
    );
}