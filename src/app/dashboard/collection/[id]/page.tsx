
import { Providers } from "./providers";
import { NftsArea } from "./components/nfts-area/NftsArea";
import { CollectionProfileArea } from "./components/CollectionProfileArea";
import { getCollectionData } from "@/fetch-functions/collection";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const Trader = dynamic(() => import("./components/Trader"));

// export async function generateMetadata({ params }: { params: { id: string } }) {
//     const { id } = params;
//     const collection = await getCollectionData(id);

//     return {
//         title: collection.collection_name,
//         description: collection.description,
//     };
// }

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
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    <Trader />
                    <NftsArea />
                </div>
            </div>
        </Providers>
    );
}