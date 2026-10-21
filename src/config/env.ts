import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredEnv = ['TELEGRAM_BOT_TOKEN', 'PANDASCORE_API_KEY', 'MONGODB_URI', 'MONGODB_DB'];
requiredEnv.forEach((key) => {
    if (!process.env[key]) {
        console.error(`❌ Variável de ambiente faltando: ${key}`);
        process.exit(1);
    }
});

export const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
export const PANDASCORE_API_KEY = process.env.PANDASCORE_API_KEY!;
export const MONGODB_URI = process.env.MONGODB_URI!;
export const MONGODB_DB = process.env.MONGODB_DB!;



