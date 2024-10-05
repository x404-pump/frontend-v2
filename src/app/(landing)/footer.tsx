import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";
import { GithubIcon, GoogleDocIcon, NewTwitterIcon, TelegramIcon } from "hugeicons-react";
import Link from "next/link";

const links = [
    {
        label: "Github",
        href: siteConfig.links.github,
        icon: <GithubIcon size={20} />,
    },
    {
        label: "Docs",
        href: siteConfig.links.docs,
        icon: <GoogleDocIcon size={20} />,
    },
    {
        label: "X",
        href: siteConfig.links.x,
        icon: <NewTwitterIcon size={20} />,
    },
    {
        label: "Telegram",
        href: siteConfig.links.telegram,
        icon: <TelegramIcon size={20} />,
    },
]

export default function Footer() {
    return (
        <footer className="w-full flex flex-col gap-2 items-center justify-center py-3">
            <div className="flex flex-row gap-2 items-center">
                <Logo size={20} className="text-primary" />
                <h1 className="text-lg font-bold">X404 PUMP</h1>
            </div>
            <p className="text-foreground-500 text-center text-xs">
                Fractionalized-NFTs-Focused
                <br />
                Launchpad
            </p>
            <div className="flex flex-row gap-4 items-center">
                {
                    links.map((link, index) => (
                        <Button
                            className="bg-foreground-100 text-foreground-900 p-2"
                            as={Link}
                            href={link.href}
                            size="sm"
                            key={index}
                            radius="full"
                            isIconOnly
                        >
                            {link.icon}
                        </Button>
                    ))
                }

            </div>
            <p className="text-default-500 text-center text-xs">
                &copy; All rights reserved.
            </p>
        </footer>
    )
}