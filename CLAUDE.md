# Regras fixas do site do Estúdio Contorno

Leia isto antes de qualquer mudança. O que está aqui já foi decidido com o Brenno: não reabra, não ofereça alternativas e não refaça.

## O que é

- Site de marketing do Estúdio Contorno (arquitetura e gestão de obra em São Paulo), da Malu.
- Público principal: quem vai reformar apartamento em São Paulo e tem medo de estourar prazo e orçamento.
- Uma única ação importa: abrir o WhatsApp da Malu (`https://wa.me/5511981660262`).
- Responda e escreva sempre em português do Brasil. O Brenno está aprendendo desenvolvimento web: explique escolhas em uma frase, sem jargão.

## Decisões tomadas (não mudar)

- **Stack:** Astro + Tailwind 4 + GSAP/Lenis. Nada de framework novo, CMS, banco, backend ou dependência nova sem pedido explícito.
- **Hospedagem:** GitHub Pages, publicado a cada push na `main` (`.github/workflows/pages.yml`). Nada de Vercel (o plano grátis proíbe uso comercial).
- **Domínio:** só com o ok do Brenno e da Malu. Não mexa em DNS, `CNAME` nem `astro.config.mjs` por conta própria.
- **Direção visual:** "A planta", congelada em `DESIGN.md`. Não proponha outra direção, outra paleta ou outra fonte.
- **Primeira tela:** o filme da planta (`src/components/HeroFilme.astro`), aprovado e publicado. Não redesenhe; só corrija bugs.
- **Estrutura:** página única (`src/pages/index.astro`) com seções e menu por âncoras. Não crie páginas novas sem pedido.
- **Seções, em ordem:** primeira tela, afirmação, como trabalhamos (3 fases), pacotes, obras, quem é a Malu, contato.

## Proibido

- Inventar fatos: nomes de obras, bairros, metragens, depoimentos, prazos, economia em reais, formação da Malu. Só vale o que está no manual e no `PRODUCT.md` ("+80 obras entregues", desde 2021, 3 fases, 3 pacotes, "a obra só começa com todos os orçamentos aprovados").
- Foto de banco de imagem. Enquanto as fotos reais não chegam, use um espaço reservado marcado com o comentário `<!-- Provisório: ... -->`.
- Azul, amarelo, rosa, roxo ou qualquer cor fora de `src/styles/global.css`. Verde Floresta como fundo.
- Mais de um botão Terracota destaque por página.
- Escrever "Arq.", "metodologia exclusiva" ou frases alarmistas. A assinatura é "Estúdio Contorno / Malu Burato".
- Redigitar o logotipo. O símbolo atual (`Simbolo.astro`) é provisório até chegarem os SVGs oficiais.
- Commitar segredos. O repositório é público.

## Como fazer cada mudança (roteiro curto)

1. Mude só o que foi pedido. Uma mudança por PR, com título e descrição em português.
2. Caminhos internos sempre por `url()` de `src/lib/url.ts` (o site mora em `/Contorno/` no GitHub Pages).
3. `npm run build` tem que passar.
4. Confira o checklist rápido: textos em "você", contraste (texto pequeno sobre verde em Floresta profundo), `prefers-reduced-motion` respeitado, foco visível.

## Prints em 5 tamanhos

Só quando o Brenno pedir. `npm run prints` gera o site, sobe uma prévia e salva prints de página inteira em `prints/` nos tamanhos 360, 390, 768, 1280 e 1920 px de largura. A pasta `prints/` não vai para o git. Precisa do Chromium do Playwright, que já vem instalado no ambiente na nuvem.

## Pendências que dependem de pessoas (não tente resolver sozinho)

- Brenno: 10 a 15 fotos das obras e uma foto da Malu na obra.
- Malu: revisão de todos os textos de uma vez.
- Brenno e Malu: logo oficial em SVG, fonte (Heebo ou Myriad Pro) e domínio.

## Onde fica cada coisa

- `PRODUCT.md`: público, posicionamento e compromissos da marca.
- `DESIGN.md`: cores, tipos, componentes e regras visuais.
- `src/styles/global.css`: os tokens em código.
- `.claude/skills/`: Impeccable e Hairline. Use só se o Brenno pedir uma revisão de design ou uma figura nova.
