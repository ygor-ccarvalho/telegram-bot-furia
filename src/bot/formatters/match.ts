import { escapeHtml } from "../utils/utils";

type Resultado = NonNullable<MatchCard['result']>;

const resultadoIcones: Record<Resultado, string> = {
    win: '✅',
    loss: '❌',
    draw: '⏸️'
};

export interface MatchCard {
    status: 'upcoming' | 'live' | 'finished';
    opponent: string;
    opponentFlag: string;
    championship: string;
    stage: string;
    bestOf: number;
    date: string;
    forfeit: boolean;
    score?: { furia: number; opponent: number };
    result?: 'win' | 'loss' | 'draw';
}

export function formatMatch(card: MatchCard, teamName: string): string {
    const lines: string[] = [];

    let icone: string;
    const nomeTime = escapeHtml(teamName);
    const nomeAdversario = escapeHtml(card.opponent);

    let confronto = card.score ? `${nomeTime} ${card.score.furia} x ${card.score.opponent} ${nomeAdversario}` : `${nomeTime} vs ${nomeAdversario}`;

    switch (card.status) {
        case 'upcoming':
            icone = '⏳';
            break;
        case 'live':
            icone = '🔴';
            confronto += ' · AO VIVO';
            break;
        case 'finished':
            icone = card.result ? resultadoIcones[card.result] : '🚫';
            break;
    }

    if (card.forfeit) {
        confronto += ' (W.O.)';
    }

    lines.push(`${icone} <b>${confronto}</b> ${card.opponentFlag}`);
    lines.push(`🏆 ${escapeHtml(card.championship)} · MD${card.bestOf}`);

    if (card.stage) {
        lines.push(`📍 ${escapeHtml(card.stage)}`);
    }

    lines.push(`📅 ${card.date}`);
    return lines.join('\n');
}