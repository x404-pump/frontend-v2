import { getNftMarketplaceListingByTokenDataId, getTokenData } from "@/fetch-functions";
import Providers from "./providers";
import ImageArea from "./components/ImageArea";
import ToolsArea from "./components/ToolsArea";
import TraitsArea from "./components/TraitsArea";
import DescriptionArea from "./components/DescriptionArea";
import DetailsArea from "./components/DetailsArea";
import ActivitiesArea from "./components/ActivitiesArea";
import clsx from "clsx";
import { Divider } from "@nextui-org/divider";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;
    let nft;

    try {
        nft = await getTokenData(id);
    } catch (error) {
        console.error(error);
    }

    if (!nft) {
        return notFound();
    }

    return {
        title: nft.token_name,
        description: nft.description,
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
    let nft;
    let nftMarketplaceListings: any = [];

    try {
        nft = await getTokenData(id);
        nftMarketplaceListings = await getNftMarketplaceListingByTokenDataId(id);
    } catch (error) {
        console.error(error);
    }

    if (!nft) {
        return notFound();
    }

    return (
        <Providers nft={nft} nftMarketplaceListings={nftMarketplaceListings}>
            <div className="space-y-4 md:space-y-8 relative overflow-visible w-full">
                <div className={clsx(
                    "w-[100vw] h-72 md:h-64 blur-[128px] bg-gradient-to-b from-secondary/50 to-secondary/25",
                    "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none",
                )} />
                <div className="mb-4 w-full">
                    <ImageArea />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full">
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 w-full">
                        <ToolsArea />
                        <DescriptionArea />
                        <DetailsArea />
                        <TraitsArea />
                        <Divider />
                        <ActivitiesArea />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-1" />
                </div>
            </div>
        </Providers>
    );
}