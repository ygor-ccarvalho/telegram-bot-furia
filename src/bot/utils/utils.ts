
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}
export function getCountryFlag(code: string): string {
    if (!code || code.length !== 2) return '🏳️';

    return String.fromCodePoint(
        ...code.toUpperCase().split('').map((c) => 127397 + c.charCodeAt(0))
    );
}