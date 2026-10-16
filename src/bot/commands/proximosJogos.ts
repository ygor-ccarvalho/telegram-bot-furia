import { Composer, type Context } from 'grammy';
import { getNextMatches } from '../services/pandascore/getNextMatches';
import { formatMatch } from '../formatters/match';
import { TEAM } from '../../config/team';
import { editOrSend } from '../utils/reply';
import { toMatchCard } from '../mappers/match';

export const proximosJogosComposer = new Composer();

proximosJogosComposer.command('proximosjogos', async (ctx) => {
    await sendProximosJogos(ctx);
});

export async function sendProximosJogos(ctx: Context): Promise<void> {
    const loading = await ctx.reply('🔍 Buscando partidas...');

    try {
        const matches = await getNextMatches();
        if (matches.length === 0) {
            await editOrSend(ctx, 'Nenhuma partida encontrada.', loading.message_id);
            return;
        }

        const cards = matches.map(toMatchCard);
        const body = cards.map(c => formatMatch(c, TEAM.name)).join('\n\n');
        const message = `<b>🕹️ Próximos jogos da ${TEAM.name}:</b>\n\n${body}`;

        await editOrSend(ctx, message, loading.message_id, 'HTML');

    } catch (error) {
        console.error('/proximosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os próximos jogos.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}