import { Composer } from 'grammy';
import { sendProximosJogos } from './commands/proximosJogos';
import { sendUltimosJogos } from './commands/ultimosJogos';
import { sendLineup } from './commands/lineup';
import { sendNoticias } from './commands/noticias';

export const callbackComposer = new Composer();

callbackComposer.callbackQuery('proximosjogos', async (ctx) => {
    await ctx.answerCallbackQuery().catch(console.error);
    await sendProximosJogos(ctx);
});

callbackComposer.callbackQuery('ultimosjogos', async (ctx) => {
    await ctx.answerCallbackQuery().catch(console.error);
    await sendUltimosJogos(ctx);
});

callbackComposer.callbackQuery('lineup', async (ctx) => {
    await ctx.answerCallbackQuery().catch(console.error);
    await sendLineup(ctx);
});

callbackComposer.callbackQuery('noticias', async (ctx) => {
    await ctx.answerCallbackQuery().catch(console.error);
    await sendNoticias(ctx);
});

callbackComposer.on('callback_query:data', (ctx) => ctx.answerCallbackQuery().catch(console.error));