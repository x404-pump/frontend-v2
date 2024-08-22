
import { Providers } from "./providers";
import { NftsArea } from "./components/nfts-area/NftsArea";
import { CollectionProfileArea } from "./components/CollectionProfileArea";
import { getCollectionData } from "@/fetch-functions/collection";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;
    const collection = await getCollectionData(id);

    return {
        title: collection.collection_name,
        description: collection.description,
    };
}

export default async function Page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const { id } = params;
    let collection;

    try {
        collection = await getCollectionData(id) as any;
    } catch (error) {
    }
    
    if (!collection) {
        return notFound();
    }

    return (
        <Providers collection={collection}>
            <div className="space-y-4 md:space-y-8">
                <CollectionProfileArea />
                <NftsArea />
                {/* <div className={clsx(
                    "w-[30vw] aspect-square rounded-full bg-secondary/25 blur-[128px]",
                    "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none",
                )} /> */}
            </div>
        </Providers>
    );
}