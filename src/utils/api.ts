import { appConfig } from "@/config";
import axios from "axios";

export async function getCreateCoinPayload(address: string, coinName: string) {
  // api
  const URL = `${appConfig.constants.API_URL}/api/v1/getPublishTx?address=${address}&coinName=${coinName}`;
  const res = await axios.get(URL);

  return res.data;
}