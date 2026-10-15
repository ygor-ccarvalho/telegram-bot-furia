import { Composer, type Context } from "grammy";
import { getLineup } from "../services/pandascore/getLineup";
import { editOrSend } from "../utils/reply";
import { TEAM } from "../../config/team";
import { toPlayerCard } from "../mappers/lineup";
import { formatPlayer } from "../formatters/lineup";

export const lineupComposer = new Composer();

lineupComposer.command('lineup', async (ctx) => {
    await sendLineup(ctx);
});

export async function sendLineup(ctx: Context): Promise<void> {
    const loading = await ctx.reply('🔍 Buscando time atual...');

    try {
        const players = await getLineup();
        if (players.length === 0) {
            await editOrSend(ctx, 'Lineup indisponível.', loading.message_id);
            return;
        }

        const cards = players.map(toPlayerCard);
        const body = cards.map(formatPlayer).join('\n');
        const message = `<b>🎮 LINEUP ${TEAM.name.toUpperCase()} CS2:</b>\n\n${body}\n\n🔗 Fonte: PandaScore`;

        await editOrSend(ctx, message, loading.message_id, 'HTML');

    } catch (error) {
        console.error('/lineup: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar a Lineup.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}