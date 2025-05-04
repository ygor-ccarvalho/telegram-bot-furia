import TelegramBot from 'node-telegram-bot-api';
import { sendStartMenu } from './start';

const validCommands = ['/start', '/lineup', '/proximosjogos', '/ultimosjogos', '/noticias'];

export function handleUnknownCommand(bot: TelegramBot) {
    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text?.trim();

        if (text?.startsWith('/') && validCommands.includes(text.split(' ')[0])) return;

        if (!text) return;

        await bot.sendMessage(chatId, 'Não entendi sua mensagem. Veja o menu abaixo:');
        sendStartMenu(bot, chatId);
    });
}
