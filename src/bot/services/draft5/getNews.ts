import { TEAM } from '../../../config/team';

interface Noticia {
    titulo: string;
    url: string;
    imagem: string;
    dataPublicacao: string;
}

export async function getNews(): Promise<Noticia[]> {
    const response = await fetch(`https://api.draft5.gg/news?page=1&amount=10&teams=${TEAM.draft5Id}`);
    const data = await response.json();

    const noticias = data.data.news
        .filter((noticia: any) => noticia.meta?.post_teams === TEAM.draft5Id)
        .slice(0, 5)
        .map((noticia: any) => ({
            titulo: noticia.postTitle,
            url: `https://draft5.gg/noticia/${noticia.postSlug}`,
            imagem: noticia.postImage,
            dataPublicacao: noticia.postDate
        }));

    return noticias;
}
