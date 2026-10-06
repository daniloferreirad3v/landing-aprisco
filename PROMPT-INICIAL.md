# PROMPT-INICIAL.md

Prompt com que o projeto foi iniciado. Ficou como registro das fases; **não cole de novo**: o site
já está construído. Para continuar o trabalho, leia `AGENTS.md`.

## Situação das fases (2026-10-06)

| Fase | Situação |
|---|---|
| 0 — Leitura e plano | Feita (`PENDENCIAS.md`, `docs/design-plan.md`) |
| 1 — Fundação | Feita |
| 2 — Dados e componentes | Feita |
| 3 — Páginas | Feita, com mudança do cliente: **página única**. Existem a home, as 20 páginas de curso, as políticas e a 404. **Não** existem catálogo (`/cursos`), `/sobre` nem `/contato` |
| 4 — Blog | **Cancelada** pelo cliente |
| 5 — Qualidade e deploy | Feita só para **demonstração** (`vercel.json` com `noindex` em `*.vercel.app`). O checklist de lançamento de `docs/07` ainda não foi cumprido |

O texto abaixo é o original.

## Como começar

1. Crie a pasta do projeto e copie este kit para dentro dela (mantendo `CLAUDE.md`, `docs/`, `design/` e `.claude/`).
2. Coloque os arquivos de identidade em `design/` (veja `design/LEIA-ME.md`). Inclua o print da área de membros em `design/referencias/`.
3. Abra o Claude Code na raiz da pasta e cole o prompt abaixo.
4. Confira em docs.claude.com como o Claude Code carrega skills de projeto (`.claude/skills/`), caso a versão que você usa tenha mudado.

## Prompt para colar no Claude Code

```
Você vai construir o site do Seminário Teológico APRISCO em Astro. 
Comece lendo, nesta ordem, tudo o que está na pasta /design e depois CLAUDE.md e os arquivos de /docs (01 a 07). Use as skills "seo-astro" e "design-aprisco" em todo o trabalho.

Regras: não invente nenhum dado factual (preços, garantia, certificado, professores, depoimentos, carga horária). Use [PREENCHER: ...] e registre em PENDENCIAS.md. O site não processa pagamento: todo botão de compra aponta para a Kiwify, com os links centralizados em src/data/cursos.ts.

FASE 0 — Leitura e plano (não escreva código de página ainda)
1. Leia /design inteira e liste o que encontrou e o que falta.
2. Resuma em até 10 linhas o que entendeu do projeto.
3. Faça as perguntas em aberto de docs/01-PROJETO.md que ainda impedem o trabalho (no máximo as 5 mais importantes, em uma única mensagem).
4. Crie PENDENCIAS.md e docs/design-plan.md (paleta, tipografia, layout em ASCII da home e da página de curso, princípios), com a revisão contra o visual genérico descrita em docs/05-DESIGN.md.
Pare e espere minha aprovação do plano antes da Fase 1.

FASE 1 — Fundação
- Inicializar o projeto Astro (confira a documentação atual para o comando de criação), TypeScript estrito, @astrojs/sitemap.
- astro.config.mjs com `site` (use um domínio placeholder até definirmos) e trailingSlash consistente.
- src/styles/tokens.css, reset.css e global.css a partir de /design.
- layouts/Base.astro completo (head com SEO, Open Graph, Twitter, skip link), components/JsonLd.astro, Header, Footer.
- public/robots.txt, favicons e imagem Open Graph padrão.
Critério de pronto: build limpo; uma página de teste valida em HTML e passa Lighthouse mobile ≥ 90.

FASE 2 — Dados e componentes de venda
- src/data/site.ts, trilhas.ts e cursos.ts com o catálogo de docs/06-CONTEUDO.md (links Kiwify vazios e status "em-breve" onde não houver link).
- Componentes: Hero, CursoCard, TrilhaSection, CtaButton, Faq (details/summary), Breadcrumbs.
Critério de pronto: nenhum link de compra fora de CtaButton/cursos.ts.

FASE 3 — Páginas
- Home (/), catálogo (/cursos), página de curso (/cursos/[slug] gerada de cursos.ts), /sobre, /contato, /politica-de-privacidade, /termos-de-uso, 404.
- Cada página com title, description, canonical, JSON-LD corretos e outline de títulos de docs/04-HTML-SEMANTICO.md.
Critério de pronto: checklist de SEO por página (docs/03-SEO.md) marcado em todas.

FASE 4 — Blog
- Content collections (siga a documentação da versão instalada do Astro), layout de artigo, listagem, BlogPosting em JSON-LD e 1 artigo-modelo (marcado como rascunho para revisão do cliente).
- Links internos artigo → curso.

FASE 5 — Qualidade e deploy
- vercel.json (redirects e cabeçalhos), revisão de acessibilidade (teclado, contraste, reduced motion), capturas em 375/768/1280 px com crítica, Lighthouse mobile, varredura de links.
- Checklist de lançamento de docs/07-DEPLOY-E-QUALIDADE.md. Liste o que ainda depende de mim.

Ao fim de cada fase: rode npm run build, resuma o que foi feito, o que ficou pendente e o que precisa da minha decisão. Nunca avance de fase sem eu aprovar.
```

## Dicas de uso

- **Uma fase por vez.** Aprove o plano de design (Fase 0) antes de deixar o Claude Code construir; é mais barato ajustar o plano do que o código.
- **Mantenha `PENDENCIAS.md` aberto** e vá preenchendo com o cliente. Ele é a ponte entre você e seu amigo.
- **Imagens primeiro:** quanto melhor o material em `design/` (logo em SVG, capas em alta resolução, foto do professor), melhor o resultado.
- **Mudou o catálogo?** Edite só `src/data/cursos.ts`; páginas, cards e sitemap se atualizam sozinhos.
- Se o Claude Code propuser trocar de stack, adicionar muitas dependências ou criar login/carrinho, lembre-o das regras de `CLAUDE.md`.
