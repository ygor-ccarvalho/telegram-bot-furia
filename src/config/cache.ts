import { TEAM } from './team'

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;


export const CACHE = {
    nextMatches: { key: `next-matches:${TEAM.id}`, ttlMs: 5 * MINUTE },
    lastMatches: { key: `last-matches:${TEAM.id}`, ttlMs: 30 * MINUTE },
    lineup: { key: `lineup:${TEAM.id}`, ttlMs: 1 * HOUR },
    news: { key: `news:${TEAM.draft5Id}`, ttlMs: 15 * MINUTE }
} as const;