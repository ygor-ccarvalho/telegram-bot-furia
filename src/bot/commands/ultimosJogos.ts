import { Composer, type Context } from 'grammy';
import { getLastMatches } from '../services/pandascore/getLastMatches';
import { formatDate } from '../utils/utils';
import { TEAM } from '../../config/team';
import { editOrSend } from '../utils/reply';

export const ultimosJogosComposer = new Composer();

ultimosJogosComposer.command('ultimosjogos', async (ctx) => {
    await sendUltimosJogos(ctx);
});

export async function sendUltimosJogos(ctx: Context): Promise<void> {

    const loading = await ctx.reply('🔍 Buscando partidas...');

    try {
        const matches = await getLastMatches();
        if (matches.length === 0) {
            await editOrSend(ctx, 'Nenhuma partida encontrada.', loading.message_id);
            return;
        }

        let message = `*🕹️ Últimos jogos da ${TEAM.nome}:*\n\n`;

        for (const match of matches) {
            const date = formatDate(match.scheduled_at);
            const serieName = match.serie?.full_name ?? 'Campeonato desconhecido';

            const team1 = match.opponents?.[0]?.opponent;
            const team2 = match.opponents?.[1]?.opponent;

            const score1 = match.results?.find(r => r.team_id === team1?.id)?.score ?? 0;
            const score2 = match.results?.find(r => r.team_id === team2?.id)?.score ?? 0;

            const winner = match.winner?.name ?? 'Sem vencedor';

            message += `
 📅 *${date}*
 🏆 *${serieName}*
 🎮 *${team1?.name ?? 'Desconhecido'}* vs *${team2?.name ?? 'Desconhecido'}*
 📊 *Placar*: ${score1} - ${score2}
 🥇 *Vencedor*: ${winner}
 ———————————————\n`;
        }

        await editOrSend(ctx, message, loading.message_id, 'Markdown');

    } catch (error) {
        console.error('/ultimosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os últimos jogos.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}
