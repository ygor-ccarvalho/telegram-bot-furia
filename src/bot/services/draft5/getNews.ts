import axios from 'axios';
import { TEAM } from '../../../config/team';
import type { Draft5Response, Noticia } from './types';
import { getCached } from '../../../database/cache';
import { CACHE } from '../../../config/cache';

async function fetchNews(): Promise<Noticia[]> {
    const noticiasResponse = await axios.get<Draft5Response>('https://api.draft5.gg/news', {
        params: {
            page: 1,
            amount: 10,
            teams: TEAM.draft5Id,
        },
        timeout: 8000,
    });

    const noticias: Noticia[] = noticiasResponse.data.data.news
        .filter((n) => (n.meta?.post_teams ?? '').split(',').includes(TEAM.draft5Id))
        .slice(0, 5)
        .map((n) => ({
            titulo: n.postTitle,
            url: `https://draft5.gg/noticia/${n.postSlug}`,
            imagem: n.postImage,
            resumo: n.postExcerpt ?? '',
        }));
    return noticias;
}

export async function getNews(): Promise<Noticia[]> {
    return getCached(CACHE.news.key, CACHE.news.ttlMs, fetchNews);
}