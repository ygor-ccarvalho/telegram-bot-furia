import axios from 'axios';
import { PANDASCORE_API_KEY } from '../../../config/env';
import { TEAM } from '../../../config/team';
import type { Match } from './types';
import { getCached } from '../../../database/cache';
import { CACHE } from '../../../config/cache';

async function fetchNextMatches(): Promise<Match[]> {
    const res = await axios.get<Match[]>('https://api.pandascore.co/csgo/matches/upcoming', {
        params: {
            'filter[opponent_id]': TEAM.id,
            sort: 'scheduled_at',
            per_page: 5,
        },
        headers: {
            Authorization: `Bearer ${PANDASCORE_API_KEY}`,
        },
        timeout: 8000,
    });
    return res.data;
}

export async function getNextMatches(): Promise<Match[]> {
    return getCached(CACHE.nextMatches.key, CACHE.nextMatches.ttlMs, fetchNextMatches);
}