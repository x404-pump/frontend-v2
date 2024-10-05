"use client";

import { useNft } from "../../contexts/nft";
import { Container } from "@/components/ui";
import EmptyContent from "@/components/empty-content";

function TraitCard({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col p-4 justify-center items-start bg-foreground-50 w-full h-full rounded-small border-2 border-default-200">
            <p className="text-base font-normal text-secondary">{label.toUpperCase()}</p>
            <p className="text-base font-medium text-foreground">{value}</p>
        </div>
    );
}

export default function TraitsArea() {
    const nft = useNft();
    const properties = nft.token_properties;

    return (
        <Container className="space-y-4 w-full relative" title="Traits">
            <div className="flex flex-row gap-2 flex-wrap">
                {
                    properties && Object.entries(properties).map(([key, value]: [string, any]) => (
                        <TraitCard key={key} label={key} value={value} />
                    ))
                }
                {
                    !properties && <EmptyContent />
                }
            </div>
        </Container>
    );
}