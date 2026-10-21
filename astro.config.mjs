// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// SITE e BASE vêm do workflow do GitHub Pages; sem eles, vale o domínio próprio.
export default defineConfig({
  site: process.env.SITE ?? 'https://estudiocontorno.com.br',
  base: process.env.BASE ?? '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
