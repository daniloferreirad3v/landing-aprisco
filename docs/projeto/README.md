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

O repositório nasceu de um kit de documentação (briefing). Ele continua no repositório como
contexto, mas **foi superado em vários pontos**. Quando houver conflito, vale esta pasta e o código.

| Documento | Situação |
|---|---|
| `CLAUDE.md` (raiz) | Regras inegociáveis e definição de pronto **continuam valendo**. A "ordem de leitura" e a menção a blog são do plano original |
| `PROMPT-INICIAL.md` (raiz) | Fases de execução do kit. Fases 0 a 3 feitas; a Fase 4 (blog) foi **cancelada**; a Fase 5 (deploy) foi feita só para demonstração |
| `docs/01-PROJETO.md` | Contexto e público continuam válidos. Desatualizado: catálogo e páginas separadas de Sobre/Contato, curso FLM |
| `docs/02-ESTRUTURA.md` | Desatualizado em rotas (não há `/cursos`, `/sobre`, `/contato`, `/blog`). Ver [02-arquitetura.md](02-arquitetura.md) |
| `docs/03-SEO.md` | Princípios e checklist **continuam valendo**. Ignorar o que fala de blog, catálogo e `ItemList` |
| `docs/04-HTML-SEMANTICO.md` | Regras **continuam valendo**. O esqueleto da home mudou (ver [03-home.md](03-home.md)) |
| `docs/05-DESIGN.md` | Processo e princípios valem. A cor de acento mudou de coral para roxo |
| `docs/06-CONTEUDO.md` | Regras de copy valem. Estrutura da home, trilha "Treinamento e capacitação" e FLM foram superadas |
| `docs/07-DEPLOY-E-QUALIDADE.md` | Checklist de lançamento **continua valendo** e ainda não foi cumprido |
| `docs/design-plan.md` | Plano de design vivo: paleta e tipografia estão atualizadas. Os wireframes e as seções 9 e 11 são do plano original (ex.: botão no topo, que saiu) |
| `design/` | Identidade visual de origem (peças do Canva, capas, prints). **Nunca alterar** |
| `.claude/skills/` | Skills do Claude Code (`design-aprisco`, `seo-astro`). Úteis como checklist para qualquer agente |
