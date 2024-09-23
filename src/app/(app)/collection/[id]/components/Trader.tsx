'use client';

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Exchange01Icon } from "hugeicons-react";
import { APTCoinIcon } from "@/components/icons";
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { toast } from "react-toastify";

import { useCollection } from "../context/collection";
import { X404_ADDRESS } from "@/config/contants";
import { aptosClient } from "@/utils/aptosClient";
import { Avatar } from "@nextui-org/avatar";
import { getAmountInOut } from "@/view-functions/amountInOut";

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
    const [output, setOutput] = React.useState<number>(0);
    const [swapDirection, setSwapDirection] = React.useState<'APT_TO_FA' | 'FA_TO_APT'>('APT_TO_FA');
    const { account, signAndSubmitTransaction, connected } = useWallet();
    const collection = useCollection();

    const handleSwap = async () => {
        try {
            if (!connected) throw new Error('Wallet not connected');

            const tx = await signAndSubmitTransaction({
                data: {
                    function: `${X404_ADDRESS}::bonding_curve_launchpad::swap`,
                    functionArguments: [
                        collection.collection_address,
                        swapDirection === 'FA_TO_APT',
                        amount * 10 ** 8,
                    ]
                }
            });

            await aptosClient().waitForTransaction({
                transactionHash: tx.hash,
            });
            
            toast.success('Swap successful');
        } catch (error: any) {
            if (error.message === 'Wallet not connected') {
                toast.info('Please connect your wallet');

                return;
            }
            toast.error(error.message);
        }
    }

    const handleSwapDirection = () => {
        setSwapDirection(prevDirection => {
            const newDirection = prevDirection === 'APT_TO_FA' ? 'FA_TO_APT' : 'APT_TO_FA';

            setAmount(output);
            setOutput(amount);

            return newDirection;
        });
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!collection.collection_address) return 0;
        const inputAmount = Number(e.target.value);

        setAmount(inputAmount);
        const res = await getAmountInOut({
            collectionAddress: collection.collection_address,
            swapToApt: swapDirection === 'FA_TO_APT',
            amountIn: inputAmount * 10 ** 8,
        });

        setOutput(res.amountOut / 10 ** 8);
        setAmount(res.amountIn / 10 ** 8);
    }

    return (
        <div
            className="flex flex-col p-4 gap-4 items-center justify-center rounded-[48px] bg-foreground-50 min-w-fit w-full h-fit"
        >
            <div className="flex items-center flex-col w-full h-fit p-4 rounded-[32px] bg-foreground-50 shadow">
                <Input
                    id="from"
                    placeholder="0.00"
                    type="number"
                    label="From"
                    labelPlacement="outside"
                    className="w-full"
                    classNames={{
                        input: "text-2xl font-semibold w-full",
                        inputWrapper: "bg-transparent data-[hover=true]:bg-transparent w-full"
                    }}
                    onChange={handleInputChange}
                    value={amount.toString()}
                    endContent={
                        swapDirection === 'APT_TO_FA' ?
                            <APTCoinIcon className="w-6 h-6" />
                            :
                            <Avatar src={collection.collection_image} className="w-6 h-6" />
                    }
                />
                <Button isIconOnly radius="full" onClick={handleSwapDirection}>
                    <Exchange01Icon className="w-6 h-6" />
                </Button>
                <Input
                    id="to"
                    disabled
                    isReadOnly
                    placeholder="0.00"
                    type="number"
                    label="To"
                    labelPlacement="outside"
                    className="w-full"
                    classNames={{
                        input: "text-2xl font-semibold w-full",
                        inputWrapper: "bg-transparent data-[hover=true]:bg-transparent w-full"
                    }}
                    value={output.toString()}
                    endContent={
                        swapDirection === 'APT_TO_FA' ?
                            <Avatar src={collection.collection_image} className="w-6 h-6" />
                            :
                            <APTCoinIcon className="w-6 h-6" />
                    }
                />
            </div>
            {/* {swapDirection === 'APT_TO_FA' ? (
                    <ButtonOperator
                        title="Buy"
                        children={
                            <Button isIconOnly radius="full" onClick={handleSwap}>
                                <Dollar01Icon className="w-6 h-6" />
                            </Button>
                        }
                    />
                ) : (
                    <ButtonOperator
                        title="Sell"
                        children={
                            <Button isIconOnly radius="full" onClick={handleSwap}>
                                <Exchange01Icon className="w-6 h-6" />
                            </Button>
                        }
                    />
                )} */}
            <Button
                onClick={handleSwap}
                fullWidth
                radius="full"
                disabled={!connected}
            >
                {swapDirection === 'APT_TO_FA' ? 'Buy' : 'Sell'}
            </Button>
        </div>
    )
}