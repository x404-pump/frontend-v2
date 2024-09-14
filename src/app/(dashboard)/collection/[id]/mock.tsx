import {faker}  from "@faker-js/faker"
import { IX404Collection } from "@/fetch-functions";

export const mockCollection: IX404Collection = {
    collection_address: faker.finance.ethereumAddress(),
    collection_name: faker.lorem.words(),
    collection_description: faker.lorem.sentence(),
    collection_uri: faker.internet.url(),
    collection_creator: faker.finance.ethereumAddress(),
    initial_price: faker.finance.amount(),
    current_price: faker.finance.amount(),
    supply: faker.number.int(),
};