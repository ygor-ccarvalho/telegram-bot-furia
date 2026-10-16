import { InlineKeyboard, Composer, type Context } from 'grammy';
import { TEAM } from '../../config/team';

export const startComposer = new Composer();

startComposer.command('start', async (ctx) => {
    await sendStartMenu(ctx);
});

export async function sendStartMenu(ctx: Context): Promise<void> {
    try {
        const text =
            `⚡ <b>Bot Oficial da ${TEAM.name.toUpperCase()} CS2</b> ⚡\n\n` +
            `Veja tudo sobre o time:\n\n` +
            `📅 /proximosjogos: confira as datas e adversários.\n` +
            `🕹️ /ultimosjogos: veja os últimos 5 resultados.\n` +
            `🎮 /lineup: conheça os jogadores atuais.\n` +
            `📰 /noticias: fique por dentro das novidades!\n\n` +
            `Escolha uma opção abaixo:`;

        const teclado = new InlineKeyboard()
            .text('📅 Próximos Jogos', 'proximosjogos').text('🕹️ Últimos Jogos', 'ultimosjogos').row()
            .text('🎮 Lineup', 'lineup').text('📰 Notícias', 'noticias');
        
        await ctx.reply(text, {
            parse_mode: 'HTML',
            reply_markup: teclado,
        });
    } catch (error) {
        console.error('/start: ', error);
    }
}
