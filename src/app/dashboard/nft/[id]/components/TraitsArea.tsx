'use client';
import { GradientBorder } from "@/components/GradientBorder";
import { useNft } from "../contexts/nft";

function TraitCard({ label, value }: { label: string, value: string }) {
    return (
        <GradientBorder
            borderWidth={1}
            className="bg-gradient-to-tr from-white to-[rgba(63,63,70,0.4)] w-fit rounded-[20px]"
        >
            <div className="flex flex-col p-4 justify-center items-start bg-foreground-50 w-full h-full rounded-[20px]">
                <p className="text-base font-normal text-secondary">{label.toUpperCase()}</p>
                <p className="text-base font-medium text-default-foreground">{value}</p>
            </div>
        </GradientBorder>
    );
}

export default function TraitsArea() {
    const nft = useNft();
    const properties = nft.token_properties;

    return (
        <div className="space-y-4 w-full relative">
            <h6 className="text-2xl font-semibold text-default-foreground">Traits</h6>
            <div className="flex flex-row gap-2 flex-wrap">
                {
                    properties && Object.entries(properties).map(([key, value]: [string, any]) => (
                        <TraitCard key={key} label={key} value={value} />
                    ))
                }
                {
                    !properties && <p className="text-base font-normal text-default-500">No traits available</p>
                }
            </div>
        </div>
    );
}