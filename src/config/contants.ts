import {Network} from "@aptos-labs/ts-sdk";

// ==============================
// PROJECT CONSTANTS
// ==============================
export const PROJECT_NAME = process.env.NEXT_PUBLIC_PROJECT_NAME;

// ==============================
// APTOS CONSTANTS
// ==============================
export const NETWORK: Network = process.env.NEXT_PUBLIC_APP_NETWORK as Network || Network.TESTNET;
export const X404LIQUIDNFT_MODULE_ADDRESS = process.env.NEXT_PUBLIC_X404LIQUIDNFT_MODULE_ADDRESS;
export const RESOURCE = process.env.NEXT_PUBLIC_RESOURCE;

// ==============================
// API CONSTANTS
// ==============================
export const API_URL = process.env.NEXT_PUBLIC_API_URL;