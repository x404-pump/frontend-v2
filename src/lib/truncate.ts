export const truncate = (string: string, length: number) => {
    return string.length > length ? `${string.substring(0, length)}...` : string;
};

export function truncateAddress(address: string) {
    return `${address?.slice(0, 4)}...${address?.slice(-4)}`;
  }
  