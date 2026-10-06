# CLAUDE.md — Site do Seminário Teológico APRISCO

Este é o ponto de entrada do projeto. Leia este arquivo inteiro antes de qualquer ação.

> **Estado atual do site:** este arquivo é o briefing original do kit e continua valendo nas
> regras inegociáveis e na definição de pronto. O que mudou desde então (página única, sem blog,
> roxo no lugar do coral, sem contato) está em [AGENTS.md](AGENTS.md) e em
> [docs/projeto/](docs/projeto/README.md). Em caso de conflito, valem esses e o código.

## O que estamos construindo

Um site estático em **Astro** para o Seminário Teológico APRISCO, com duas funções:

1. **Landing page de vendas / site institucional** que apresenta a escola e o catálogo de cursos.
2. **Uma página por curso**, otimizada para aparecer no Google, com botão que leva ao checkout da **Kiwify**.

O site **não processa pagamento, não tem login e não guarda dados de alunos**. Compra, e-mail de entrega, área de membros, nota fiscal e suporte de reembolso ficam todos na Kiwify. O site é a vitrine; a Kiwify é o caixa.

## Ordem de leitura obrigatória

Leia nesta ordem e não escreva código antes de terminar:

1. **`/design` (a pasta inteira)** — identidade visual oficial. Veja `design/LEIA-ME.md`. Se a pasta estiver vazia ou faltar logo/paleta/fontes, **pare e pergunte** em vez de inventar.
2. `docs/01-PROJETO.md` — contexto, público, objetivos, perguntas em aberto.
3. `docs/02-ESTRUTURA.md` — pastas, rotas, componentes.
4. `docs/03-SEO.md` — SEO técnico, de conteúdo e dados estruturados.
5. `docs/04-HTML-SEMANTICO.md` — tags semânticas, hierarquia de títulos, acessibilidade.
6. `docs/05-DESIGN.md` — direção visual e processo de design.
7. `docs/06-CONTEUDO.md` — seções, catálogo de cursos e regras de copy.
8. `docs/07-DEPLOY-E-QUALIDADE.md` — Vercel, domínio, checklist de lançamento.
9. `PROMPT-INICIAL.md` — fases de execução.

## Skills do projeto

Estão em `.claude/skills/`:

- `seo-astro` — use em toda página, componente de head, dado estruturado ou conteúdo de blog.
- `design-aprisco` — use em toda decisão visual (cores, tipografia, layout, motion).

## Regras inegociáveis

1. **Nunca invente conteúdo factual.** Preço, parcelamento, garantia, certificado, carga horária, nome de professor, número de alunos, depoimento, data de turma, credenciamento. Se não estiver nos documentos, escreva `[PREENCHER: o que falta]` de forma visível no texto e registre em `PENDENCIAS.md`.
2. **Nada de avaliações falsas.** Não use `Review` nem `AggregateRating` em dados estruturados sem avaliações reais e verificáveis.
3. **Conteúdo teológico é do cliente.** Você estrutura e redige a partir do material que ele fornecer. Não afirme posições doutrinárias por conta própria. Em dúvida, sinalize para revisão.
4. **Todo link de compra vem de um único arquivo** (`src/data/cursos.ts`). Nunca espalhe URLs da Kiwify pelos componentes.
5. **HTML semântico primeiro**, CSS depois, JavaScript só se for indispensável. Meta: zero JS no cliente na maioria das páginas.
6. **Acessibilidade é requisito**, não extra: contraste, foco visível, `prefers-reduced-motion`, textos alternativos.
7. **Todo texto visível em português do Brasil** (`lang="pt-BR"`), em linguagem acolhedora e clara.
8. **Não adicione dependências** sem justificar. Preferência: Astro + `@astrojs/sitemap` + (se houver blog) MDX/content collections. Sem bibliotecas de UI.

## Stack

- Astro (versão estável atual; confirme em docs.astro.build, porque APIs como content collections mudam entre versões).
- TypeScript no modo estrito para dados e componentes.
- CSS com variáveis (design tokens) e estilos escopados do Astro. Sem framework de CSS, a menos que o projeto decida o contrário.
- Imagens com `astro:assets`. Fontes hospedadas localmente.
- Deploy na Vercel (plano Pro, por ser uso comercial).

## Comandos

```bash
npm run dev       # desenvolvimento
npm run build     # gera /dist (deve passar sem erros nem avisos)
npm run preview   # testa o build local
```

## Definição de pronto (para qualquer tarefa)

- [ ] `npm run build` passa.
- [ ] HTML validado: um `<h1>` por página, hierarquia sem pulos, landmarks corretos.
- [ ] `title`, `description`, canonical e Open Graph únicos na página.
- [ ] Imagens com `alt`, `width` e `height`.
- [ ] Teste em 375 px de largura (celular) e em desktop.
- [ ] Nenhum dado inventado; pendências registradas.
