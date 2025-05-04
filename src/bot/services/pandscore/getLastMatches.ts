import { PANDASCORE_API_KEY } from '../../../config/env';
import { TEAM } from '../../../config/team';




function escapeMarkdown(text: string): string {
    return text
        .replace(/_/g, '\\_')
        .replace(/\*/g, '\\*')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/~/g, '\\~')
        .replace(/\\/g, '\\\\')
        .replace(/>/g, '\\>')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/=/g, '\\=')
        .replace(/\|/g, '\\|')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
}

export async function getLastMatches() {
    const url = `https://api.pandascore.co/csgo/matches/past?filter[opponent_id]=${TEAM.id}&per_page=5`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${PANDASCORE_API_KEY}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
    }

    const matches = await response.json();
    return matches;
}