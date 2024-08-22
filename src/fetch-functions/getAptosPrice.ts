export async function getAptosPrice(vsCurrency: string) {
    try {
        const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=aptos&vs_currencies=${vsCurrency}`);
        const data = await res.json();

        return data.aptos[vsCurrency];
    } catch (error) {
        throw new Error("Failed to fetch Aptos price");
    }
}
