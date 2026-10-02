import TelegramBot from 'node-telegram-bot-api';
import { sendProximosJogos } from './commands/proximosJogos';
import { sendUltimosJogos } from './commands/ultimosJogos';
import { sendLineup } from './commands/lineup';
import { sendNoticias } from './commands/noticias';

export function handleCallbackQuery(bot: TelegramBot) {
    bot.on('callback_query', async (callbackQuery) => {
        const chatId = callbackQuery.message?.chat.id;
        const data = callbackQuery.data;

        if (!chatId || !data) return;

        await bot.answerCallbackQuery(callbackQuery.id);

        let handler: (() => Promise<void>) | null = null;

        switch (data) {

            case 'proximosjogos':
                handler = async () => {
                    const loading = await bot.sendMessage(chatId, '🔍 Buscando jogos...');
                    await sendProximosJogos(bot, chatId, loading.message_id);
                };

                break;

            case 'ultimosjogos':
                handler = async () => {
                    const loading = await bot.sendMessage(chatId, '🔍 Buscando partidas...');
                    await sendUltimosJogos(bot, chatId, loading.message_id);
                };
                break;

            case 'lineup':
                handler = async () => {
                    const loading = await bot.sendMessage(chatId, '🔍 Buscando time atual...');
                    await sendLineup(bot, chatId, loading.message_id);
                };
                break;

            case 'noticias':
                handler = async () => {
                    const loading = await bot.sendMessage(chatId, '🔍 Buscando notícias...');
                    await sendNoticias(bot, chatId, loading.message_id);
                };
                break;
        }

        if (handler) {
            try {
                await handler();
                
            }
            catch (error) {
                console.error(error);
                await bot.sendMessage(chatId, "Não foi possível realizar a busca, tente novamente mais tarde.").catch(console.error);
             }
        }

    });
}


