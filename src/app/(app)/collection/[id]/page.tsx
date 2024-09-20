
import { Providers } from "./providers";
// import { NftsArea } from "./components/nfts-area/NftsArea";
import { getCollectionData } from "@/fetch-functions/collection";
import { notFound } from "next/navigation";

import { mockCollection } from "@/mock";
import { USING_MOCK } from "@/config/contants";
import TabContainer from "./components/tabs";
import { CollectionProfileArea } from "./components/CollectionProfileArea";
import { NftsArea } from "./components/nfts-area/NftsArea";
import Trader from "./components/Trader";
import TransactionsArea from "./components/transactions-area";


// export async function generateMetadata({ params }: { params: { id: string } }) {
//     const { id } = params;
//     const collection = await getCollectionData(id);

//     return {
//         title: collection.collection_name,
//         description: collection.description,
//     };
// }

async function Page({
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
                <div className="flex flex-col lg:flex-row gap-8 w-full items-start">
                    <div className="flex flex-col gap-8 w-full">
                        <CollectionProfileArea />
                        <NftsArea />
                    </div>

                    <div className="hidden lg:flex flex-col gap-8 w-full max-w-sm">
                        <Trader />
                        <TransactionsArea />
                    </div>
                </div>
                <div className="lg:hidden space-y-8">
                    <Trader />
                    <TabContainer />
                </div>
            </div>
        </Providers>
    );
}

export default Page;