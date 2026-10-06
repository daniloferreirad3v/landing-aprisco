# 02 — Arquitetura

## Stack

- **Astro 7** (geração estática, sem adaptador de servidor), TypeScript estrito (`astro/tsconfigs/strict`).
- `@astrojs/sitemap` para o sitemap; `@astrojs/check` para `npm run check`.
- CSS puro com tokens (custom properties) e estilos escopados do Astro. Sem framework de CSS, sem
  biblioteca de UI.
- Imagens das capas com `astro:assets` (`<Image>` gera WebP em vários tamanhos).
- Fontes locais em `public/fonts` (Anton e Montserrat variável, woff2, licença OFL).
- JavaScript no cliente: **só** o script do `Header.astro` que fecha o menu do celular ao tocar num link.

## Pastas

```
src/
  pages/
    index.astro                 home (página única de vendas)
    cursos/[slug].astro         uma página por curso, gerada de cursos.ts
    politica-de-privacidade.astro, termos-de-uso.astro   rascunhos com [PREENCHER]
    404.astro                   noindex
    teste.astro                 vitrine de componentes da Fase 1; noindex; REMOVER antes do lançamento
    robots.txt.ts               gera robots.txt a partir de `site`
  layouts/
    Base.astro                  <head> completo, JSON-LD da organização, header, <main>, footer
    Pagina.astro                páginas de texto (políticas): breadcrumbs + h1 + prosa
  components/                   ver 04-componentes.md
  data/
    cursos.ts                   FONTE ÚNICA: cursos, planos, preços, links da Kiwify
    trilhas.ts                  trilhas e a ordem dos cursos em cada uma
    faq.ts                      perguntas e respostas (texto do cliente)
    site.ts                     nome, descrições, contato, CNPJ, menu
  lib/seo.ts                    montagem de <title> e meta description
  styles/
    tokens.css                  todas as cores, fontes, tamanhos, espaços (e @font-face)
    reset.css
    global.css                  base, utilitários (.container, .secao, .sr-only, .lista-limpa,
                                .preencher) e as animações de rolagem (.revela)
  assets/cursos/<slug>.png      capas (cópias de design/Capas Cursos, renomeadas pelo slug)
public/
  fonts/, logo/ (cordeiro em SVG e PNG), og/default.jpg (1200×630), favicons
design/                         identidade de origem — nunca alterar
docs/                           briefing original (01–07), design-plan.md e esta pasta
```

## Rotas

| Rota | Origem | Indexada |
|---|---|---|
| `/` | `index.astro` | sim |
| `/cursos/<slug>` (20) | `cursos/[slug].astro` + `cursos.ts` | sim |
| `/politica-de-privacidade`, `/termos-de-uso` | páginas próprias | sim |
| `/404` | `404.astro` | não (`noindex`, fora do sitemap) |
| `/teste` | `teste.astro` | não (`noindex`, fora do sitemap) |

Não existem `/cursos` (catálogo), `/sobre`, `/contato` nem `/blog`. O menu usa âncoras da home:
`/#cursos`, `/#sobre`, `/#duvidas` (funcionam de qualquer página).

URLs sem barra final (`trailingSlash: 'never'`, `build.format: 'directory'`).

## Como os dados viram páginas

```
cursos.ts ──┬─> cursos/[slug].astro (getStaticPaths)  ─> 20 páginas + JSON-LD Course
            ├─> TrilhaSection / CursoCard              ─> vitrine da home
            ├─> Planos, CtaButton                      ─> preços e links de checkout
            └─> faq.ts (preços do "Quanto custa?")     ─> FAQ
trilhas.ts ─> ordem da vitrine e "cursos relacionados"
site.ts    ─> Base (head, JSON-LD), Footer, Header (menu), políticas
```

`cursos.ts` tem uma **verificação de integridade que roda no build** e quebra o build se houver:
slug duplicado ou inválido, trilha citando curso inexistente, curso fora de qualquer trilha, ou duas
páginas com a mesma `palavraChave` (canibalização de SEO).

## SEO

- `Base.astro` monta title, description, canonical (URL absoluta), Open Graph, Twitter, favicons,
  `theme-color` e o JSON-LD `EducationalOrganization` + `WebSite`.
- Página de curso: JSON-LD `Course` (com a capa em JPG) e `BreadcrumbList` (gerado pelo
  `Breadcrumbs.astro` a partir da mesma lista do visível).
- `lib/seo.ts`: `montarTitulo` limita o title a 65 caracteres (encurta a marca para "APRISCO" se
  preciso); `descricaoDoCurso` monta descriptions entre 120 e 160 caracteres.
- Sem `Review`/`AggregateRating` (não há avaliações reais).

### Endereço do site (`astro.config.mjs`)

Canonical, Open Graph, sitemap e robots usam `site`, resolvido nesta ordem:

1. `SITE_URL`, se definida;
2. na Vercel, `https://${VERCEL_PROJECT_PRODUCTION_URL}` (o `*.vercel.app` na demonstração; o
   domínio oficial quando for conectado);
3. fora da Vercel, `https://aprisco.example.com` (placeholder local).

## Deploy (`vercel.json`)

- Cabeçalhos de segurança em todas as rotas (`nosniff`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy`).
- `/_astro/*`: cache de 1 ano, `immutable` (arquivos com hash no nome).
- `/fonts/*`: 7 dias + `stale-while-revalidate` de 30 (nome fixo, então **não** é imutável).
- Qualquer host `*.vercel.app` recebe `X-Robots-Tag: noindex, nofollow`. O domínio oficial não.
- `.gitattributes` força LF no repositório (o build da Vercel roda em Linux).
