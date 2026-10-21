import { bot } from './bot/bot';
import { connectMongo, closeMongo } from './database/mongo';

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Rejeição não tratada em:', promise, 'razão:', reason);
});

async function shutdown(): Promise<void> {
    await bot.stop();
    await closeMongo();
    console.log('Bot encerrado');
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);

async function main(): Promise<void> {
    try {
        await connectMongo();
    } catch (err) {
        console.warn('Mongo indisponível, seguindo sem cache', err);
    }

   await bot.start({
        onStart: (info) => console.log(`Rodando como @${info.username}`),
    });
}

main().catch((err) => {
    console.error('Falha ao iniciar:', err);
    process.exit(1);
});