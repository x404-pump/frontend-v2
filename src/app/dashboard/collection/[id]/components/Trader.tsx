'use client';

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Dollar01Icon, Exchange01Icon } from "hugeicons-react";
import { APTCoinIcon } from "@/components/icons";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "react-toastify";

import { getTokenType } from "@/view-functions/x404liquidnft-module/core";
import { useCollection } from "../context/collection";
import { X404LIQUIDNFT_MODULE_ADDRESS } from "@/config/contants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

function ButtonOperator({
    title,
    children
}: ButtonProps) {
    return (
        <div className="flex flex-col items-center justify-center">
            {children}
            <h6 className="text-sm text-foreground-900">{title}</h6>
        </div>
    )
}
export default function Trader() {
    const [amount, setAmount] = React.useState<number>(0);
    const { account, signAndSubmitTransaction, connected } = useWallet();
    const collection = useCollection();

    const handleBuy = async () => {
        try {
            if(!connected) throw new Error('Wallet not connected');

            const coin = await getTokenType(collection.collection_id!);
            const tx = await signAndSubmitTransaction({
                data: {
                    function: `${X404LIQUIDNFT_MODULE_ADDRESS}::core::swap_exact_apt_to_token_and_claim`,
                    typeArguments: [coin],
                    functionArguments: [
                        amount * 10 * 8,
                        account?.address,
                    ]
                }
            });

            toast.success('Buy successful');

        } catch (error: any) {
            if(error.message === 'Wallet not connected') {
                toast.info('Please connect your wallet');
                return;
            }
            toast.error(error.message);
        }
    }

    const handleSell = async () => {
        try {
            if(!connected) throw new Error('Wallet not connected');
            
            const coin = await getTokenType(collection.collection_id!);
            const tx = await signAndSubmitTransaction({
                data: {
                    function: `${X404LIQUIDNFT_MODULE_ADDRESS}::core::liquify_and_swap_exact_token_to_apt`,
                    typeArguments: [coin],
                    functionArguments: [
                        amount * 10 * 8,
                        account?.address,
                    ]
                }
            });

            toast.success('Sell successful');
        } catch (error: any) {
            if(error.message === 'Wallet not connected') {
                toast.info('Please connect your wallet');
                return;
            }
            toast.error(error.message);
        }
    }

    return (
        <div
            className="flex flex-col p-4 gap-4 items-center justify-center rounded-[48px] bg-foreground-100 min-w-64 w-full h-fit"
        >
            <div className="w-full h-fit p-4 rounded-[32px] bg-foreground-50">
                <Input
                    placeholder="0.00"
                    type="number"
                    label="Amount"
                    labelPlacement="outside"
                    className="w-full"
                    classNames={{
                        input: "text-2xl font-semibold w-full",
                        inputWrapper: "bg-transparent data-[hover=true]:bg-transparent w-fit"
                    }}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    endContent={<APTCoinIcon className="w-4 h-4" />}
                />
            </div>
            <div className="flex flex-row items-center justify-center gap-4">
                <ButtonOperator
                    title="Buy"
                    children={
                        <Button isIconOnly radius="full" onClick={handleBuy}>
                            <Dollar01Icon className="w-6 h-6" />
                        </Button>
                    }
                />

                <ButtonOperator
                    title="Sell"
                    children={
                        <Button isIconOnly radius="full" onClick={handleSell}>
                            <Exchange01Icon className="w-6 h-6" />
                        </Button>
                    }
                />
            </div>
        </div>
    )
}