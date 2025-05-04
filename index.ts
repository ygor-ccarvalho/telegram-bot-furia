import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from './src/config/env';
import { handleStartCommand } from './src/bot/commands/start';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// comandos digitados
handleStartCommand(bot);


console.log('🤖 Bot iniciado com sucesso!');

process.on('unhandledRejection', (error) => {
    console.error('Erro não tratado:', error);
});
