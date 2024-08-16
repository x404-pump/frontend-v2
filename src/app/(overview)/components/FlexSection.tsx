'use client';

import { Image } from "@nextui-org/image"
import clsx from "clsx"
import { Typewriter } from "react-simple-typewriter"
export function FlexSection() {
    return (
        <section
            id="x404-flex"
            className={
                clsx(
                    "relative flex flex-col gap-8 md:gap-16 items-center justify-center w-full",
                    "py-32 md:py-64"
                )
            }
        >
            <h1 className="text-start text-6xl md:text-9xl font-bold text-default-300 h-[25vh] w-full">
                <Typewriter
                    words={['1ST', 'NFTS, SOCIAL, GAMING', 'HACKATHON WINNER']}
                    loop={0}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={25}
                    delaySpeed={3000}
                />
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold text-center">About <span className="text-secondary">PUMP PUMP</span> Team</h1>
            <div className={clsx(
                "flex flex-col gap-8 items-center justify-center",
                "space-y-16 rounded-3xl md:rounded-[64px] p-4 md:p-8 w-full",
                "bg-gradient-to-b from-secondary/25 to-secondary backdrop-blur-[25px]",
            )}>
                <h2 className="text-5xl md:text-8xl text-default-foreground font-bold text-center">
                    NFTS, SOCIAL, GAMING
                    HACKATHON WINNER
                </h2>
                <Image
                    src='https://static.vecteezy.com/system/resources/previews/009/312/977/original/3d-medal-first-winner-icon-illustration-png.png'
                    alt='Dots Pattern'
                    className="object-cover w-full h-full filter brightness-90 max-w-screen-sm mx-auto"
                />
                <div className="w-full flex flex-row items-start justify-between">
                    <p className="text-sm font-medium text-default-foreground">MOVE ON APTOS</p>
                    <p className="text-sm font-medium text-default-foreground">2024</p>
                </div>
            </div>
        </section>
    )
}