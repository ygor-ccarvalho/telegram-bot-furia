import { Db, MongoClient } from 'mongodb';
import { MONGODB_URI, MONGODB_DB } from '../config/env';

let mongoDb: Db | null = null;
let client: MongoClient | null = null;


export async function connectMongo(): Promise<void> {
    client = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    const db = client.db(MONGODB_DB);
    await db.collection('cache').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    mongoDb = db;
    console.log('MongoDB conectado');
}

export async function closeMongo(): Promise<void> {
    await client?.close();
    client = null;
    mongoDb = null;
}

export function getDb(): Db {
    if (!mongoDb) throw new Error('Chame connectMongo() antes de getDb()');
    return mongoDb;
}