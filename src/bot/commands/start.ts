import TelegramBot from 'node-telegram-bot-api';
import { TEAM } from '../../config/team';

export function handleStartCommand(bot: TelegramBot) {
    bot.onText(/\/start/, (msg) => {
        sendStartMenu(bot, msg.chat.id);
    });
}

// Função reutilizável
export function sendStartMenu(bot: TelegramBot, chatId: number) {
    const text =
        `⚡                 *Bot Oficial da ${TEAM.nome.toUpperCase()} CS2*                    ⚡\n\n` +
        `*Veja tudo sobre o time:*\n\n` +
        `📅 /proximosjogos: confira as datas e adversários.\n` +
        `🕹️ /ultimosjogos: veja os últimos 5 resultados.\n` +
        `🎮 /lineup: conheça os jogadores atuais.\n` +
        `📰 /noticias: fique por dentro das novidades!\n\n` +
        `Escolha uma opção abaixo:`;

    bot.sendMessage(chatId, text, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: '📅 Próximos Jogos', callback_data: 'proximosjogos' },
                    { text: '🕹️ Últimos Jogos', callback_data: 'ultimosjogos' }
                ],
                [
                    { text: '🎮 Lineup', callback_data: 'lineup' },
                    { text: '📰 Notícias', callback_data: 'noticias' }
                ]
            ]
        }
    });
}
