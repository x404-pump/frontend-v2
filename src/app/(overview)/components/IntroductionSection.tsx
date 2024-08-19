import { Chip } from "@nextui-org/chip";
import clsx from "clsx";

interface ServiceCardProps {
    title: string;
    description: string;
    tags?: string[];
    classNames?: {
        border?: string;
        container?: string;
        title?: string;
        content?: string;
    }
}

const services: {
    title: string;
    description: string;
    tags?: string[];
}[] = [
        {
            title: "NFT Operators",
            description: "The best from tokens & NFTs No-code NFT Collection creation & instant launching",
            tags: ["Token", "High quality", "Launchpad"],
        },
        {
            title: "Care-free Trading",
            description: "Evolving NFT Landscape...",
            tags: ["NFT", "Trading", "Care free"],
        },
    ]

function ServiceCard({ title, description, classNames, tags }: ServiceCardProps) {
    return (
        <div className={
            clsx(
                "flex flex-col gap-2 p-4 bg-foreground-50/95 rounded-2xl w-full h-full backdrop-blur-md border border-default/50",
                classNames?.container
            )
        }>
            <h2 className={clsx(
                "text-2xl font-semibold text-secondary",
                classNames?.title
            )}>{title}</h2>
            <p className={clsx(
                "text-base text-default-500",
                classNames?.content
            )}>{description}</p>
            {
                tags && (
                    <div className="flex flex-row gap-2 flex-wrap">
                        {tags.map((tag) => (
                            <Chip key={tag} variant="bordered" color="secondary" size="sm">{tag}</Chip>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export function IntroductionSection() {
    return (
        <section
            id="introduction"
            className="w-full flex flex-col gap-8 justify-between py-8 md:py-16 relative"
        >
            <div
                className="absolute top-0 left-0 bg-secondary w-[512px] rounded-full opacity-50 aspect-square blur-[180px] z-0"
            />
            <h1 className="text-4xl font-bold text-default-foreground z-10">Introducing</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <ServiceCard
                    title={services[0].title}
                    description={services[0].description}
                    tags={services[0].tags}
                    classNames={{
                        container: "col-start-1 row-start-2 col-span-2 row-span-1 w-full h-full"
                    }}
                />
                <ServiceCard
                    title={services[1].title}
                    description={services[1].description}
                    tags={services[1].tags}
                    classNames={{
                        container: "col-start-2 row-start-2 col-span-2 row-span-1 w-full h-full"
                    }}
                />
            </div>
        </section>
    )
}