// Posts do Instagram do estúdio, lidos na hora do build a partir do feed JSON do Behold
// (behold.so). O endereço do feed vem da variável INSTAGRAM_FEED_URL; sem ela, nada é buscado.
// Buscar só no build gasta uma visualização do plano por publicação, e o workflow
// republica o site uma vez por dia para pegar posts novos.

export interface Post {
  id: string;
  link: string;
  imagem: string;
  largura: number;
  altura: number;
  legenda: string;
  alt: string;
  data: Date;
  album: boolean;
  video: boolean;
}

interface Tamanho { mediaUrl: string; width: number; height: number }
interface PostBehold {
  id: string;
  permalink: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
  prunedCaption?: string;
  caption?: string;
  altText?: string;
  sizes?: Partial<Record<'small' | 'medium' | 'large' | 'full', Tamanho>>;
}

let cache: Promise<Post[]> | undefined;

export function postsDoInstagram(): Promise<Post[]> {
  cache ??= buscar();
  return cache;
}

async function buscar(): Promise<Post[]> {
  const feed = process.env.INSTAGRAM_FEED_URL;
  if (!feed) return [];
  try {
    const resposta = await fetch(feed);
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const { posts = [] } = (await resposta.json()) as { posts?: PostBehold[] };
    return posts.flatMap((p) => {
      // As imagens de "sizes" ficam no CDN do Behold; o mediaUrl original do Instagram expira.
      const t = p.sizes?.large ?? p.sizes?.medium ?? p.sizes?.full;
      if (!t) return [];
      const legenda = (p.prunedCaption ?? p.caption ?? '').trim();
      return [{
        id: p.id,
        link: p.permalink,
        imagem: t.mediaUrl,
        largura: t.width,
        altura: t.height,
        legenda,
        alt: p.altText || legenda.split('\n')[0] || 'Post do Estúdio Contorno no Instagram',
        data: new Date(p.timestamp),
        album: p.mediaType === 'CAROUSEL_ALBUM',
        video: p.mediaType === 'VIDEO',
      }];
    });
  } catch (erro) {
    // Um feed fora do ar não pode derrubar a publicação do site.
    console.warn(`[instagram] feed indisponível: ${(erro as Error).message}`);
    return [];
  }
}
