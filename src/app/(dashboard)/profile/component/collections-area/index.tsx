import { CollectionCard } from "@/app/(dashboard)/dashboard/components/collections-carousel/CollectionsCarousel";
import ScaleContainer from "@/components/ScaleContainer";
import { USING_MOCK } from "@/config/contants";
import { mockCollections } from "@/mock";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function Index() {
    const { account } = useWallet();
    let collections;
    if (USING_MOCK) {
        collections = mockCollections;
    }

    return (
        <div className="w-full flex flex-col gap-4 md:gap-6 lg:gap-8">
            {
                collections && collections.map((collection) => (
                    <CollectionCard key={collection.collection_id} collection={collection} />
                ))
            }
        </div>
    )
}