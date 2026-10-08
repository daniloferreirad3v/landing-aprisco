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

// Páginas fora do sitemap (também recebem noindex no <head>).
const FORA_DO_SITEMAP = ['/404'];

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      filter: (page) => !FORA_DO_SITEMAP.some((rota) => new URL(page).pathname === rota),
    }),
  ],
});
