export interface PandaTeam {
    id: number;
    name: string;
    location: string | null;
}

export interface Match {
    name: string;
    status: 'not_started' | 'running' | 'finished' | 'canceled' | 'postponed';
    scheduled_at: string;
    number_of_games: number;
    draw: boolean;
    forfeit: boolean;
    winner_id: number | null;
    league: { name: string } | null;
    serie: { full_name: string } | null;
    tournament: { name: string } | null;
    opponents: { opponent: PandaTeam }[];
    results: { team_id: number; score: number }[];
}

export interface Player {
    name: string;
    first_name: string | null;
    last_name: string | null;
    nationality: string | null;
}