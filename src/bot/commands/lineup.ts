import { Composer, type Context } from 'grammy';
import { getLineup } from '../services/pandascore/getLineup';
import { editOrSend } from '../utils/reply';
import { getCountryFlag } from '../utils/utils';
import { TEAM } from '../../config/team';

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
        const lineup = players.map((player) => {
            const flag = getCountryFlag(player.nationality ?? '??');
            const fullName = [player.first_name, player.last_name].filter(Boolean).join(' ');
            const extra = fullName ? ` (${fullName})` : '';
            return `▫️ ${flag} ${player.name}${extra}`;
        });

        const lastUpdated = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
        const message = `🎮 *LINEUP ${TEAM.name.toUpperCase()} CS2* 🎮\n\n${lineup.join('\n')}\n\n📅 Atualizado: ${lastUpdated}\n🔗 Fonte: PandaScore API`;
        await editOrSend(ctx, message, loading.message_id, 'Markdown');
    } catch (error) {
        console.error('/lineup: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar a Lineup.';
        await editOrSend(ctx, errorMessage, loading.message_id);
    }
}