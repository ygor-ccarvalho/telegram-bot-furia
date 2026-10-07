import { bot } from './bot/bot'

process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Rejeição não tratada em:', promise, 'razão:', reason);
});

bot.start({
    onStart: (info) => console.log(`Rodando como @${info.username}`),
});

