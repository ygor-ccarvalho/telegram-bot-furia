import TelegramBot from 'node-telegram-bot-api';
import { getLastMatches } from '../services/pandscore/getLastMatches';
import { formatDate } from '../utils/utils';
import { TEAM } from '../../config/team';
import { commandRegexes } from '../../config/commands';
import { editOrSend } from '../utils/reply';

export function handleUltimosJogos(bot: TelegramBot) {
    bot.onText(commandRegexes.ultimosJogos, async (msg) => {
        const chatId = msg.chat.id;
        try {
            const loading = await bot.sendMessage(chatId, '🔍 Buscando partidas...');
            await sendUltimosJogos(bot, chatId, loading.message_id);
        } catch (error) {
            console.error('/ultimosjogos: ', error);
        }
    });
}

export async function sendUltimosJogos(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const matches = await getLastMatches();

        if (matches.length === 0) {
            await editOrSend(bot, chatId, 'Nenhuma partida encontrada.', loadingMessageId);
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

        await editOrSend(bot, chatId, message.trim(), loadingMessageId, 'Markdown');

    } catch (error) {
        console.error('/ultimosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os últimos jogos.';
        await editOrSend(bot, chatId, errorMessage, loadingMessageId);
    }
}
