// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço do site: canonical, Open Graph (imagem no WhatsApp), sitemap e robots.txt saem daqui.
// 1. SITE_URL, se definida (ex.: domínio oficial configurado nas variáveis do Cloudflare).
// 2. CF_PAGES_URL, gerada automaticamente pelo Cloudflare Pages.
// 3. Em ambiente local / fallback oficial.
const SITE =
  process.env.SITE_URL ??
  process.env.CF_PAGES_URL ??
  'https://seminarioaprisco.com.br';

// Só a página inicial vai para o Google (decisão do cliente, 2026-10-13).
// As demais páginas recebem noindex no <head> (prop `noindex` do layout).
const PAGINAS_NO_SITEMAP = ['/'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => PAGINAS_NO_SITEMAP.includes(new URL(page).pathname),
    }),
  ],
});
