import { Composer, type Context } from 'grammy';
import { getLastMatches } from '../services/pandascore/getLastMatches';
import { formatMatch } from '../formatters/match';
import { TEAM } from '../../config/team';
import { editOrSend } from '../utils/reply';
import { toMatchCard } from '../mappers/match';

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

        const cards = matches.map(toMatchCard);
        const body = cards.map(c => formatMatch(c, TEAM.name)).join('\n\n');
        const message = `<b>🕹️ Últimos jogos da ${TEAM.name}:</b>\n\n${body}`;

        await editOrSend(ctx, message, loading.message_id, 'HTML');

    } catch (error) {
        console.error('/ultimosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os últimos jogos.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}