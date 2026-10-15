import { TEAM } from "../../config/team";
import { getCountryFlag, formatMatchDate } from "../utils/utils";
import type { MatchCard } from "../formatters/match";
import type { Match } from "../services/pandascore/types";

export function toMatchCard(match: Match): MatchCard {

    const adversario = match.opponents.find(opponent => opponent.opponent.id !== TEAM.id)?.opponent;
    const nome = adversario?.name ?? 'A definir';
    const bandeira = getCountryFlag(adversario?.location ?? '');
    const status = match.status === 'finished' ? 'finished' : match.status === 'running' ? 'live' : 'upcoming';

    let furiaScore = 0;
    let adversarioScore = 0;

    if (status !== 'upcoming') {
        furiaScore = match.results.find(r => r.team_id === TEAM.id)?.score ?? 0;
        adversarioScore = match.results.find(r => r.team_id !== TEAM.id)?.score ?? 0;
    }

    let resultado: 'win' | 'loss' | 'draw' | undefined;
    if (status === 'finished') {
        resultado = match.draw ? 'draw' : match.winner_id === TEAM.id ? 'win' : 'loss';
    }

    const campeonato = [match.league?.name, match.serie?.full_name].filter(Boolean).join(' ') || 'Campeonato a definir';

    const round = match.name.includes(':') ? match.name.split(':')[0].trim() : '';
    const fase = [match.tournament?.name, round].filter(Boolean).join(' · ');
    const data = formatMatchDate(match.scheduled_at);

    return {
        status,
        opponent: nome,
        opponentFlag: bandeira,
        championship: campeonato,
        stage: fase,
        bestOf: match.number_of_games,
        date: data,
        forfeit: match.forfeit,
        score: status === 'upcoming' ? undefined : { furia: furiaScore, opponent: adversarioScore },
        result: resultado
    };
}