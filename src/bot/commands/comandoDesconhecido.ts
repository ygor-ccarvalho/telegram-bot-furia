import TelegramBot from 'node-telegram-bot-api';
import { sendStartMenu } from './start';
import { commandRegexes } from '../../config/commands';

export function handleUnknownCommand(bot: TelegramBot) {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (!text) return;

        const isKnownCommand = Object.values(commandRegexes).some(regex => regex.test(text));

        if (isKnownCommand) return;

        try {
            await bot.sendMessage(chatId, 'Não entendi sua mensagem. Veja o menu abaixo:');
            await sendStartMenu(bot, chatId);
        } catch (error) {
            console.error(error);
        }

    });
}
