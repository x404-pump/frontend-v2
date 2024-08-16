import { MoveString, MoveVector } from "@aptos-labs/ts-sdk";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

import { appConfig } from "@/config";

export type CreateCollectionArguments = {
  collectionDescription: string; // The collection description
  collectionName: string; // The collection name
  projectUri: string;
  tokenDescription: string,
  tokenNames: Array<string>;
  coinModuleAddress: string;
};

export const createCollection = (args: CreateCollectionArguments): InputTransactionData => {
  const {
    collectionDescription,
    collectionName,
    projectUri,
    tokenDescription,
    tokenNames,
    coinModuleAddress
  } = args;

  return {
    data: {
      function: `${appConfig.constants.X404LIQUIDNFT_MODULE_ADDRESS}::core::create_collection`,
      typeArguments: [coinModuleAddress],
      functionArguments: [
        new MoveString(collectionDescription),
        new MoveString(collectionName),
        new MoveString(projectUri),
        new MoveString(tokenDescription),
        new MoveVector(tokenNames.map((tokenName) => new MoveString(tokenName)))
      ] as any,
    },
  };
};
