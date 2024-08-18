'use client';

import React from "react";
import clsx from "clsx";
import CollectionDetailArea from "./CollectionDetailArea";
import UploadFileInput from "./UploadFileInput";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { AutoCreateCoin } from "./AutoCreateCoin";
import { aptosClient } from "@/utils/aptosClient";
import { createCollection } from "@/entry-functions/create_collection";
import { uploadCollectionData } from "@/utils/assetUploader";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getCreateCoinPayload } from "@/utils/api";
import { AccountAddress, createResourceAddress, MoveVector } from "@aptos-labs/ts-sdk";
import { toast } from "react-toastify";

export default function CreateCollectionForm() {
    const aptosWallet = useWallet();
    const { account, wallet, signAndSubmitTransaction } = useWallet();
    const [isUploading, setIsUploading] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [coinAddress, setCoinAdress] = React.useState<string | null>(null);

    const onCreateCollection = async () => {
        try {
            if (!account) throw new Error("Please connect your wallet");
            if (!files) throw new Error("Please upload files");
            if (isUploading) throw new Error("Uploading in progress");
            if (!coinAddress) throw new Error("Please enter coin address");

            setIsUploading(true);

            const { collectionName, collectionDescription, projectUri, tokenNames } = await uploadCollectionData(
                aptosWallet,
                files,
            );

            const bytesPromise = getCreateCoinPayload(
                account.address, coinAddress
            )

            const bytes = await bytesPromise;
            const coinAddressU8 = new Uint8Array(Buffer.from(coinAddress, 'utf-8'));
            const totalByteCode = bytes.metadataBytes.map((bytecode: any) => MoveVector.U8(bytecode));
            const resource_address = createResourceAddress(
                AccountAddress.fromString(account.address),
                coinAddress
            );

            const createCoinResponse = await signAndSubmitTransaction({
                data: {
                    function: '0x1::resource_account::create_resource_account_and_publish_package',
                    functionArguments: [
                        MoveVector.U8(coinAddressU8) as any,
                        MoveVector.U8(bytes.metadataBytes),
                        new MoveVector(totalByteCode),
                    ],
                }
            })

            await aptosClient().waitForTransaction({
                transactionHash: createCoinResponse.hash,
            });

            const coinModuleAddress = resource_address + "::coin::" + coinAddress;

            while (tokenNames.length < 100) {
                tokenNames.push('WORTHLESS-NFT-' + tokenNames.length);
            }

            const createCollectionInputTransaction = createCollection({
                collectionDescription,
                collectionName,
                projectUri,
                tokenDescription: collectionDescription,
                tokenNames,
                coinModuleAddress,
            });
            const response = await signAndSubmitTransaction(
                createCollectionInputTransaction
            );
            
            await aptosClient().waitForTransaction({
                transactionHash: response.hash,
            });

        } catch (error) {
            toast.error('Failed to create collection', {
                type: 'error',
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <section className="mt-8 w-full overflow-visible relative" id="create-collection-form">
            <form className="relative w-full flex flex-col gap-8 items-start justify-start">
                <div className="w-fit flex flex-row items-center gap-8 z-10">
                    <UploadFileInput 
                        files={files} 
                        setFiles={setFiles} 
                        isUploading={isUploading} 
                        account={'account'}
                    />
                    <CollectionDetailArea />
                </div>
                <div className="flex flex-row gap-8 items-center w-full">
                    <Input
                        label="Coin Address"
                        className="w-[30vw]"
                        description="You can type your coin address or create auto"
                        fullWidth
                        radius="full"
                        placeholder="Enter collection name"
                        labelPlacement="outside"
                    />
                    <AutoCreateCoin />
                </div>
                <Button
                    type="submit"
                    color="success"
                    radius="full"
                    size="md"
                >
                    Create
                </Button>
            </form>
            <div className={clsx(
                "w-[30vw] aspect-square rounded-full bg-secondary/25 blur-[128px]",
                "absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none",
            )} />
        </section>
    );
}