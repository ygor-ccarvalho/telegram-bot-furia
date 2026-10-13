import { escapeHtml } from "../utils/utils";

export interface MatchCard {
    date: string;
    championship: string;
    team1: string;
    team2: string;
    score1?: number;
    score2?: number;
    winner?: string;
}

export function formatMatch(data: MatchCard): string {
    const lines: string[] = [];
    lines.push(`📅 ${data.date}`);
    lines.push(`🏆 ${escapeHtml(data.championship)}`);
    lines.push(`🎮 ${escapeHtml(data.team1)} vs ${escapeHtml(data.team2)}`);
    if (data.score1 !== undefined && data.score2 !== undefined) { lines.push(`📊 Placar: ${data.score1} - ${data.score2}`); }
    if (data.winner) { lines.push(`🥇 Vencedor: ${escapeHtml(data.winner)}`); }
    return lines.join('\n');
}
