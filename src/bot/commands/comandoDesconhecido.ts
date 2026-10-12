import { Composer, type Context } from 'grammy';
import { sendStartMenu } from './start';

export const comandoDesconhecidoComposer = new Composer();

comandoDesconhecidoComposer.chatType('private').on('message:text', async (ctx) => {
    await sendComandoDesconhecido(ctx);
});

export async function sendComandoDesconhecido(ctx: Context): Promise<void> {
    try {
        await ctx.reply('Não entendi sua mensagem. Veja o menu abaixo:');
        await sendStartMenu(ctx);
    } catch (error) {
        console.error('/comandoDesconhecido error:', error);
    }
}
