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
import { USING_MOCK } from "@/config/contants";
import { mockNft } from "@/mock";


export async function generateMetadata({ params }: { params: { id: string } }) {
    const { id } = params;
    let nft;

    try {
        if (USING_MOCK) {
            nft = mockNft
        } else {
            nft = await getTokenData(id);
        }
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
        if (USING_MOCK) {
            nft = mockNft
        } else {
            nft = await getTokenData(id);
            // nftMarketplaceListings = await getNftMarketplaceListingByTokenDataId(id);
        }
    } catch (error) {
        console.error(error);
    }

    if (!nft) {
        return notFound();
    }

    return (
        <Providers nft={nft} nftMarketplaceListings={nftMarketplaceListings}>
            <div className="space-y-4 md:space-y-8 relative overflow-visible w-full">
                <div className="mb-4 w-full">
                </div>
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 w-full h-fit">
                        <ImageArea />
                        <ToolsArea />
                        <DescriptionArea />
                        <TraitsArea />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 w-full lg:max-w-sm overflow-auto">
                        <DetailsArea />
                        <ActivitiesArea />
                    </div>
                </div>
            </div>
        </Providers>
    );
}