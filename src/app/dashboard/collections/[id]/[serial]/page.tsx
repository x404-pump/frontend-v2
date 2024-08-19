import { getTokenData } from "@/fetch-functions";
import Providers from "./providers";
import ImageArea from "./components/ImageArea";
import ToolsArea from "./components/ToolsArea";
import TraitsArea from "./components/TraitsArea";
import DescriptionArea from "./components/DescriptionArea";
import DetailsArea from "./components/DetailsArea";
import ActivitiesArea from "./components/ActivitiesArea";
import clsx from "clsx";

export default async function Page({
    params,
}: {
    params: {
        serial: string;
    };
}) {
    const { serial } = params;
    const nft = await getTokenData(serial);
    
    return (
        <Providers nft={nft}>
            <div className="container mx-auto p-4 relative">
                <div className={clsx(
                    "w-[30vw] aspect-square rounded-full bg-secondary/25 blur-[128px]",
                    "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none",
                )} />
                <div className={clsx(
                    "w-[30vw] aspect-square rounded-full bg-secondary/25 blur-[128px]",
                    "absolute top-1/2 right-0 translate-x-1/2 z-0 pointer-events-none",
                )} />
                <div className="mb-4">
                    <ImageArea />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-2">
                        <ToolsArea />
                        <DescriptionArea />
                        <ActivitiesArea />
                    </div>
                    <div className="flex flex-col gap-4 md:gap-8 md:col-span-1">
                        <DetailsArea />
                        <TraitsArea />
                    </div>
                </div>
            </div>
        </Providers>
    );
}