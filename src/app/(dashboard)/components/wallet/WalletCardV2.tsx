import { toast } from "react-toastify";
import React from "react";
import { truncateAddress, APTOS_CONNECT_ACCOUNT_URL, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Skeleton } from "@nextui-org/skeleton";
import copy from "copy-to-clipboard";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";

import { useAccount } from "@/hooks/useAccount";
import { ConnectWalletDialog } from "@/components/WalletSelector";
import { getAccountAPTBalance } from "@/view-functions/accountBalance";
import { Copy02Icon, Logout04Icon, Wallet01Icon } from "hugeicons-react";
import { Button } from "@nextui-org/button";

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
        <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row gap-2 items-center">
                <Avatar
                    src={wallet?.icon}
                    size="sm"
                    radius="full"
                    color="primary"
                />
                <div className="flex flex-col items-start gap-1">
                    <p className="text-base font-semibold text-foreground-900">{truncateAddress(account?.address)}</p>
                    <p className="text-xs text-foreground-500">{balance} APT</p>
                </div>
            </div>

            <div>
                <Button
                    className="data-[hover=true]:bg-transparent"
                    size="sm"
                    isIconOnly
                    radius="full"
                >
                    <Copy02Icon
                        className="text-foreground-500 "
                        size={16}
                        filter="drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.10)) drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.10))"
                    />
                </Button>
            </div>
        </div>
    )
}
