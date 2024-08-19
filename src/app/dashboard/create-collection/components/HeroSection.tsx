import { Chip } from "@nextui-org/chip";

const tagItems = [
    "Auto Generated",
    "Metadata Supported",
];

export default function HeroSection() {
    return (
        <section className="flex flex-col items-start justify-center w-full">
            <h1 className="text-4xl font-bold text-default-foreground">Create a collection</h1>
            <p className="text-base text-default-foreground font-medium">Create your collection easily with X404</p>
            <div className="flex flex-row gap-2 mt-4">
                {
                    tagItems.map((tag) => (
                        <Chip key={tag} variant="bordered" radius="full" size="sm">
                            {tag}
                        </Chip>
                    ))
                }
            </div>
        </section>
    );
}