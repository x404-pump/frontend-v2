import { Chip } from "@nextui-org/chip";

import { Logo } from "@/components/icons";
import { appConfig } from "@/config";
import { siteConfig } from "@/config/site";

export default function LogoApp() {
    return (
        <div className="flex flex-row items-start gap-1 w-full h-fit">
            <div className="flex flex-row gap-1 items-center">
                <Logo size={24} />
                <h1 className="text-foreground-900 font-bold text-lg">{siteConfig.name.toUpperCase()}</h1>
            </div>
            <Chip color="primary" size="sm" radius="full">{appConfig.constants.APP_VERSION}</Chip>
        </div>
    )
}