'use client';

import { Chip } from "@nextui-org/chip";
import { AiMagicIcon } from "hugeicons-react";

const tagItems = [
    "Auto Generated",
    "Metadata Supported",
];

export default function FormHeader() {
    return (
        <header className="w-full py-4">
            <div className="flex flex-col gap-2 items-start justify-center w-full">
                <AiMagicIcon className="text-primary" size={64} filter="drop-shadow(0px 20px 20px rgba(147, 83, 211, 0.45))" />
                <h1 className="text-2xl font-bold text-default-foreground text-center">Create a collection</h1>
                <p className="text-sm md:text-base text-default-foreground font-medium text-center">Create your collection easily with X404</p>
                <div className="flex flex-row gap-2 mt-4 justify-center">
                    {
                        tagItems.map((tag) => (
                            <Chip key={tag} variant="bordered" radius="full" size="sm">
                                {tag}
                            </Chip>
                        ))
                    }
                </div>
            </div>
        </header>
    );
}