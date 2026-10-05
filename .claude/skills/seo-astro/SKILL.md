---
name: seo-astro
description: Use ao criar ou editar qualquer página, layout, componente de head, dado estruturado (JSON-LD), sitemap, imagem ou artigo de blog do site do Seminário Teológico APRISCO em Astro. Garante HTML semântico, metadados corretos, dados estruturados válidos e performance para o Google.
---

# SEO para o site APRISCO (Astro)

Esta skill resume as regras. Os detalhes completos estão em `docs/03-SEO.md` e `docs/04-HTML-SEMANTICO.md`: **leia esses dois arquivos** na primeira vez que usar a skill na sessão.

## Antes de escrever a página

1. Descubra a palavra-chave principal da página no mapa de `docs/03-SEO.md`. Se não houver, proponha uma e registre. Duas páginas nunca disputam a mesma palavra-chave.
2. Defina `title` (≈60 caracteres, palavra-chave no início, marca no fim) e `description` (140–160 caracteres, escrita para convencer o clique).
3. Defina o outline de títulos (`h1`, `h2`, `h3`) antes do corpo do texto.

## Regras obrigatórias

- Um `<h1>` por página; hierarquia sem pulos de nível.
- Marcos corretos: `<header>`, `<nav aria-label>`, **um** `<main id="conteudo">`, `<section aria-labelledby>`, `<article>`, `<aside>`, `<footer>`.
- Página montada com o layout `Base.astro`, que fornece `lang="pt-BR"`, canonical absoluto, Open Graph, Twitter Card e skip link.
- Canonical absoluto, baseado em `site` do `astro.config.mjs`.
- Imagens: `astro:assets`, `alt` descritivo (ou `alt=""` se decorativa), `width` e `height`. Hero com `loading="eager"` e `fetchpriority="high"`; demais com `loading="lazy"`.
- Hero e capas são `<img>`/`<Picture>`, não `background-image`.
- Links de compra apenas via `CtaButton.astro` e dados de `src/data/cursos.ts`. Texto do link descritivo ("Quero me inscrever no curso de Cristologia"), nunca "clique aqui".
- Links internos entre home, cursos, blog e cursos relacionados, com âncora descritiva.
- JSON-LD via `JsonLd.astro`: `EducationalOrganization` e `WebSite` em todas; `Course` nas páginas de curso; `BreadcrumbList` nas subpáginas; `ItemList` no catálogo; `BlogPosting` nos artigos.
- JavaScript no cliente somente se indispensável (ilha mínima).

## Proibido

- Inventar preço, garantia, certificado, carga horária, depoimento ou professor.
- `Review`/`AggregateRating` sem avaliações reais e verificáveis.
- `meta keywords`. Conteúdo duplicado entre páginas. `noindex` em produção por engano.
- Página sem `title`/`description` próprios.
- Conteúdo importante renderizado só no navegador.

## Antes de dar a tarefa como pronta

Rode `npm run build` e confira o checklist por página no fim de `docs/03-SEO.md`. Em caso de mudança de dados estruturados, valide mentalmente os campos obrigatórios (`Course`: `name`, `description`, `provider`) e recomende ao usuário rodar o Rich Results Test.
