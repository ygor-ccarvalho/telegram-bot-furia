import TelegramBot from 'node-telegram-bot-api';
import { getNews } from '../services/draft5/getNews';
import { commandRegexes } from '../../config/commands';
import { editOrSend } from '../utils/reply';

export function handleNoticias(bot: TelegramBot) {
    bot.onText(commandRegexes.noticias, async (msg) => {
        const chatId = msg.chat.id;
        try {
            const loading = await bot.sendMessage(chatId, '🔍 Buscando notícias...');
            await sendNoticias(bot, chatId, loading.message_id);
        } catch (error) {
            console.error(error);
        }
    });
}

export async function sendNoticias(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const noticias = await getNews();

        if (noticias.length === 0) {
            await editOrSend(bot, chatId, 'Nenhuma notícia encontrada.', loadingMessageId);
            return;
        }

        let enviadas = 0;

        for (const noticia of noticias) {
            try {
                await bot.sendPhoto(chatId, noticia.imagem, {
                    caption: `📰 *${noticia.titulo}*\n\n[🔗 Leia a notícia completa](${noticia.url})`,
                    parse_mode: 'Markdown',
                });
                enviadas++;
            } catch (error) {
                console.error('Erro ao enviar noticia: ', noticia.titulo, error);
            }
        }

        if (enviadas === 0) {
            await editOrSend(bot, chatId, 'Não consegui enviar as notícias.', loadingMessageId);
            return;
        }

        if (loadingMessageId) {
            await bot.deleteMessage(chatId, loadingMessageId).catch((err) => console.error('/noticias delete: ', err));
        }

    } catch (error) {
        console.error('/noticias: ', error);
        const errorMessage = "Ocorreu um erro ao buscar as notícias"
        await editOrSend(bot, chatId, errorMessage, loadingMessageId);
    }
}
