import { escapeHtml } from "../utils/utils";
import type { Noticia } from "../services/draft5/types";

export function formatNewsCaption(n: Noticia): string {
    const legenda: string[] = [];

    const titulo = `<b>${escapeHtml(n.titulo)}</b>`;
    const resumo = n.resumo;

    legenda.push(titulo);

    if (resumo.length > 0) {
        const espaco = (1024 - titulo.length - 12);
        const resumoLimitado = escapeHtml(
            (resumo.length > espaco) ? resumo.slice(0, espaco) + '...' : resumo
        );

        legenda.push(`<i>${resumoLimitado}</i>`);
    }

    return legenda.join('\n\n');
}