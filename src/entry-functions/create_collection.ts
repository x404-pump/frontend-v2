import { MoveString, MoveVector, U64 } from "@aptos-labs/ts-sdk";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";

import { appConfig } from "@/config";

export type CreateCollectionArguments = {
  collectionDescription: string; // The collection description
  collectionName: string; // The collection name
  collectionUri: string;
  fa_symbol: string;
  fa_icon: string;
  supply: number;
  tokenDescription: Array<string>
  tokenNames: Array<string>;
  tokenUris: Array<string>;
  amountAptIn: bigint; 
};

export const createCollection = (args: CreateCollectionArguments): InputTransactionData => {
  const {
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
  } = args;

  return {
    data: {
      function: `${appConfig.constants.X404_ADDRESS}::bonding_curve_launchpad::create_fa_pair`,
      functionArguments: [
        new U64(amountAptIn),
        new MoveString(collectionDescription),
        new U64(supply),
        new MoveString(collectionName),
        new MoveString(collectionUri),
        new MoveString(fa_symbol),
        new MoveString(fa_icon),
        new MoveVector(tokenDescription.map((tokenDescription) => new MoveString(tokenDescription))),
        new MoveVector(tokenNames.map((tokenName) => new MoveString(tokenName))),
        new MoveVector(tokenUris.map((tokenUri) => new MoveString(tokenUri)))
      ] as any,
    },
  };
};
