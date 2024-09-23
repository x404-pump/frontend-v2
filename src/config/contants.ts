import { Network } from "@aptos-labs/ts-sdk";

// ==============================
// PROJECT CONSTANTS
// ==============================
export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME;
export const USING_MOCK = process.env.NEXT_PUBLIC_USING_MOCK === 'true';
export const X404_DOCS = process.env.NEXT_PUBLIC_DOCS;

// ==============================
// APTOS CONSTANTS
// ==============================
export const NETWORK: Network = process.env.NEXT_PUBLIC_APP_NETWORK as Network || Network.TESTNET;
export const X404_ADDRESS = process.env.NEXT_PUBLIC_X404_ADDRESS;
export const RESOURCE = process.env.NEXT_PUBLIC_RESOURCE;
export const IrysGateway = process.env.NEXT_PUBLIC_IRYS_GATEWAY;

// ==============================
// API CONSTANTS
// ==============================
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
