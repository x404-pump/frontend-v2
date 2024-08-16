import { accountAPTBalance } from "@/view-functions/accountBalance";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQuery } from "@tanstack/react-query";


export function useAccount() {
    const { account } = useWallet();

    const { data: balance, isLoading, error } = useQuery({
        queryKey: ["accountAPTBalance", account?.address],
        queryFn: async () => {
            try {
                return await accountAPTBalance({
                    accountAddress: account?.address!
                });
            } catch (error) {
                throw new Error("Failed to get account balance");
            }
        },
        enabled: !!account,
    })

    return {
        account: account ? { address: account.address, balance: balance ?? 0 } : null,
        isLoading,
        error,
    };
}