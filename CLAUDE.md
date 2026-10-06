# CLAUDE.md — Site do Seminário Teológico APRISCO

Este é o ponto de entrada do projeto. Leia este arquivo inteiro antes de qualquer ação.

> O retrato detalhado do site como ele está hoje fica em [AGENTS.md](AGENTS.md) e em
> [docs/projeto/](docs/projeto/README.md). Em caso de conflito, valem esses e o código.

## O que estamos construindo

Um site estático em **Astro** para o Seminário Teológico APRISCO, com duas funções:

1. **Landing page de vendas em página única** (`/`), que apresenta a escola, a assinatura e o catálogo de cursos. A navegação é por âncoras (`#sobre`, `#cursos`, `#duvidas`).
2. **Uma página por curso** (`/cursos/<slug>`), otimizada para aparecer no Google, com botão que leva ao checkout da **Kiwify**.

A venda é por **assinatura** (anual em destaque, mensal em segundo plano), que dá acesso a todos os cursos. Não há blog, catálogo separado, página de sobre nem de contato.

O site **não processa pagamento, não tem login e não guarda dados de alunos**. Compra, e-mail de entrega, área de membros, nota fiscal e suporte de reembolso ficam todos na Kiwify. O site é a vitrine; a Kiwify é o caixa.

## Ordem de leitura obrigatória

Leia nesta ordem antes de escrever código:

1. `AGENTS.md` e `docs/projeto/` — estado atual do site, decisões do cliente e armadilhas.
2. `PENDENCIAS.md` — o que falta, por prioridade.
3. `docs/01-PROJETO.md` — contexto, público, objetivos.
4. `docs/02-ESTRUTURA.md` — pastas, rotas, componentes.
5. `docs/03-SEO.md` — SEO técnico, de conteúdo e dados estruturados.
6. `docs/04-HTML-SEMANTICO.md` — tags semânticas, hierarquia de títulos, acessibilidade.
7. `docs/05-DESIGN.md` e `docs/design-plan.md` — direção visual e processo de design.
8. `docs/06-CONTEUDO.md` — seções, catálogo de cursos e regras de copy.
9. `docs/07-DEPLOY-E-QUALIDADE.md` — Vercel, domínio, checklist de lançamento.

A pasta `/design` é a identidade de origem (peças do Canva, capas, logo, prints): consulte, mas **nunca altere**. A cor primária do site mudou por decisão do cliente (roxo, não o coral das peças); os valores em uso estão em `src/styles/tokens.css`. `PROMPT-INICIAL.md` é o registro das fases de construção.

## Skills do projeto

Estão em `.claude/skills/`:

- `seo-astro` — use em toda página, componente de head ou dado estruturado.
- `design-aprisco` — use em toda decisão visual (cores, tipografia, layout, motion).

## Regras inegociáveis

1. **Nunca invente conteúdo factual.** Preço, parcelamento, garantia, certificado, carga horária, nome de professor, número de alunos, depoimento, data de turma, credenciamento. Se não estiver nos documentos, escreva `[PREENCHER: o que falta]` de forma visível no texto e registre em `PENDENCIAS.md`.
2. **Nada de avaliações falsas.** Não use `Review` nem `AggregateRating` em dados estruturados sem avaliações reais e verificáveis.
3. **Conteúdo teológico é do cliente.** Você estrutura e redige a partir do material que ele fornecer. Não afirme posições doutrinárias por conta própria. Em dúvida, sinalize para revisão.
4. **Todo link de compra vem de um único arquivo** (`src/data/cursos.ts`). Nunca espalhe URLs da Kiwify pelos componentes.
5. **HTML semântico primeiro**, CSS depois, JavaScript só se for indispensável. Meta: zero JS no cliente na maioria das páginas.
6. **Acessibilidade é requisito**, não extra: contraste, foco visível, `prefers-reduced-motion`, textos alternativos.
7. **Todo texto visível em português do Brasil** (`lang="pt-BR"`), em linguagem acolhedora e clara.
8. **Não adicione dependências** sem justificar. Hoje: Astro + `@astrojs/sitemap` + `@astrojs/check`. Sem bibliotecas de UI.

## Stack

- Astro 7 (confirme APIs em docs.astro.build antes de usar algo novo; elas mudam entre versões).
- TypeScript no modo estrito para dados e componentes.
- CSS com variáveis (design tokens) e estilos escopados do Astro. Sem framework de CSS, a menos que o projeto decida o contrário.
- Imagens com `astro:assets`. Fontes hospedadas localmente.
- Deploy na Vercel (hoje só demonstração, no plano gratuito; para vender, plano Pro, por ser uso comercial).

## Comandos

```bash
npm run dev       # desenvolvimento
npm run build     # gera /dist (deve passar sem erros nem avisos)
npm run check     # astro check (TypeScript estrito; deve dar 0 erros)
npm run preview   # testa o build local
```

## Definição de pronto (para qualquer tarefa)

- [ ] `npm run build` passa e `npm run check` dá 0 erros.
- [ ] HTML validado: um `<h1>` por página, hierarquia sem pulos, landmarks corretos.
- [ ] `title`, `description`, canonical e Open Graph únicos na página.
- [ ] Imagens com `alt`, `width` e `height`.
- [ ] Teste em 375 px de largura (celular) e em desktop.
- [ ] Nenhum dado inventado; pendências registradas.
