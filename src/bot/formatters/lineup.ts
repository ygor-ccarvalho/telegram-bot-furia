import { escapeHtml, getCountryFlag } from "../utils/utils";

export interface PlayerCard {
    name: string;
    firstName: string | null;
    lastName: string | null;
    nationality: string | null;
}

export function formatPlayer(player: PlayerCard): string {
    const flag = getCountryFlag(player.nationality ?? '');
    const fullName = [player.firstName, player.lastName].filter(Boolean).join(' ');
    const suffix = fullName ? `( ${escapeHtml(fullName)} )` : '';
    return `▫️ ${flag} <b>${escapeHtml(player.name)}</b>${suffix}`;
}