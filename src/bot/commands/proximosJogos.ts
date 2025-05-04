// proximosJogos.ts
import TelegramBot from 'node-telegram-bot-api';
import { getNextMacthes } from '../services/pandscore/getNextMatches';
import { formatDate } from '../utils/utils';
import { TEAM } from '../../config/team';

export function handleProximosJogos(bot: TelegramBot) {
    bot.onText(/\/proximosjogos/, async (msg) => {
        const chatId = msg.chat.id;
        const loading = await bot.sendMessage(chatId, '🔍 Buscando próximos jogos...');
        await sendProximosJogos(bot, chatId, loading.message_id);
    });
}

export async function sendProximosJogos(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const matches = await getNextMacthes();

        if (matches.length === 0) {
            if (loadingMessageId) {
                await bot.editMessageText('Nenhum jogo encontrado.', {
                    chat_id: chatId,
                    message_id: loadingMessageId,
                });
            } else {
                await bot.sendMessage(chatId, 'Nenhum jogo encontrado.');
            }
            return;
        }

        let message = `*📅 Próximos jogos da ${TEAM.nome}:*\n\n`;

        for (const match of matches) {
            const date = formatDate(match.begin_at);
            const serieName = match.serie?.full_name || 'Campeonato desconhecido';
            const team1 = match.opponents?.[0]?.opponent;
            const team2 = match.opponents?.[1]?.opponent;

            message += `
📅 *${date}*
🏆 *${serieName}*
🎮 *${team1?.name}* vs *${team2?.name}*
———————————————\n`;
        }

        if (loadingMessageId) {
            await bot.editMessageText(message.trim(), {
                chat_id: chatId,
                message_id: loadingMessageId,
                parse_mode: 'Markdown'
            });
        } else {
            await bot.sendMessage(chatId, message.trim(), { parse_mode: 'Markdown' });
        }

    } catch (error) {
        console.error('/proximosjogos:', error);
        await bot.sendMessage(chatId, '⚠️ Erro ao buscar os próximos jogos.');
    }
}

