import type { Player } from "../services/pandascore/types";
import type { PlayerCard } from "../formatters/lineup";

export function toPlayerCard(player: Player): PlayerCard{
    return {
        name: player.name,
        firstName: player.first_name,
        lastName: player.last_name,
        nationality: player.nationality
    };
}