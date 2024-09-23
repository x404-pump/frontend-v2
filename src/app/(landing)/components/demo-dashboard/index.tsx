import { Image } from "@nextui-org/image";
import dynamic from "next/dynamic";

function DemoDashboard() {
    return (
        <div className="flex flex-row w-full items-center justify-center gap-8">
            <div className="lg:flex flex-col gap-0 hidden flex-grow">
                <h6 className="text-2xl lg:text-4xl font-semibold text-foreground w-full">
                    Easily to track and operate with collection
                </h6>
                <p className="text-base">
                    Best UI/UX design for better visualization
                </p>
            </div>
            <Image
                src="/assets/image-demo-dashboard.png"
                alt="Dashboard"
                className="w-full object-cover"
                classNames={{
                    wrapper: 'max-w-screen-sm w-full'
                }}
            />
        </div>
    );
}

export default dynamic(() => Promise.resolve(DemoDashboard), {});