import { Image } from "@nextui-org/image";
import dynamic from "next/dynamic";

function DemoDashboard() {
    return (
        <div className="flex flex-row w-full items-center justify-center gap-8">
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