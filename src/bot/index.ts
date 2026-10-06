// src/bot/index.ts
import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from '../config/env';
import { handleStart } from './commands/start';
import { handleCallbackQuery } from './callbackHandlers';
import { handleUnknownCommand } from './commands/comandoDesconhecido';
import { handleProximosJogos } from './commands/proximosJogos';
import { handleUltimosJogos } from './commands/ultimosJogos';
import { handleLineup } from './commands/lineup';
import { handleNoticias } from './commands/noticias';


const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

handleStart(bot);
handleUnknownCommand(bot);
handleProximosJogos(bot);
handleUltimosJogos(bot);
handleLineup(bot);
handleNoticias(bot);

handleCallbackQuery(bot);

console.log('🤖 Bot iniciado com sucesso!');

process.on('unhandledRejection', (error) => {
    console.error('Erro não tratado:', error);
});
