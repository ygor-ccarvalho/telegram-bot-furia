import axios from 'axios';
import { PANDASCORE_API_KEY } from '../../../config/env';
import { TEAM } from '../../../config/team';
import type { Match } from './types';

export async function getLastMatches(): Promise<Match[]> {
    const response = await axios.get<Match[]>('https://api.pandascore.co/csgo/matches/past', {
        params: {
            'filter[opponent_id]': TEAM.id,
            sort: '-scheduled_at',
            per_page: 5,
        },
        headers: {
            Authorization: `Bearer ${PANDASCORE_API_KEY}`,
        },
        timeout: 5000,
    });
 
    const matches: Match[] = response.data;
    return matches;
}