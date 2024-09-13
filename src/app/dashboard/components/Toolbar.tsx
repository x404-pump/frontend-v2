import { GradientBorder } from "@/components/GradientBorder";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Toolbar() {
    return (
        <div className="flex flex-row items-center gap-4 w-full">
            <ThemeSwitch />
            <GradientBorder className="bg-gradient-to-r from-white to-transparent p-[1.5px] rounded-full">
                <Button
                    as={Link}
                    color="primary"
                    radius="full"
                    href="/dashboard/create-collection"

                >
                    Create Collection
                </Button>
            </GradientBorder>

        </div>
    )
}