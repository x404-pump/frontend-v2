import { getTokenData } from "@/fetch-functions";
import Providers from "./providers";
import { notFound } from "next/navigation";
import { USING_MOCK } from "@/config/contants";
import { mockNft } from "@/mock";
import ActivitiesArea from "./components/activities-area";
import DescriptionArea from "./components/description-area";
import DetailsArea from "./components/details-area";
import ImageArea from "./components/image-area";
import TraitsArea from "./components/traits-area";
import Profile from "./components/profile-area";


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
            <div className="relative overflow-auto w-full h-full">
                <div className="flex flex-col lg:flex-row gap-8 items-start w-full h-full">
                    <ImageArea />
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 w-full h-full overflow-y-auto py-16 my-auto">
                        <Profile />
                        <DetailsArea />
                        <DescriptionArea />
                        <TraitsArea />
                        <ActivitiesArea />
                    </div>
                </div>
            </div>
        </Providers>
    );
}