// Movimento do site: scroll suave (Lenis) + o percurso entre as fases (GSAP ScrollTrigger).
// As paredes da primeira tela se desenham só com CSS (Room.astro).
// Quem prefere menos movimento (configuração do sistema) recebe a página estática.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduzMovimento) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // O percurso tracejado atravessa as portas das 3 fases conforme você rola
  const percurso = document.querySelector<SVGElement>('[data-percurso]');
  if (percurso) {
    gsap.fromTo(
      percurso,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        ease: 'none',
        scrollTrigger: { trigger: '[data-sequencia]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      },
    );
  }
}
