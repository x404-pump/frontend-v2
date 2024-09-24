'use client';

import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { uploadCollectionData } from "@/utils/assetUploader";
import { createCollection } from "@/entry-functions/create_collection";
import { aptosClient } from "@/utils/aptosClient";

const UploadFileInput = dynamic(() => import('./UploadFileInput'));
const CollectionDetailArea = dynamic(() => import('./CollectionDetailArea'));

interface CreateCollectionFormProps extends React.HTMLAttributes<HTMLFormElement> { }
export default function CreateCollectionForm({ ...props }: CreateCollectionFormProps) {
    const aptosWallet = useWallet();

    const { account, wallet, signAndSubmitTransaction } = useWallet();
    const [isUploading, setIsUploading] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [amountAptIn, setAmountAptIn] = React.useState<number>(0);
    const [initPrice, setInitPrice] = React.useState<number>(1);

    const handleChangeAmountAptIn = (e: any) => {
        e.preventDefault();
        setAmountAptIn(Number(e.target.value));
    }
    const handleChangeInitPrice = (e: any) => {
        e.preventDefault();
        setInitPrice(Number(e.target.value
        ));
    }

    const onCreateCollection = async (e: any) => {
        e.preventDefault();
        try {
            if (!account) throw new Error("Please connect your wallet");
            if (!files) throw new Error("Please upload files");
            if (isUploading) throw new Error("Uploading in progress");

            setIsUploading(true);


            const { collectionName, collectionDescription, collectionUri, tokenNames, tokenDescription, tokenUris, fa_symbol, fa_icon, supply } = await uploadCollectionData(
                aptosWallet,
                files,
            );

            const createCollectionInputTransaction = createCollection({
                collectionDescription,
                collectionName,
                collectionUri,
                fa_symbol,
                fa_icon,
                supply,
                tokenDescription,
                tokenNames,
                tokenUris,
                amountAptIn,
                initPrice,
            });
            const response = await signAndSubmitTransaction(
                {
                    data: createCollectionInputTransaction,
                    options: {
                        maxGasAmount: 2000000,
                    }
                }
            );

            await aptosClient().waitForTransaction({
                transactionHash: response.hash,
            });

        } catch (error) {
            console.error(error);
            toast.error('Failed to create collection', {
                type: 'error',
            });
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section className="w-full overflow-visible relative flex flex-row justify-between items-start" id="create-collection-form">
            <form className="relative w-full flex flex-col gap-8 items-start justify-start">
                <UploadFileInput
                    files={files}
                    setFiles={setFiles}
                    isUploading={isUploading}
                    account={'account'}
                />
                <div className="flex flex-col gap-4 items-center w-full">
                    <Input
                        label="Amount Apt"
                        description="Quantity of APT that you will purchase within the same transaction when creating a collection"
                        fullWidth
                        radius="full"
                        placeholder="0"
                        labelPlacement="outside"
                        onChange={handleChangeAmountAptIn}
                    />
                    <Input
                        label="Initial price for each Token"
                        description="Initial price for each Token, 1 APT for default"
                        fullWidth
                        type="number"
                        radius="full"
                        placeholder="1"
                        min={1}
                        labelPlacement="outside"
                        isRequired
                        onChange={handleChangeInitPrice}
                    />
                </div>
                <CollectionDetailArea className="flex lg:hidden" />
                <Button
                    type="submit"
                    color="primary"
                    radius="full"
                    size="lg"
                    fullWidth
                    onClick={onCreateCollection}
                >
                    Create
                </Button>
            </form>
        </section>
    );
}