export function formatMatchDate(iso: string): string {
    const date = new Date(iso);

    return date.toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(", ", " · ");
}

export function getCountryFlag(code: string): string {
    if (!code || code.length !== 2) return '🏳️';

    return String.fromCodePoint(
        ...code.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0))
    );
}

export function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}