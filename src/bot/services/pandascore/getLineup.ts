import { PANDASCORE_API_KEY } from '../../../config/env';
import axios from 'axios';
import { TEAM } from '../../../config/team';
import type { Player } from './types';

const cache: { players: { lineup: Player[], expires: number } } = {
    players: {
        lineup: [],
        expires: 0
    }
};

export async function getLineup(): Promise<Player[]> {

    if (Date.now() < cache.players.expires) return cache.players.lineup;

    const playersResponse = await axios.get<Player[]>('https://api.pandascore.co/csgo/players', {
        params: {
            'filter[team_id]': TEAM.id,
            'filter[active]': 'true',
        },
        headers: {
            Authorization: `Bearer ${PANDASCORE_API_KEY}`,
        },
        timeout: 8000,
    });

    const players = playersResponse.data.filter((player) => !TEAM.coaches.includes(player.name.toLowerCase()));

    cache.players = { lineup: players, expires: Date.now() + 3600000 }

    return players;
}