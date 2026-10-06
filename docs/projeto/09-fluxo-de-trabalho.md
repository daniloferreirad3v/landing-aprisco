# 09 — Fluxo de trabalho e verificação

## Como o cliente trabalha

- Pede **uma alteração por vez**, com o texto exato quando é copy. Às vezes manda print com a
  área marcada.
- Confere no navegador dele (dev server na porta 4321, que **ele** sobe) e só então pede commit.
- **Commits separados por assunto.** Mensagem em português: título curto no imperativo e corpo
  dizendo o que mudou e por quê (pedido do cliente, achado de revisão etc.).
- **Nunca dar push.** Ele dá o push quando quer.
- Gosta de ver o motivo das escolhas, mas em linguagem direta. Pergunta "dá pra melhorar?" e espera
  uma recomendação, não um leque de opções.
- `docs/design-plan.md` só recebe decisões **definitivas** (experimentos visuais não são
  registrados até ele aprovar).
- Quando o pedido for ambíguo, faça a leitura mais provável, mostre o resultado e diga em uma linha
  qual outra leitura existe.

## Antes de dizer que terminou

1. `npm run build` — sem erros nem avisos.
2. `npm run check` — 0 erros, 0 avisos, 0 hints.
3. **Conferência visual** em 375 px (celular) e em desktop (1366 px); quando mexer em layout,
   também 320, 768 e 1024. Sem rolagem horizontal em nenhuma largura.
4. **SEO**: cada página com `<title>` único (≤ 65 caracteres), description de 120 a 165 caracteres,
   canonical, um `h1`, JSON-LD válido, imagens com `alt`/`width`/`height`, nenhum link interno
   quebrado (inclusive âncoras `#...`).
5. **Contraste** medido quando mudar cor ou pôr texto sobre imagem.
6. **Dados**: nenhum valor inventado; todo `[PREENCHER]` novo registrado no `PENDENCIAS.md`.
7. Atualizar o `PENDENCIAS.md` quando algo for resolvido ou surgir.
8. Encerrar qualquer servidor que tenha subido.

Não há testes automatizados nem script de auditoria no repositório: as checagens dos itens 3 a 5
foram feitas com Playwright (Chrome) e scripts avulsos, fora do projeto. Se for criar um script
permanente, não adicione dependência sem combinar com o cliente.

## Ferramentas úteis do repositório

- `.claude/skills/design-aprisco/SKILL.md`: checklist de decisões visuais (contraste, motion,
  anti-padrões genéricos).
- `.claude/skills/seo-astro/SKILL.md`: checklist de SEO por página.
- `docs/03-SEO.md`, seção "Checklist de SEO por página".
- `docs/07-DEPLOY-E-QUALIDADE.md`: checklist de lançamento (ainda não cumprido).
