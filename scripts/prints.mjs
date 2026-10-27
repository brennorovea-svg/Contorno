// Prints da página em 5 larguras, para revisar antes de cada PR.
// Uso: npm run prints  (gera o site, sobe a prévia e salva em prints/)
import { spawn, execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const larguras = [360, 390, 768, 1280, 1920];
const porta = 4329;
const endereco = `http://localhost:${porta}/`;

execSync('npx astro build', { stdio: 'inherit' });
const previa = spawn('npx', ['astro', 'preview', '--port', String(porta)], { stdio: 'ignore' });

try {
  // Espera a prévia responder
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(endereco)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }

  mkdirSync('prints', { recursive: true });
  const navegador = await chromium.launch();
  for (const largura of larguras) {
    // Movimento reduzido: o filme fica no quadro final e o print sai sempre igual
    const pagina = await navegador.newPage({ viewport: { width: largura, height: 900 }, reducedMotion: 'reduce' });
    await pagina.goto(endereco, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);
    const arquivo = `prints/home-${largura}.png`;
    await pagina.screenshot({ path: arquivo, fullPage: true });
    console.log('salvo', arquivo);
    await pagina.close();
  }
  await navegador.close();
} finally {
  previa.kill();
}
