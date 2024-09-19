import { faker } from "@faker-js/faker";
import { IX404Collection } from "@/fetch-functions";

const generateMockCollection = (): IX404Collection => ({
    collection_address: faker.finance.ethereumAddress(),
    collection_image: faker.image.url(),
    collection_name: faker.lorem.words(),
    collection_description: faker.lorem.sentence(),
    collection_uri: faker.internet.url(),
    collection_creator: faker.finance.ethereumAddress(),
    initial_price: parseFloat(faker.finance.amount()), // Ensure it's a number
    current_price: parseFloat(faker.finance.amount()), // Ensure it's a number
    supply: faker.number.int(),
});

export const mockCollections: IX404Collection[] = Array.from({ length: 10 }, generateMockCollection);