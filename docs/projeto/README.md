# Documentação do projeto — estado atual

Esta pasta descreve o site **como ele é hoje** (revisado em 2026-10-06). Foi escrita para que
outro agente de IA ou outra pessoa consiga continuar o trabalho sem reconstruir o histórico da
conversa. O ponto de entrada geral é o [AGENTS.md](../../AGENTS.md), na raiz.

## Ordem de leitura

| # | Documento | Para que serve |
|---|---|---|
| 1 | [01-visao-geral.md](01-visao-geral.md) | O que é o site, o modelo de venda, o fluxo de compra e o que ele não faz |
| 2 | [02-arquitetura.md](02-arquitetura.md) | Stack, pastas, rotas, como os dados viram páginas, SEO e deploy |
| 3 | [03-home.md](03-home.md) | A home seção por seção, com textos, botões e destinos |
| 4 | [04-componentes.md](04-componentes.md) | Cada componente: props, comportamento e cuidados |
| 5 | [05-dados-e-conteudo.md](05-dados-e-conteudo.md) | Os arquivos de dados e as receitas mais comuns (preço, link, curso, FAQ) |
| 6 | [06-visual-e-animacoes.md](06-visual-e-animacoes.md) | Cores, tipografia, layout, animações e acessibilidade |
| 7 | [07-decisoes.md](07-decisoes.md) | Por que as coisas estão como estão: decisões do cliente, em ordem |
| 8 | [08-armadilhas.md](08-armadilhas.md) | Problemas técnicos que já aconteceram e como evitar |
| 9 | [09-fluxo-de-trabalho.md](09-fluxo-de-trabalho.md) | Como o cliente trabalha e como verificar uma alteração antes de entregar |

O que falta fazer não está aqui: fica no [PENDENCIAS.md](../../PENDENCIAS.md), na raiz.

## Relação com os outros documentos

O repositório nasceu de um kit de documentação (briefing). Esses documentos foram **revisados em
2026-10-06** para refletir o site atual e continuam valendo como regras e referência. Esta pasta é o
retrato detalhado; em caso de conflito, vale esta pasta e o código.

| Documento | Papel |
|---|---|
| `CLAUDE.md` (raiz) | Regras inegociáveis, stack e definição de pronto (lido automaticamente pelo Claude Code) |
| `AGENTS.md` (raiz) | Ponto de entrada para qualquer agente de IA |
| `PENDENCIAS.md` (raiz) | O que falta, por prioridade |
| `PROMPT-INICIAL.md` (raiz) | Registro das fases de construção (não colar de novo) |
| `docs/01-PROJETO.md` | Contexto, público, objetivos, perguntas ao cliente e respostas |
| `docs/02-ESTRUTURA.md` | Pastas, rotas e o modelo de dados de `cursos.ts` |
| `docs/03-SEO.md` | Princípios de SEO, `<head>`, JSON-LD, performance e checklist por página |
| `docs/04-HTML-SEMANTICO.md` | Landmarks, outline de títulos, links, imagens e acessibilidade |
| `docs/05-DESIGN.md` | Processo de design, direção por seção, botões e motion |
| `docs/06-CONTEUDO.md` | Catálogo com as chamadas, estrutura das páginas e regras de copy |
| `docs/07-DEPLOY-E-QUALIDADE.md` | Vercel, domínio e checklist de lançamento (ainda não cumprido) |
| `docs/design-plan.md` | Plano de design em uso: paleta, tipografia, layout, wireframes e princípios |
| `design/` | Identidade de origem (peças do Canva em coral, capas, prints). **Nunca alterar** |
| `.claude/skills/` | Skills `design-aprisco` e `seo-astro`: checklists que o Claude Code carrega sozinho |
