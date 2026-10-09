export interface Team { id: number; name: string; }
export interface Match {
    scheduled_at: string;
    league: { name: string };
    serie: { full_name: string };
    opponents: { opponent: Team }[];
    results: { team_id: number; score: number }[];
    winner: Team | null;
}

export interface Player {
    name: string;
    first_name: string | null;
    last_name: string | null;
    nationality: string | null;
}