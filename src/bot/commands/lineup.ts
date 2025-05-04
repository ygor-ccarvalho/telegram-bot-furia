import TelegramBot from 'node-telegram-bot-api';
import { getLineup } from '../services/pandscore/getLineup';

export function handleLineupCommand(bot: TelegramBot) {
    bot.onText(/\/lineup/, async (msg) => {
        const chatId = msg.chat.id;
        const loading = await bot.sendMessage(chatId, '🔍 Buscando time atual...');
        await sendLineup(bot, chatId, loading.message_id);
    });
}

export async function sendLineup(bot: TelegramBot, chatId: number, messageId?: number) {
    try {
        const lineupText = await getLineup();

        if (messageId) {
            await bot.editMessageText(lineupText, {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
            });
        } else {
            await bot.sendMessage(chatId, lineupText, { parse_mode: 'Markdown' });
        }

    } catch (error) {
        console.error('Erro no comando /lineup:', error);
        await bot.sendMessage(chatId, "⚠️ Erro temporário. Tente novamente em alguns minutos.");
    }
}