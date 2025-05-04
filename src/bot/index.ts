// src/bot/index.ts
import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from '../config/env';
import { handleStartCommand } from './commands/start';
import { handleCallbackQuery } from './callbackHandlers';
import { handleUnknownCommand } from './commands/comandoDesconhecido';
import { handleProximosJogos } from './commands/proximosJogos';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// comandos digitados
handleStartCommand(bot);
handleUnknownCommand(bot);
handleProximosJogos(bot);

// botões (callback_query)
handleCallbackQuery(bot);

console.log('🤖 Bot iniciado com sucesso!');

process.on('unhandledRejection', (error) => {
    console.error('Erro não tratado:', error);
});
