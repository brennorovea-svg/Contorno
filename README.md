# Site do Estúdio Contorno

Site de marketing do Estúdio Contorno (arquitetura e gestão de obra em São Paulo), feito com:

- [Astro](https://astro.build): gera páginas estáticas, rápidas e boas para SEO
- [Tailwind CSS](https://tailwindcss.com): estilização com os tokens do manual de marca
- [GSAP](https://gsap.com) + ScrollTrigger: animações ao rolar
- [Lenis](https://github.com/darkroomengineering/lenis): scroll suave

## Rodando no seu computador

Precisa do [Node.js](https://nodejs.org) 22 ou mais novo.

```bash
npm install      # instala as dependências (uma vez)
npm run dev      # abre o site em http://localhost:4321 e atualiza a cada alteração
npm run build    # gera a versão final na pasta dist/
```

## Onde fica cada coisa

| Caminho | O que é |
| --- | --- |
| `src/styles/global.css` | Cores, fontes e componentes do manual de marca (tudo em `@theme` vira classe do Tailwind, ex.: `bg-verde`) |
| `src/layouts/Base.astro` | Esqueleto de toda página: `<head>`, SEO, cabeçalho, rodapé, botão de WhatsApp |
| `src/components/` | Peças reutilizáveis (símbolo da marca, cabeçalho, rodapé...) |
| `src/pages/` | Cada arquivo vira uma página. `obras.astro` → `/obras` |
| `src/scripts/motion.ts` | Scroll suave e animações. Use `data-reveal` em qualquer elemento para ele aparecer ao rolar |
| `public/` | Arquivos servidos como estão (favicon, imagens, logos) |

## Pendências

- Logos oficiais em SVG (o símbolo atual foi recriado a partir da geometria do manual)
- Grafismo e ícones oficiais
- Fotos e dados das obras, foto da Malu, depoimentos
- Decisão de fonte: kit Adobe (Myriad Pro) ou Heebo (em uso)
