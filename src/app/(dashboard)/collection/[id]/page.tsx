
import { Providers } from "./providers";
// import { NftsArea } from "./components/nfts-area/NftsArea";
import { getCollectionData } from "@/fetch-functions/collection";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import { mockCollection } from "@/mock";
import { USING_MOCK } from "@/config/contants";
import TabContainer from "./components/tabs";

const Trader = dynamic(() => import("./components/Trader"));
const TransactionsArea = dynamic(() => import("./components/transactions-area"));
const CollectionProfileArea = dynamic(() =>
    import("./components/CollectionProfileArea").then((mod) => mod.CollectionProfileArea)
);
const NftsArea = dynamic(() =>
    import("./components/nfts-area/NftsArea").then((mod) => mod.NftsArea)
);


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
        if (USING_MOCK) {
            collection = mockCollection
        } else {
            collection = await getCollectionData(id);
        }
    } catch (error) {
        console.error(error);
    }

    if (!collection) {
        return notFound();
    }

    return (
        <Providers collection={collection}>
            <div className="space-y-4 md:space-y-8">
                <CollectionProfileArea />
                <div className="hidden lg:flex flex-col md:flex-row gap-8 w-full items-start">
                    <div className="flex flex-col gap-8 w-full lg:w-fit lg:min-w-80">
                        <Trader />
                        <TransactionsArea />
                    </div>
                    <NftsArea />
                </div>
                <div className="lg:hidden space-y-8">
                    <Trader />
                    <TabContainer />
                </div>
            </div>
        </Providers>
    );
}