# Design do site: direção "A planta" (congelada)

Escolhida pelo Brenno em 21/10/2026 e fechada em 27/10/2026. Este arquivo descreve o que existe. Mudanças aqui só com pedido do Brenno. Os valores em código ficam em `src/styles/global.css`; a fonte da verdade da marca é o manual (`MANUAL_DE_MARCA_ESTUDIO_CONTORNO.md`).

## A ideia

A página é uma planta de arquitetura: paredes grossas de cantos arredondados, cotas finas com rótulos em caixa alta e um percurso tracejado que atravessa as portas. Ela recusa o padrão do setor (foto grande com texto por cima e uma grade de cards de serviço). O visitante entende que o estúdio planeja tudo antes da obra porque vê o método desenhado passo a passo.

## Cores

| Token (Tailwind) | HEX | Uso |
| --- | --- | --- |
| `gelo` | #F8F8F8 | Fundo padrão |
| `branco` | #FFFFFF | Faixas e cards sobre gelo |
| `verde` | #8FBEAB | Fundo de marca (primeira tela, afirmação, rodapé), paredes da planta |
| `verde-claro` | #C7DFD5 | Fundos suaves, espaços reservados de foto |
| `verde-zebra` | #EEF5F2 | Hover de lista, zebra de tabela |
| `floresta` | #50625E | Só detalhes: botões, cotas, rótulos, percurso. Nunca fundo |
| `floresta-profundo` | #384744 | Texto e títulos |
| `terra-claro` | #E7B6A7 | Fase Conceitual |
| `terra-medio` | #DC947E | Fase Executivo |
| `terra` | #D68268 | Fase Gestão, filete sob títulos |
| `terra-destaque` | #CB603F | Um único CTA por página (o da primeira tela) e o contorno de foco |
| `borda` | #DCE3DF | Bordas e linhas |

Proporção: 50% gelo/branco, 30% verde, 10% terracota, 10% Floresta. Branco sobre verde só a partir de 24 px; texto menor sobre verde vai em Floresta profundo.

## Tipografia

- **Títulos de impacto:** Montserrat 900, caixa alta, frases curtas (classe `ec-display`). Display 56–64 px no desktop e 36–40 px no celular; H2 por `clamp(1.75rem, 3.6vw, 2.5rem)`.
- **Texto:** Heebo 400/500/700 (substituta da Myriad Pro até a decisão do kit Adobe). Corpo de 18 px no desktop e 16 px no celular.
- **Rótulos e cotas:** 12 px, peso 600, caixa alta, espaçamento de 0,2em, em Floresta (classe `ec-label`).

## Forma

- Cantos sempre arredondados: 6 px (botões, campos), 10 px (cards, fotos), 16 px (blocos).
- Filete terracota de 48 × 4 px sob cada título de seção (classe `ec-filete`).
- Grade de 8 px. Conteúdo em `max-w-6xl`, com margem lateral de 16 px no celular e 32 px a partir de 768 px.
- Sombra única: `shadow-ec`.

## Componentes

| Componente | Onde | Regra |
| --- | --- | --- |
| `HeroFilme` | Primeira tela | Filme em canvas de 18 s: planta, depois cotas e móveis, depois o prédio. As 3 fases são capítulos clicáveis, há botão de pausa e quadro parado com `prefers-reduced-motion`. Congelado |
| `Room` | Fases, fechamento, contato | Um ambiente em planta com aberturas laterais. Traço de 14 px, raio de 28 px nas seções internas |
| Percurso | Fases | Linha tracejada em Floresta que atravessa as portas ao rolar (GSAP ScrollTrigger) |
| `ec-btn ec-btn-primario` | CTAs secundários | Fundo Floresta, texto gelo |
| `ec-btn ec-btn-secundario` | Ações de apoio | Borda 2 px na cor do texto |
| `ec-btn-destaque` | Um por página | Terracota destaque, 18 px bold |
| Link | Texto corrido | Sublinhado de 2 px em `terra`, afastado 6 px |
| Espaço reservado de foto | Obras, Malu | Fundo `verde-claro`, raio 10 px, legenda curta e comentário `<!-- Provisório -->` |
| `WhatsApp` | Todas as telas | Botão redondo flutuante em Floresta, no canto inferior direito |

## Movimento

- Lenis para o scroll suave, com as âncoras compensando o cabeçalho fixo (96 px).
- Animações só onde contam a história: o filme da primeira tela e o percurso das fases.
- `prefers-reduced-motion` desliga tudo e mostra o estado final.

## Fotos (quando chegarem)

Obras reais, luz natural, verticais retas, antes e depois no mesmo enquadramento, a Malu na obra. WebP ou AVIF de até 300 KB, com `alt` no formato "ambiente, bairro, tipo de obra". Nada de banco de imagens nem filtros saturados.

## Acessibilidade

WCAG 2.1 AA. Foco com contorno de 3 px em Terracota destaque. Toda ação funciona pelo teclado. Textos de botão dizem o que acontece ("Fale com a Malu").
