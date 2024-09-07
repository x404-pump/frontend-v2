import { aptosClient } from "@/utils/aptosClient";
import { createCollection } from "@/entry-functions/create_collection";
import { uploadCollectionData } from "@/utils/assetUploader";
import { getCreateCoinPayload } from "@/utils/api";
import { AccountAddress, createResourceAddress, MoveVector } from "@aptos-labs/ts-sdk";

export async function onCreateCollection(
    account: any,
    files: FileList | null,
    coinAddress: string | null,
    aptosWallet: any,
    signAndSubmitTransaction: any,
    setIsUploading: (isUploading: boolean) => void
) {
    try {
        if (!account) throw new Error("Please connect your wallet");
        if (!files) throw new Error("Please upload files");
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

    } catch (error: any) {
        throw new Error(error);
    } finally {
        setIsUploading(false);
    }
}