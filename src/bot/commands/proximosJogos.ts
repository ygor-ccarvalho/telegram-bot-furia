import TelegramBot from 'node-telegram-bot-api';
import { getNextMatches } from '../services/pandscore/getNextMatches';
import { formatDate } from '../utils/utils';
import { TEAM } from '../../config/team';
import { commandRegexes } from '../../config/commands';
import { editOrSend } from '../utils/reply';

export function handleProximosJogos(bot: TelegramBot) {
    bot.onText(commandRegexes.proximosJogos, async (msg) => {
        const chatId = msg.chat.id;
        try {
            const loading = await bot.sendMessage(chatId, '🔍 Buscando próximos jogos...');
            await sendProximosJogos(bot, chatId, loading.message_id);
        } catch (error) {
            console.error('/proximosjogos: ', error);
        }
    });
}

export async function sendProximosJogos(bot: TelegramBot, chatId: number, loadingMessageId?: number) {
    try {
        const matches = await getNextMatches();

        if (matches.length === 0) {
            await editOrSend(bot, chatId, 'Nenhum jogo encontrado.', loadingMessageId);
            return;
        }

        let message = `*📅 Próximos jogos da ${TEAM.nome}:*\n\n`;

        for (const match of matches) {
            const date = formatDate(match.begin_at);
            const serieName = match.serie?.full_name || 'Campeonato desconhecido';
            const team1 = match.opponents?.[0]?.opponent?.name ?? 'A definir';
            const team2 = match.opponents?.[1]?.opponent?.name ?? 'A definir';

            message += `
📅 *${date}*
🏆 *${serieName}*
🎮 *${team1}* vs *${team2}*
———————————————\n`;
        }

        await editOrSend(bot, chatId, message.trim(), loadingMessageId, 'Markdown');

    } catch (error) {
        console.error('/proximosjogos: ', error);
        const errorMessage = 'Ocorreu um erro ao buscar os próximos jogos.';
        await editOrSend(bot, chatId, errorMessage, loadingMessageId);
    }
}

