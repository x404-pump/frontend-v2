import { Image } from "@nextui-org/image";

export default function DemoDashboard() {
    return (
        <div className="flex flex-row w-full items-center justify-center gap-8 relative overflow-visible max-w-screen-lg">
            <div
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(147, 83, 211, 100) 0%, rgba(147, 83, 211, 0.00) 100%)',
                }}
                className="rounded-[20px] w-full h-full absolute z-0 blur-[256px] lg:blur-[512px] shadow"
            />
            <Image
                src="/assets/image-demo-dashboard.png"
                alt="Dashboard"
                className="w-full object-cover shadow-2xl"
                classNames={{
                    wrapper: 'w-full'
                }}
            />
        </div>
    );
}