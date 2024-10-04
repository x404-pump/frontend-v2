import { toast } from "react-toastify";
import React from "react";
import { truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

import { useAccount } from "@/hooks/useAccount";
import { getAccountAPTBalance } from "@/view-functions/accountBalance";
import { Copy02Icon, Logout04Icon, Wallet01Icon } from "hugeicons-react";
import numeral from "numeral";
import ConnectWalletDialog from "@/components/wallet/ConnectWalletDialog";

export default function WalletCard() {
    const { account, isLoading } = useAccount();
    const { wallet, disconnect } = useWallet();
    const [balance, setBalance] = React.useState<number | null>(null);
    const [isOpen, setIsOpen] = React.useState(false);

    const fetchBalance = React.useCallback(async () => {
        if (!account) return;
        const balance = await getAccountAPTBalance({
            accountAddress: account.address,
        });

        setBalance(balance);
    }, [account]);

    React.useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    if (isLoading) return (
        <Skeleton className="w-8 h-8 rounded-full" />
    )
    if (!account && !isLoading) return <ConnectWalletDialog />;

    return (
        <Dropdown isOpen={isOpen} onOpenChange={setIsOpen}>
            <DropdownTrigger
                onMouseEnter={() => setIsOpen(true)}
            >
                <Avatar
                    src={wallet?.icon}
                    radius="full"
                    color="primary"
                />
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem className="data-[hover=true]:bg-transparent"
                    startContent={
                        <Wallet01Icon className="w-8 h-8 text-primary-foreground bg-primary rounded-full p-1.5" />
                    }

                    endContent={
                        <Copy02Icon
                            className="w-6 h-6 text-foreground-500"
                            onClick={() => {
                                try {
                                    copy(account?.address || "");
                                    toast.success("Address copied to clipboard");
                                } catch (error) {
                                    toast.error("Failed to copy address");
                                }
                            }}
                        />
                    }
                >
                    <div className="w-full flex flex-col justify-start">
                        <p className="text-base text-foreground-900 font-semibold">{truncateAddress(account?.address)}</p>
                        <p className="text-xs text-secondary font-medium">{numeral(balance).format("0,0.00")} APT</p>
                    </div>
                </DropdownItem>
                <DropdownItem
                    className="text-foreground-500"
                    endContent={
                        <Logout04Icon
                            className="w-4 h-4 text-foreground-500"
                        />
                    }
                    onClick={() => disconnect()}
                >
                    Disconnect
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
