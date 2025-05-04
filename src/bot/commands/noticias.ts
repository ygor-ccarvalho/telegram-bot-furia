import TelegramBot from 'node-telegram-bot-api';
import { getNews } from '../services/draft5/getNews';

export function handleNoticias(bot: TelegramBot) {
    bot.onText(/\/noticias/, async (msg) => {
        const loading = await bot.sendMessage(msg.chat.id, '🔍 Buscando notícias...');
        await sendNoticias(bot, msg.chat.id, loading.message_id);
    });
}

export async function sendNoticias(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const noticias = await getNews();

        if (loadingMessageId) {
            // Deleta a mensagem de "carregando" se vamos enviar várias mensagens de imagem em seguida
            await bot.deleteMessage(chatId, loadingMessageId);
        }

        for (const noticia of noticias) {
            await bot.sendPhoto(chatId, noticia.imagem, {
                caption: `📰 *${noticia.titulo}*\n\n[🔗 Leia a notícia completa](${noticia.url})`,
                parse_mode: 'Markdown',
            });
        }
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);

        if (loadingMessageId) {
            await bot.editMessageText('⚠️ Ocorreu um erro ao buscar as notícias.', {
                chat_id: chatId,
                message_id: loadingMessageId,
            });
        } else {
            await bot.sendMessage(chatId, '⚠️ Ocorreu um erro ao buscar as notícias.');
        }
    }
}
