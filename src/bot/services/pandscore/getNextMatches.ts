import { PANDASCORE_API_KEY } from '../../../config/env';
import axios from 'axios';
import { TEAM } from '../../../config/team';

export async function getNextMacthes(): Promise<any[]> {
    const res = await axios.get('https://api.pandascore.co/csgo/matches/upcoming', {
        params: {
            'filter[opponent_id]': TEAM.id,
            sort: 'begin_at',
            page: { size: 5 },
        },
        headers: {
            Authorization: `Bearer ${PANDASCORE_API_KEY}`,
        },
    });

    return res.data;
}
