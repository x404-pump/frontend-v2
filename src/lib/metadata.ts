import { ICurrentTokenDatasV2 } from "@/frontend-next/src/fetch-functions";

export async function getImage(token: Partial<ICurrentTokenDatasV2> | ICurrentTokenDatasV2): Promise<string | null> {
    if (!token.token_uri) {
        return null;
    }

    try {
        const response = await fetch(token.token_uri);
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return data.image || null;
        } else if (contentType && contentType.includes("image")) {
            return token.token_uri;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch image:", error);
        return null;
    }
}