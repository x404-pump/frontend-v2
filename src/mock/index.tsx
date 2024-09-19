import { IX404Collection, IX404TokenActivity, IX404TokenData } from "@/fetch-functions";
import { faker } from "@faker-js/faker";

export const generateMockCollection = () => {
    return {
        collection_address: faker.finance.ethereumAddress(),
        collection_name: faker.lorem.words(),
        collection_description: faker.lorem.sentence(),
        collection_uri: faker.internet.url(),
        collection_image: faker.image.url(),
        collection_creator: faker.finance.ethereumAddress(),
        initial_price: faker.finance.amount(),
        current_price: faker.finance.amount(),
        supply: faker.number.int(),
    } satisfies IX404Collection;
}
export const mockCollection: IX404Collection = generateMockCollection();

export const mockCollections: IX404Collection[] = Array.from({ length: 10 }, () => generateMockCollection());

const generateMockNft = () => {
    return {
        token_name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        token_data_id: faker.finance.ethereumAddress(),
        token_uri: faker.image.url(),
        // token_properties: (path: string) => {
        //     const mockData: any = {
        //         "type": faker.lorem.word(),
        //         "size": faker.number.float(),
        //         "color": faker.number.hex(),
        //     };

        //     // Return the entire mock data or a specific property based on the path
        //     return path ? mockData[path] : mockData;
        // },
        price: faker.finance.amount(),
    };
}

export const mockNft: IX404TokenData = generateMockNft();

export const mockNfts: IX404TokenData[] = Array.from({ length: 10 }, () => generateMockNft());

export const generateTokenActivity = (): IX404TokenActivity[0] => {
    return {
        event_account_address: faker.finance.ethereumAddress(),
        event_index: faker.number.int(),
        property_version_v1: faker.number.int(),
        token_amount: faker.finance.amount(),
        token_data_id: faker.finance.ethereumAddress(),
        token_standard: faker.lorem.word(),
        transaction_timestamp: faker.date.recent().toISOString(),
        transaction_version: faker.number.int(),
        type: faker.lorem.word(),
        from_address: faker.finance.ethereumAddress(),
        to_address: faker.finance.ethereumAddress(),
        before_value: faker.finance.amount(),
        after_value: faker.finance.amount(),
        entry_function_id_str: faker.lorem.word(),
    };
}

export const mockTokenActivities: IX404TokenActivity = Array.from({ length: 10 }, () => generateTokenActivity());

export const generateTransaction = () => {
    return {
        from: faker.finance.ethereumAddress(),
        to: faker.finance.ethereumAddress(),
        time: faker.date.recent().toISOString(),
        tag: faker.lorem.word(),
    };
}

export const mockTransactions = Array.from({ length: 10 }, () => generateTransaction());
