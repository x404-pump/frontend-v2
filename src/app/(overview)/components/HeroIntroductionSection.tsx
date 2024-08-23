import { Image } from "@nextui-org/image";
import clsx from "clsx";

export default function HeroIntroductionSection() {
    return (
        <section className={clsx(
            "flex flex-col-reverse md:flex-row w-full h-fit rounded-[64px] items-center justify-center gap-4 overflow-visible",
            "p-8 md:p-16 z-10 my-32 md:my-64",
            "bg-foreground-50"
        )}>
            <div className="w-full flex flex-col items-center md:items-start space-y-2">
                <div className="bg-gradient-to-r from-[rgba(0,0,0,0)] to-secondary rounded-full h-4 w-64" />
                <h1
                    className="text-4xl text-center md:text-start md:text-6xl capitalize font-normal text-default-foreground break-words w-full max-w-screen-sm"
                >
                    Discover all the <b>features</b> of the <span className="font-bold text-secondary">X404</span>
                </h1>
                <p className="text-base text-foreground-500 w-full break-words text-center md:text-start">What amazing features we bring for you</p>
            </div>
            <div className="relative">
                <Image
                    src="/assets/image-purple-rocket.png"
                    alt="Hero"
                    className="w-[180px] md:w-[360px] aspect-square overflow-visible z-10 m-auto"
                />
                <div className="w-64 aspect-square rounded-full bg-secondary/75 blur-[128px] z-0 m-auto absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
            </div>
        </section>
    );
}