'use client';

import React, { useState } from "react";
import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import { DashboardCircleAddIcon, icons, Store01Icon } from "hugeicons-react";
import { MdOutlineManageSearch } from "react-icons/md";
import { MdOutlineCopyAll } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { APTOS_CONNECT_ACCOUNT_URL, truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { Image } from "@nextui-org/image";
import { Skeleton } from "@nextui-org/skeleton";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { AiOutlineDisconnect } from "react-icons/ai";
import { HiOutlineWallet } from "react-icons/hi2";

import { GradientBorder } from "@/components/GradientBorder";
import { useAccount } from "@/hooks/useAccount";
import { APTCoinIcon, SearchIcon } from "@/components/icons";
import { accountAPTBalance } from "@/view-functions/accountBalance";
import { PiShootingStarBold } from "react-icons/pi";
import { ConnectWalletDialog } from "@/components/WalletSelector";
import { Navbar, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { ThemeSwitch } from "@/components/theme-switch";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { Divider } from "@nextui-org/divider";



const items: {
    label: string;
    value: string;
    icon: React.ReactNode;
}[] = [
        {
            label: 'Dashboard',
            value: 'dashboard',
            icon: <DashboardCircleAddIcon className="text-default-foreground min-w-8 w-8" />,
        },
        {
            label: 'Marketplace',
            value: 'marketplace',
            icon: <Store01Icon className="text-default-foreground min-w-8 w-8" />,
        },
    ];
const containerVariants = {
    collapsed: {
        x: "-100%",
        transition: {
            type: "spring",
            duration: 0.5,
            damping: 15,
        },
    },
    expanded: {
        x: 0,
        transition: {
            type: "spring",
            duration: 0.5,
            damping: 15,
        },
    },
};

const WalletCard = () => {
    const { account, isLoading } = useAccount();
    const { wallet, disconnect } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);

    const fetchBalance = React.useCallback(async () => {
        if (!account) return;
        const balance = await accountAPTBalance({
            accountAddress: account.address,
        });
        setBalance(balance);
    }, [account]);

    React.useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    if (isLoading) return (
        <Skeleton className="w-full h-16 rounded-2xl" />
    )
    if (!account && !isLoading) return <ConnectWalletDialog />;

    return (
        <GradientBorder
            className="bg-gradient-to-tr from-foreground-800 to-[rgba(0,0,0,0.25) rounded-2xl w-full"
            borderWidth={1}
        >
            <Accordion
                title={'Address'}
                fullWidth
                className="rounded-2xl w-full bg-foreground-100 h-fit"
            >
                <AccordionItem
                    startContent={
                        <Image
                            src={wallet?.icon}
                            alt={wallet?.name}
                            isLoading={isLoading}
                            className="min-w-8 w-8 aspect-square rounded-full"
                        />
                    }
                    title={
                        <p className='font-medium text-default-500 text-sm'>Address</p>
                    }
                    className="w-full"
                    subtitle={
                        (
                            <div>
                                <p className="w-full text-default-foreground text-base text-semibold flex flex-row gap-2 items-center justify-between">
                                    {truncateAddress(account?.address)}
                                </p>
                            </div>
                        )
                    }
                >
                    <Listbox>
                        <ListboxItem
                            key={'manage'}
                            description={'Balance of your Aptos Connect account'}
                            startContent={<HiOutlineWallet size={16} />}
                            classNames={{
                                title: "text-default-foreground flex flex-row gap-2 items-center"
                            }}
                        >
                            {balance}
                            <APTCoinIcon size={16} />
                        </ListboxItem>
                        <ListboxItem
                            key={'copy'}
                            description={'Copy your address to the clipboard'}
                            startContent={<MdOutlineCopyAll size={16} />}
                            className="text-default-foreground"
                            onClick={() => {
                                if (!account?.address) return;
                                try {
                                    copy(account?.address);
                                    toast("Address copied to clipboard", { type: "success" });
                                } catch (error) {
                                    toast("Failed to copy address to clipboard", { type: "error" });
                                }
                            }}
                        >
                            Copy Address
                        </ListboxItem>
                        <ListboxItem
                            key={'manage'}
                            description={'Manage your Aptos Connect account'}
                            startContent={<MdOutlineManageSearch size={16} />}
                            className="text-default-foreground"
                            onClick={() => window.open(APTOS_CONNECT_ACCOUNT_URL, "_blank")}
                        >
                            Manage Account
                        </ListboxItem>
                        <ListboxItem
                            key={'disconnect'}
                            startContent={<AiOutlineDisconnect size={16} />}
                            className="text-danger-500"
                            onClick={disconnect}
                            color="danger"
                        >
                            Disconnect
                        </ListboxItem>
                    </Listbox>
                </AccordionItem>
            </Accordion>
        </GradientBorder>
    )
}
export function SideBarContent() {
}

export function SideBarItem({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full overflow-clip flex justify-start items-center">
            {children}
        </div>
    ); {
    }
}
interface SideBarItemGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    children: React.ReactNode;
}
export function SideBardItemGroup({ name, children, ...props }: SideBarItemGroupProps) {
    return (
        <nav
            className="w-full flex flex-col gap-2"
            {...props}
        >
            {name && <h6 className="text-default-500 text-sm font-medium">{name}</h6>}
            <div className="w-full flex flex-col justify-start gap-2">
                {children}
            </div>
        </nav>
    )
}
interface CommonMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isExpanded?: boolean;
    setIsExpanded?: (isExpanded: boolean) => void;
}

export function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            radius="full"
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={
                <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
            }
            type="search"
        />
    );

    return (
        <Navbar
            // className="sm:hidden"
            maxWidth="full"
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent
                className="sm:hidden"
            >
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>

            <NavbarContent
                className="flex basis-1/5 sm:basis-full"
                justify="start"
            >
                {searchInput}
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="sm:flex gap-2">
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu
                className="max-w-64 rounded-tr-2xl"
                motionProps={{
                    variants: containerVariants,
                    initial: "collapsed",
                    animate: isMenuOpen ? "expanded" : "collapsed",
                }}
            >a
                <NavbarMenuItem
                    className="py-8"
                    key={'wallet'}
                >
                    <WalletCard />
                </NavbarMenuItem>
                <NavbarMenuItem
                    key={'divider'}
                >
                    <Divider orientation="horizontal" />
                </NavbarMenuItem>
                <NavbarMenuItem key={'menu'}>
                    <SideBardItemGroup
                        className="flex flex-col gap-4 items-center justify-start w-full"
                        aria-label="Listbox menu with descriptions"
                    >

                        {
                            items.map((item) => (
                                <SideBarItem key={item.value}>
                                    <Button
                                        as={Link}
                                        variant="light"
                                        fullWidth
                                        startContent={item.icon}
                                        className={clsx(
                                            "font-medium w-full justify-start",
                                            "hover:border hover:border-default/50",
                                        )}
                                        href={item.value}
                                    >
                                        {item.label}
                                    </Button>
                                </SideBarItem>
                            ))
                        }
                    </SideBardItemGroup>
                </NavbarMenuItem>

                <NavbarMenuItem key={'create-collection'}>
                    <SideBardItemGroup name={'Tools'}>
                        <GradientBorder
                            borderWidth={1}
                            className="bg-gradient-to-tr from-[#F3E7FF] via-[#C081FF] to-secondary rounded-medium font-semibold"
                        >
                            <Button
                                color="secondary"
                                radius="md"
                                fullWidth
                                variant="solid"
                                endContent={<PiShootingStarBold size={16} />}
                            >
                                Create collection
                            </Button>
                        </GradientBorder>
                    </SideBardItemGroup>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}
export function SideBar() {
    const containerControl = useAnimationControls();

    return (
        <motion.nav
            variants={containerVariants}
            initial={"expanded"}
            animate={containerControl}
            className={clsx(
                "p-4 text-white h-screen flex flex-col gap-16 items-start w-fit",
                "z-50 rounded-tr-2xl",
                "hidden sm:flex",
            )}
        >
            <SideBarItem>
                <WalletCard />
            </SideBarItem>

            <SideBardItemGroup
                className="flex flex-col gap-4 items-center justify-start w-full"
                aria-label="Listbox menu with descriptions"
            >

                {
                    items.map((item) => (
                        <SideBarItem key={item.value}>
                            <Button
                                as={Link}
                                variant="light"
                                startContent={item.icon}
                                className={clsx(
                                    "font-medium w-full",
                                    "justify-start",
                                    "hover:border hover:border-default/50",
                                )}
                                href={item.value}
                            >
                                {item.label}
                            </Button>
                        </SideBarItem>
                    ))
                }
            </SideBardItemGroup>

            <SideBardItemGroup name={'Tools'}>
                <GradientBorder
                    borderWidth={1}
                    className="bg-gradient-to-tr from-[#F3E7FF] via-[#C081FF] to-secondary rounded-medium font-semibold"
                >
                    <Button
                        color="secondary"
                        radius="md"
                        fullWidth
                        variant="solid"
                        endContent={<PiShootingStarBold size={16} />}
                    >
                        Create collection
                    </Button>
                </GradientBorder>
            </SideBardItemGroup>
        </motion.nav>
    );
}