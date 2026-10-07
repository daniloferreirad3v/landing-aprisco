// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Endereço do site: canonical, Open Graph (imagem no WhatsApp), sitemap e robots.txt saem daqui.
// 1. SITE_URL, se definida (ex.: forçar o domínio oficial no build).
// 2. Na Cloudflare Pages, o endereço gerado automaticamente (CF_PAGES_URL).
// 3. Na Vercel, o endereço de produção do projeto (VERCEL_PROJECT_PRODUCTION_URL).
// 4. Fora de ambos (máquina local), um domínio reservado de exemplo.
const SITE =
  process.env.SITE_URL ??
  process.env.CF_PAGES_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://aprisco.example.com');

// Páginas fora do sitemap (também recebem noindex no <head>).
const FORA_DO_SITEMAP = ['/404', '/teste'];

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
