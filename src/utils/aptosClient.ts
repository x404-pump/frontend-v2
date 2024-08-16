import { appConfig } from "@/config";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";


const aptos = new Aptos(new AptosConfig({ network: appConfig.constants.NETWORK }));


export function aptosClient() {
  return aptos;
}
