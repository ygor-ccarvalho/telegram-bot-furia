// src/bot/callbackHandlers.ts
import TelegramBot from 'node-telegram-bot-api';


export function handleCallbackQuery(bot: TelegramBot) {
    bot.on('callback_query', async (callbackQuery) => {
        const chatId = callbackQuery.message?.chat.id;
        const data = callbackQuery.data;

        if (!chatId || !data) return;

        await bot.answerCallbackQuery(callbackQuery.id);

    });
}
