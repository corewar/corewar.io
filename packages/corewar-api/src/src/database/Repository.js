"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("@/constants");
const mongodb_1 = require("mongodb");
class Repository {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    async getClient() {
        const client = new mongodb_1.MongoClient(constants_1.MONGO_URL);
        await client.connect();
        return client;
    }
    async getAll() {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            return (await collection.find().toArray());
        }
        finally {
            client.close();
        }
    }
    async getById(id) {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            return (await collection.findOne({ id }));
        }
        finally {
            client.close();
        }
    }
    /* eslint-disable-next-line */
    async getOneBy(filter) {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            return (await collection.findOne(filter));
        }
        finally {
            client.close();
        }
    }
    /* eslint-disable-next-line */
    async getManyBy(filter) {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            return (await collection.find(filter).toArray());
        }
        finally {
            client.close();
        }
    }
    async upsert(data) {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            const existing = await collection.findOne({ id: data.id });
            if (!existing) {
                await collection.insertOne(data);
            }
            else {
                await collection.updateOne({ id: data.id }, { $set: data });
            }
        }
        finally {
            client.close();
        }
    }
    async delete(id) {
        const client = await this.getClient();
        try {
            const database = client.db(constants_1.DATABASE_NAME);
            const collection = database.collection(this.collectionName);
            await collection.deleteOne({ id });
        }
        finally {
            client.close();
        }
    }
}
exports.default = Repository;
