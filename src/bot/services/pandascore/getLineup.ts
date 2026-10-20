import { PANDASCORE_API_KEY } from '../../../config/env';
import axios from 'axios';
import { TEAM } from '../../../config/team';
import type { Player } from './types';
import { getCached } from '../../../database/cache';
import { CACHE } from '../../../config/cache';

async function fetchLineup(): Promise<Player[]> {
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
    return players;
}

export async function getLineup(): Promise<Player[]> {
    return getCached(CACHE.lineup.key, CACHE.lineup.ttlMs, fetchLineup);
}