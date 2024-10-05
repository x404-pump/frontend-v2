import React from "react";
import { truncateAddress, useWallet } from "@aptos-labs/wallet-adapter-react";
import { Skeleton } from "@nextui-org/skeleton";
import { Avatar } from "@nextui-org/avatar";

import { useAccount } from "@/hooks/useAccount";
import { getAccountAPTBalance } from "@/view-functions/accountBalance";
import numeral from "numeral";
import ConnectWalletDialog from "@/components/wallet/ConnectWalletDialog";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

export default function WalletCardV2() {
    const { account, isLoading } = useAccount();
    const { wallet, disconnect } = useWallet();
    const [balance, setBalance] = React.useState<number | null>(null);
    const decimal = 8;

    const fetchBalance = React.useCallback(async () => {
        if (!account) return;
        const balance = await getAccountAPTBalance({
            accountAddress: account.address,
        });

        setBalance(balance / Math.pow(10, decimal));
    }, [account]);

    React.useEffect(() => {
        fetchBalance();
    }, [fetchBalance]);

    if (isLoading) return (
        <Skeleton className="w-8 h-8 rounded-full" />
    )
    if (!account && !isLoading) return <ConnectWalletDialog />;

    return (
        <div className="flex flex-row items-center justify-between gap-4 px-2">
            <div className="flex flex-row gap-2 items-center">
                <Avatar
                    src={wallet?.icon}
                    size="sm"
                    radius="full"
                    color="primary"
                />
                <div className="flex flex-col items-start gap-1">
                    <button
                        className="text-base text-foreground-900"
                        onClick={() => {
                            try {
                                if (!account) return;
                                copy(account?.address);
                                toast.success("Address copied to clipboard");
                            } catch (error) {
                                toast.error("Failed to copy address");
                            }
                        }}
                    >
                        {truncateAddress(account?.address)}
                    </button>
                    <p className="text-xs text-foreground-500">{numeral(balance).format("0,0.00")} APT</p>
                </div>
            </div>
        </div>
    )
}
