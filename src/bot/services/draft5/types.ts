export interface Draft5News { 
    postTitle: string;
    postSlug: string;
    postImage: string;
    postDate: string;
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
    dataPublicacao: string;
}