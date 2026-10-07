import { Bot } from 'grammy';
import { TELEGRAM_BOT_TOKEN } from '../config/env';
import { startComposer } from './commands/start';
import { proximosJogosComposer } from './commands/proximosJogos';
import { ultimosJogosComposer } from './commands/ultimosJogos';
import { lineupComposer } from './commands/lineup';
import { noticiasComposer } from './commands/noticias';
import { comandoDesconhecidoComposer } from './commands/comandoDesconhecido';
import { callbackComposer } from './callbackHandlers';


const bot = new Bot(TELEGRAM_BOT_TOKEN);

bot.use(startComposer);
bot.use(proximosJogosComposer);
bot.use(ultimosJogosComposer);
bot.use(lineupComposer);
bot.use(noticiasComposer);
bot.use(callbackComposer);
bot.use(comandoDesconhecidoComposer);

bot.catch((err) => {
    console.error(`Falha no update ${err.ctx.update.update_id}:`, err.error);
});

export { bot };

