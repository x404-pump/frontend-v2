"use client";

import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { uploadCollectionData } from "@/utils/assetUploader";
import { createCollection } from "@/entry-functions/create_collection";
import { aptosClient } from "@/utils/aptosClient";

const UploadFileInput = dynamic(() => import('./UploadFileInput'));

interface CreateCollectionFormProps extends React.HTMLAttributes<HTMLFormElement> { }

type FormData = {
    amountAptIn: number;
    initPrice: number;
};

export default function CreateCollectionForm({ ...props }: CreateCollectionFormProps) {
    const aptosWallet = useWallet();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isLoading },
    } = useForm<FormData>();

    const { account, wallet, signAndSubmitTransaction, connected } = useWallet();
    const [isUploading, setIsUploading] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);

    const onSubmit = async (data: FormData) => {
        try {
            if (!connected) throw new Error("Please connect your wallet");
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
                amountAptIn: data.amountAptIn,
                initPrice: data.initPrice,
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

            toast.success('Collection created successfully', {
                type: 'success',
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
            <form className="relative w-full flex flex-col gap-8 items-start justify-between lg:justify-start" onSubmit={handleSubmit(onSubmit)}>
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
                        size="lg"
                        variant="bordered"
                        radius="sm"
                        placeholder="0"
                        labelPlacement="outside"
                        {...register('amountAptIn', { required: false })}
                    />
                    <Input
                        label="Initial price for each Token"
                        description="Initial price for each Token, 1 APT for default"
                        fullWidth
                        type="number"
                        size="lg"
                        variant="bordered"
                        radius="sm"
                        placeholder="1"
                        min={1}
                        labelPlacement="outside"
                        isRequired
                        {...register('initPrice', { required: false })}
                    />
                </div>
                <Button
                    type="submit"
                    className="bg-foreground-900 text-foreground-100"
                    radius="sm"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting || isUploading}
                    disabled={isSubmitting || isUploading}
                >
                    Create
                </Button>
            </form>
        </section>
    );
}