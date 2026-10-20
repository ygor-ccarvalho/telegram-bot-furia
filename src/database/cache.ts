import { getDb } from './mongo';

interface CacheDoc<T> {
    _id: string;
    data: T;
    expiresAt: Date;
}

export async function getCached<T>(
    key: string,
    ttlMs: number,
    fetcher: () => Promise<T>,
): Promise<T> {
    try {
        const doc = await getDb()
            .collection<CacheDoc<T>>('cache')
            .findOne({ _id: key, expiresAt: { $gt: new Date() } });

        if (doc) {
            console.log(`cache hit: ${key}`);
            return doc.data;
        }
    } catch (err) {
        console.warn(`falha ao ler cache ${key}:`, err);
    }

    const data = await fetcher();

    try {
        await getDb()
            .collection<CacheDoc<T>>('cache')
            .updateOne(
                { _id: key },
                { $set: { data, expiresAt: new Date(Date.now() + ttlMs) } },
                { upsert: true },
            );
    } catch (err) {
        console.warn(`falha ao gravar cache ${key}:`, err);
    }

    return data;
}
