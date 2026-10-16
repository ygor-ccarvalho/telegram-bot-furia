export interface Draft5News { 
    postTitle: string;
    postExcerpt: string;
    postSlug: string;
    postImage: string;
    meta?: {
        post_teams?: string
    }
} 

export interface Draft5Response { 
    data: {
        news: Draft5News[];
    };
}

export interface Noticia {
    titulo: string;
    url: string;
    imagem: string;
    resumo: string;
}