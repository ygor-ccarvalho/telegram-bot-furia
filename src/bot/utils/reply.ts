import TelegramBot from 'node-telegram-bot-api';

export async function editOrSend(
    bot: TelegramBot,
    chatId: number,
    text: string,
    loadingMessageId?: number,
    parseMode?: TelegramBot.ParseMode
): Promise<void> {

    try {
        if (loadingMessageId) {
            await bot.editMessageText(text, {
                chat_id: chatId,
                message_id: loadingMessageId,
                parse_mode: parseMode
            });
        } else {
            await bot.sendMessage(chatId, text, {parse_mode: parseMode});
        }
    } catch (error) {
        console.error('editOrSend: ', error);
    }

}
