import { toast } from "react-toastify";
import React from "react";
import { Image } from "@nextui-org/image";
import { truncateAddress, APTOS_CONNECT_ACCOUNT_URL, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { AiOutlineDisconnect } from "react-icons/ai";
import { HiOutlineWallet } from "react-icons/hi2";
import { MdOutlineCopyAll, MdOutlineManageSearch } from "react-icons/md";

import { useAccount } from "@/hooks/useAccount";
import { GradientBorder } from "@/components/GradientBorder";
import { APTCoinIcon } from "@/components/icons";
import { ConnectWalletDialog } from "@/components/WalletSelector";
import { accountAPTBalance } from "@/view-functions/accountBalance";

const WalletCard = () => {
    const { account, isLoading } = useAccount();
    const { wallet, disconnect } = useWallet();
    const [balance, setBalance] = React.useState<number | null>(null);

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
                            className="min-w-8 w-8 aspect-square rounded-full border outline-offset-2 outline outline-foreground-200"
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

export default WalletCard;