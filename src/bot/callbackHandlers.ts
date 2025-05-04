// src/bot/callbackHandlers.ts
import TelegramBot from 'node-telegram-bot-api';
import { sendProximosJogos } from './commands/proximosJogos';

export function handleCallbackQuery(bot: TelegramBot) {
    bot.on('callback_query', async (callbackQuery) => {
        const chatId = callbackQuery.message?.chat.id;
        const data = callbackQuery.data;

        if (!chatId || !data) return;

        await bot.answerCallbackQuery(callbackQuery.id);

        await bot.answerCallbackQuery(callbackQuery.id);

        let handler: (() => void) | null = null;

        switch (data) {
           
            case 'proximosjogos':
                handler = async () => {
                    const loading = await bot.sendMessage(chatId, '🔍 Buscando jogos...');
                    await sendProximosJogos(bot, chatId, loading.message_id);
                };

                break;
        }

        if (handler) {
            handler();
        }
    });
}