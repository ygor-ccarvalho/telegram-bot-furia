import { Composer, type Context } from 'grammy';
import { getNews } from '../services/draft5/getNews';
import { editOrSend } from '../utils/reply';

export const noticiasComposer = new Composer();

noticiasComposer.command('noticias', async (ctx) => {
    await sendNoticias(ctx);
});

export async function sendNoticias(ctx: Context): Promise<void> {
    const loading = await ctx.reply('🔍 Buscando notícias...');
    try {
        const noticias = await getNews();

        if (noticias.length === 0) {
            await editOrSend(ctx, 'Nenhuma notícia encontrada.', loading.message_id);
            return;
        }

        let enviadas = 0;
        for (const noticia of noticias) {
            try {
                await ctx.replyWithPhoto(noticia.imagem, {
                    caption: `📰 *${noticia.titulo}*\n\n[🔗 Leia a notícia completa](${noticia.url})`,
                    parse_mode: 'Markdown'
                });
                enviadas++;
            } catch (error) {
                console.error('Erro ao enviar noticia: ', noticia.titulo, error);
            }
        }

        if (enviadas === 0) {
            await editOrSend(ctx, 'Não consegui enviar as notícias.', loading.message_id);
            return;
        }

        await ctx.api
            .deleteMessage(loading.chat.id, loading.message_id)
            .catch((error) => console.error('Erro ao deletar mensagem de carregamento: ', error));

    } catch (error) {
        console.error('/noticias: ', error);
        const errorMessage = "Ocorreu um erro ao buscar as notícias";
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}