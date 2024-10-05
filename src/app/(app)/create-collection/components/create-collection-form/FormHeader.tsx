"use client";

import { AiMagicIcon } from "hugeicons-react";

const tagItems = [
    "Auto Generated",
    "Metadata Supported",
];

export default function FormHeader() {
    return (
        <header className="w-full">
            <div className="flex flex-col gap-2 items-center justify-center w-full">
                <AiMagicIcon className="text-primary" size={64} filter="drop-shadow(0px 20px 20px rgba(147, 83, 211, 0.45))" />
                <h1 className="text-2xl lg:text-4xl font-bold text-foreground text-center">Create a collection</h1>
                <p className="text-sm md:text-base text-foreground font-medium text-center">Create your collection easily with X404</p>
            </div>
        </header>
    );
}