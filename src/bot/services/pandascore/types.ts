export interface Team { id: number; name: string; }
export interface Match {
    scheduled_at: string;
    league: { name: string | null };
    serie: { full_name: string |null};
    tournament: { name: string | null};
    number_of_games: number;
    winner_id: number | null;
    opponents: { opponent: Team }[];
    results: { team_id: number; score: number }[];
    winner: Team | null;
    name: string;
}

export interface Player {
    name: string;
    first_name: string | null;
    last_name: string | null;
    nationality: string | null;
}