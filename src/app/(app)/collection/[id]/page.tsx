
import { Providers } from "./providers";
import { getCollectionData } from "@/fetch-functions/collection";
import { notFound } from "next/navigation";

import { mockCollection } from "@/mock";
import { USING_MOCK } from "@/config/contants";
import TabContainer from "./components/tabs";
import { CollectionProfileArea } from "./components/profile";
import { NftsArea } from "./components/nfts-area/NftsArea";
import Trader from "./components/swap";
import TransactionsArea from "./components/transactions-area";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;
    let collection = mockCollection;

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

    return {
        title: collection.collection_name,
        description: collection.description,
    };
}

async function Page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const { id } = params;
    let collection = mockCollection;

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
            <div className="space-y-4 md:space-y-8 h-full hidden-scrollbar">
                <div className="flex flex-col-reverse lg:flex-row gap-8 w-full items-start">
                    <div className="flex flex-col gap-8 w-full h-screen overflow-x-visible relative">
                        <CollectionProfileArea />
                        <NftsArea />
                    </div>

                    <div className="hidden lg:flex flex-col gap-8 w-full max-w-sm h-screen overflow-clip">
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