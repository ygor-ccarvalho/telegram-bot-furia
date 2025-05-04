import { PANDASCORE_API_KEY } from '../../../config/env';
import axios from 'axios';
import { TEAM } from '../../../config/team';
import { formatDate, getCountryFlag } from '../../utils/utils'; // ajuste o caminho conforme a localização


const cache = {
    lineup: {
        data: '',
        expires: 0,
    },
};

export async function getLineup(): Promise<string> {
    if (Date.now() < cache.lineup.expires) return cache.lineup.data;

    const playersResponse = await axios.get('https://api.pandascore.co/csgo/players', {
        params: {
            'filter[team_id]': TEAM.id,
            'filter[active]': 'true',
        },
        headers: {
            Authorization: `Bearer ${PANDASCORE_API_KEY}`,
        },
        timeout: 8000,
    });

    const players = playersResponse.data.filter((player: any) => player.name?.toLowerCase() !== 'guerri');

    const lineup = players.map((player: any) => {
        const flag = getCountryFlag(player.nationality || '??');
        return `▫️ ${flag} ${player.name} (${player.first_name} ${player.last_name})`;
    });

    const lastUpdated = formatDate(new Date().toLocaleString('pt-BR'));
    const result = `🎮 *LINEUP ${TEAM.nome.toUpperCase()} CS2* 🎮\n\n${lineup.join('\n')}\n\n📅 Atualizado: ${lastUpdated}\n🔗 Fonte: PandaScore API`;

    cache.lineup = {
        data: result,
        expires: Date.now() + 3600000,
    };

    return result;
}


