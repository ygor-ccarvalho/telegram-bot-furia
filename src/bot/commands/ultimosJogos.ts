// ultimosJogos.ts
import TelegramBot from 'node-telegram-bot-api';
import { getLastMatches } from '../services/pandscore/getLastMatches';
import { formatDate } from '../utils/utils';
import { TEAM } from '../../config/team';

export function handleUltimosJogos(bot: TelegramBot) {
    bot.onText(/\/ultimosjogos/, async (msg) => {
        const loading = await bot.sendMessage(msg.chat.id, '🔍 Buscando partidas...');
        await sendUltimosJogos(bot, msg.chat.id, loading.message_id);
    });
}

export async function sendUltimosJogos(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const matches = await getLastMatches();

        if (matches.length === 0) {
            if (loadingMessageId) {
                await bot.editMessageText('Nenhuma partida encontrada.', {
                    chat_id: chatId,
                    message_id: loadingMessageId,
                });
            } else {
                await bot.sendMessage(chatId, 'Nenhuma partida encontrada.');
            }
            return;
        }

        let message = `*🕹️ Últimos jogos da ${TEAM.nome}:*\n\n`;

        for (const match of matches) {
            const date = formatDate(match.begin_at);
            const serieName = match.serie?.full_name || 'Campeonato desconhecido';

            const team1 = match.opponents?.[0]?.opponent;
            const team2 = match.opponents?.[1]?.opponent;

            let score1 = 0;
            let score2 = 0;

            if (match.results && match.results.length >= 2) {
                if (match.results[0].team_id === team1?.id) {
                    score1 = match.results[0].score;
                    score2 = match.results[1].score;
                } else {
                    score1 = match.results[1].score;
                    score2 = match.results[0].score;
                }
            }

            const winner = match.winner_id
                ? (match.opponents.find((o: any) => o.opponent.id === match.winner_id)?.opponent.name || 'Desconhecido')
                : 'Sem vencedor';

            message += `
📅 *${date}*
🏆 *${serieName}*
🎮 *${team1?.name}* vs *${team2?.name}*
📊 *Placar*: ${score1} - ${score2}
🥇 *Vencedor*: ${winner}
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
        console.error('/ultimosjogos:', error);
        await bot.sendMessage(chatId, '⚠️ Erro ao buscar partidas.');
    }
}
