import clsx from "clsx";

export default function HeroIntroductionSection() {
    return (
        <section className={clsx(
            "flex flex-col-reverse md:flex-row w-full h-fit rounded-[32px] md:rounded-[64px] items-center justify-center gap-4 overflow-visible",
            "p-8 md:p-16 z-10",
        )} />
    );
}