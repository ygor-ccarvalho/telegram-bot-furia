import { Composer, type Context } from 'grammy';
import { getNextMatches } from '../services/pandascore/getNextMatches';
import { formatDateTime } from '../utils/utils';
import { TEAM } from '../../config/team';
import { editOrSend } from '../utils/reply';

export const proximosJogosComposer = new Composer();

proximosJogosComposer.command('proximosjogos', async (ctx) => {
    await sendProximosJogos(ctx);
});

export async function sendProximosJogos(ctx: Context): Promise<void> {

    const loading = await ctx.reply('🔍 Buscando próximos jogos...');

    try {
        const matches = await getNextMatches();
        if (matches.length === 0) {
            await editOrSend(ctx, 'Nenhum jogo encontrado.', loading.message_id);
            return;
        }

        let message = `*📅 Próximos jogos da ${TEAM.name}:*\n\n`;

        for (const match of matches) {
            const date = formatDateTime(match.scheduled_at);
            const serieName = [match.league?.name, match.serie?.full_name, match.tournament?.name].filter(Boolean);
            const serieNameFormatted = serieName.join(' - ') || 'Informações indisponíveis';
            const team1 = match.opponents?.[0]?.opponent?.name ?? 'A definir';
            const team2 = match.opponents?.[1]?.opponent?.name ?? 'A definir';
            message += `
 📅 *${date}*
 🏆 *${serieNameFormatted}*
 🎮 *${team1}* vs *${team2}*
 ———————————————\n`;
        }
        await editOrSend(ctx, message, loading.message_id, 'Markdown');

    } catch (error) {
        console.error('/proximosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os próximos jogos.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}