---
name: seo-astro
description: Use ao criar ou editar qualquer página, layout, componente de head, dado estruturado (JSON-LD), sitemap ou imagem do site do Seminário Teológico APRISCO em Astro. Garante HTML semântico, metadados corretos, dados estruturados válidos e performance para o Google.
---

# SEO para o site APRISCO (Astro)

Esta skill resume as regras. Os detalhes estão em `docs/03-SEO.md` e `docs/04-HTML-SEMANTICO.md`, e
a estrutura atual do site em `docs/projeto/02-arquitetura.md`: **leia esses arquivos** na primeira
vez que usar a skill na sessão.

## Como o site está (não presuma outra estrutura)

- Home em **página única** (`/`), com âncoras `#sobre`, `#cursos`, `#assinatura`, `#duvidas`.
- Uma página por curso: `/cursos/<slug>` (20), gerada de `src/data/cursos.ts`.
- Políticas: `/politica-de-privacidade`, `/termos-de-uso`. Fora do sitemap e com `noindex`: `/404`, `/teste`.
- **Não existem** catálogo (`/cursos`), `/sobre`, `/contato` nem blog.

## Antes de escrever a página

1. Descubra a palavra-chave principal (campo `palavraChave` em `cursos.ts` para cursos; mapa em
   `docs/03-SEO.md`). O build impede duas páginas com a mesma.
2. Defina `title` (≤ 65 caracteres, palavra-chave no início, marca no fim; use `montarTitulo` de
   `src/lib/seo.ts`) e `description` (120–165 caracteres, escrita para convencer o clique).
3. Defina o outline de títulos (`h1`, `h2`, `h3`) antes do corpo do texto.

## Regras obrigatórias

- Um `<h1>` por página; hierarquia sem pulos de nível.
- Marcos corretos: `<header>`, `<nav aria-label>`, **um** `<main id="conteudo">` (sem `tabindex`),
  `<section aria-labelledby>`, `<article>`, `<aside>`, `<footer>`.
- Página montada com `Base.astro` (ou `Pagina.astro` para texto), que fornece `lang="pt-BR"`,
  canonical absoluto, Open Graph, Twitter Card e skip link.
- Canonical absoluto, baseado em `site` do `astro.config.mjs`.
- Imagens: `astro:assets`, `alt` descritivo (ou `alt=""` se decorativa), `width` e `height`.
  Primeira tela com `loading="eager"`; o resto com `loading="lazy"`. Não marque como prioritárias as
  capas da vitrine da home (ela fica longe do topo).
- Capas e mural são `<img>`/`<Image>`, não `background-image`.
- Links de compra apenas via `CtaButton.astro` e dados de `src/data/cursos.ts`. Rótulos atuais:
  "ASSINAR AGORA", "QUERO COMEÇAR AGORA", "QUERO COMEÇAR MEUS ESTUDOS AGORA", "ASSINAR" (mensal).
  Nunca "clique aqui".
- Links internos: páginas de curso ligam para cursos relacionados e para as trilhas na home
  (`/#trilha-<id>`). As capas da home **não** são links (decisão do single page).
- JSON-LD via `JsonLd.astro`: `EducationalOrganization` e `WebSite` em todas (no `Base.astro`);
  `Course` nas páginas de curso; `BreadcrumbList` (gerado pelo `Breadcrumbs.astro`) nas subpáginas.
- JavaScript no cliente somente se indispensável.

## Proibido

- Inventar preço, garantia, certificado, carga horária, depoimento ou professor.
- `Review`/`AggregateRating` sem avaliações reais e verificáveis.
- `meta keywords`. Conteúdo duplicado entre páginas. `noindex` em produção por engano (o
  `vercel.json` só manda `noindex` para `*.vercel.app`).
- Página sem `title`/`description` próprios.
- Conteúdo importante renderizado só no navegador.

## Antes de dar a tarefa como pronta

Rode `npm run build` e `npm run check` e confira o checklist por página no fim de `docs/03-SEO.md`.
Em caso de mudança de dados estruturados, valide os campos obrigatórios (`Course`: `name`,
`description`, `provider`) e recomende ao usuário rodar o Rich Results Test.
