import TelegramBot from 'node-telegram-bot-api';
import { getLineup } from '../services/pandscore/getLineup';
import { commandRegexes } from '../../config/commands';
import { editOrSend } from '../utils/reply';

export function handleLineup(bot: TelegramBot) {
    bot.onText(commandRegexes.lineup, async (msg) => {
        const chatId = msg.chat.id;
        try {
            const loading = await bot.sendMessage(chatId, '🔍 Buscando time atual...');
            await sendLineup(bot, chatId, loading.message_id);
        } catch (error) {
            console.error('/lineup handler: ', error);
        }
    });
}

export async function sendLineup(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const lineupText = await getLineup();
        await editOrSend(bot, chatId, lineupText, loadingMessageId, 'Markdown');
    } catch (error) {
        console.error('/lineup: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar a lineup.';
        await editOrSend(bot, chatId, errorMessage, loadingMessageId);
    }
}