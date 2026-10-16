import axios from 'axios';
import { TEAM } from '../../../config/team';
import type { Draft5Response, Noticia } from './types';

const CACHE_TTL_MS = 15 * 60 * 1000;
const cache: { data: Noticia[]; expires: number } = { data: [], expires: 0 };

export async function getNews(): Promise<Noticia[]> {

    if (Date.now() < cache.expires) return cache.data;

    const noticiasResponse = await axios.get<Draft5Response>(`https://api.draft5.gg/news`, {
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

    cache.data = noticias;
    cache.expires = Date.now() + CACHE_TTL_MS;

    return noticias;
}