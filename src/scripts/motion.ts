// Movimento do site: scroll suave (Lenis) + revelações ao rolar (GSAP ScrollTrigger).
// Quem prefere menos movimento (configuração do sistema) recebe a página estática.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduzMovimento) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Qualquer elemento com data-reveal sobe e aparece ao entrar na tela.
  // data-reveal="stagger" anima os filhos um depois do outro.
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    const alvos = el.dataset.reveal === 'stagger' ? el.children : el;
    gsap.from(alvos, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 85%' },
    });
  });

  // Linha do tempo das fases: a barra terracota cresce conforme você rola.
  const barra = document.querySelector<HTMLElement>('[data-fases-barra]');
  if (barra) {
    gsap.fromTo(
      barra,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: barra.parentElement, start: 'top 75%', end: 'bottom 45%', scrub: true },
      },
    );
  }
}
