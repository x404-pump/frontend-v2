import { getCollectionData } from "@/fetch-functions/getCollectionData";
import { CollectionProvider } from "./context/collection";
import { Providers } from "./providers";
import { CollectionProfileArea } from "./components/CollectionProfileArea";
import clsx from "clsx";
import { NftsArea } from "./components/NftsArea";

export default async function Page({
    params,
}: {
    params: {
        id: string;
    };
}) {
    const { id } = params;
    const collection = await getCollectionData(id);

    return (
        <Providers collection={collection}>
            <div className="space-y-4 md:space-y-8">
                <div className="w-full">
                    <CollectionProfileArea />
                </div>
                <NftsArea />
                <div className={clsx(
                    "w-[30vw] aspect-square rounded-full bg-secondary/25 blur-[128px]",
                    "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none",
                )} />
            </div>
        </Providers>
    );
}