'use client';

import React from "react";
import clsx from "clsx";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { AutoCreateCoin } from "../AutoCreateCoin";
import { aptosClient } from "@/utils/aptosClient";
import { createCollection } from "@/entry-functions/create_collection";
import { uploadCollectionData } from "@/utils/assetUploader";
import { getCreateCoinPayload } from "@/utils/api";
import { AccountAddress, createResourceAddress, MoveVector } from "@aptos-labs/ts-sdk";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const UploadFileInput = dynamic(() => import('./UploadFileInput'));

interface CreateCollectionFormProps extends React.HTMLAttributes<HTMLFormElement> {}
export default function CreateCollectionForm({ ...props }: CreateCollectionFormProps) {
    const aptosWallet = useWallet();
    const { account, wallet, signAndSubmitTransaction } = useWallet();
    const [isUploading, setIsUploading] = React.useState(false);
    const [files, setFiles] = React.useState<FileList | null>(null);
    const [coinAddress, setCoinAdress] = React.useState<string | null>(null);

    const [collectionName, setCollectionName] = React.useState<string | null>(null);
    const [collectionDescription, setCollectionDescription] = React.useState<string | null>(null);
    const [imageSrc, setImageSrc] = React.useState<string | null>(null);

    const onCreateCollection = async (e: any) => {
        e.preventDefault();
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
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form className={clsx(
            "relative h-full w-full flex flex-col gap-8 items-start",
            props.className
        )}>
            <UploadFileInput
                files={files}
                setFiles={setFiles}
                isUploading={isUploading}
                account={'account'}
            />
            <div className="flex flex-row justify-between gap-4 items-center w-full h-fit">
                <Input
                    label="Coin Address"
                    description="You can type your coin address or create auto"
                    fullWidth
                    radius="full"
                    placeholder="Enter collection name"
                    labelPlacement="outside"
                    onChange={(e) => setCoinAdress(e.target.value)}
                />
                <AutoCreateCoin />
            </div>
            <Button
                type="submit"
                color="success"
                radius="full"
                size="lg"
                fullWidth
                onClick={onCreateCollection}
            >
                Create
            </Button>
        </form>
    );
}