import { Context } from 'grammy';
import type { ParseMode } from 'grammy/types';

export async function editOrSend(
    ctx: Context,
    text: string,
    loadingMessageId?: number,
    parseMode?: ParseMode
): Promise<void> {
    const chatId = ctx.chat?.id;
    try {
        if (loadingMessageId && chatId) {
            await ctx.api.editMessageText(chatId, loadingMessageId, text, { parse_mode: parseMode });
        } else {
            await ctx.reply(text, { parse_mode: parseMode });
        }
    } catch (error) {
        console.error('editOrSend: ', error);
    }
}