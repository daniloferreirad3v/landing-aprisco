// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [PREENCHER: domínio definitivo] Trocar antes do build de produção.
// Canonical, Open Graph e sitemap são gerados a partir deste valor.
const SITE = 'https://aprisco.example.com';

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
