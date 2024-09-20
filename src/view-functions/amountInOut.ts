import { X404_ADDRESS } from "@/config/contants";
import { aptosClient } from "@/utils/aptosClient";

export type GetAmountOutArgs = {
  collectionAddress: string;
  swapToApt: boolean;
  amountIn: number;
};

export type GetAmountOutResponse = {
    amountIn: number;
    amountOut: number;
}

export const getAmountInOut = async (args: GetAmountOutArgs): Promise<GetAmountOutResponse> => {
    const { collectionAddress, swapToApt, amountIn } = args;

    if (amountIn <= 0) {
        return {
            amountIn: amountIn,
            amountOut: 0,
        };
    }

    const amountOut = await aptosClient().view<[number, number, BigInt, BigInt]>({
        payload: {
            function: `${X404_ADDRESS}::bonding_curve_launchpad::preview_amount_out`,
            functionArguments: [collectionAddress, swapToApt, Math.floor(amountIn)],
        },
    });

    if (swapToApt) {
        return {
            amountIn: amountOut[0],
            amountOut: amountOut[1],
        }

    }

    return {
        amountIn: amountOut[1],
        amountOut: amountOut[0],
    }
};
