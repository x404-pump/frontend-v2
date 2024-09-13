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

export const runtime = "edge";

const DynamicCollectionDetailArea = dynamic(() => import('./CollectionDetailArea'));
const DynamicUploadFileInput = dynamic(() => import('./UploadFileInput'));

export default function CreateCollectionForm() {
    const aptosWallet = useWallet();
    const { account, wallet, signAndSubmitTransaction } = useWallet();
    const [isUploading, setIsUploading] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [amountAptIn, setAmountAptIn] = React.useState<bigint>(BigInt(0));

    const [collectionName, setCollectionName] = React.useState<string | null>(null);
    const [collectionDescription, setCollectionDescription] = React.useState<string | null>(null);
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);

    const onCreateCollection = async () => {
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
            });
            const response = await signAndSubmitTransaction(
                createCollectionInputTransaction
            );

            await aptosClient().waitForTransaction({
                transactionHash: response.hash,
            });

        } catch (error) {
            console.error(error);
            toast.error('Failed to create collection', {
                type: 'error',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section className="mt-8 w-full overflow-visible relative flex flex-row justify-between items-start" id="create-collection-form">
            <form className="relative w-full flex flex-col gap-8 items-start justify-start">
                <div className="w-fit flex flex-row items-center gap-8 z-10">
                    <DynamicUploadFileInput
                        files={files}
                        setFiles={setFiles}
                        isUploading={isUploading}
                        account={'account'}
                    />
                </div>
                <div className="flex flex-row gap-8 items-center w-full">
                    <Input
                        label="Amount Apt In (optional)"
                        className="w-[30vw]"
                        description="Amount Apt In (optional)"
                        fullWidth
                        radius="full"
                        placeholder="Amount Apt In (optional)"
                        labelPlacement="outside"    
                        onChange={(e) => {
                            e.preventDefault();
                            setAmountAptIn(BigInt(e.target.value));
                        }}
                    />
                </div>
                <Button
                    type="submit"
                    color="success"
                    radius="full"
                    size="md"
                    onClick={(e) => {
                        e.preventDefault();
                        onCreateCollection();
                    }}
                >
                    Create
                </Button>
            </form>
            <DynamicCollectionDetailArea />
        </section>
    );
}