# AGENTS.md — Site do Seminário Teológico APRISCO

Ponto de entrada para qualquer agente de IA (ou pessoa) que vá trabalhar neste repositório.
Leia este arquivo inteiro antes de mexer em qualquer coisa.

## Em uma frase

Site estático em **Astro** que vende a assinatura do Seminário Teológico APRISCO (cursos online de
teologia). A home é uma **página única de vendas**; há uma página por curso para o Google. Toda
compra acontece na **Kiwify** (checkout externo): o site não processa pagamento, não tem login e
não guarda dados de alunos.

## Ordem de leitura

1. **Este arquivo** — regras e armadilhas que mais causam erro.
2. **[docs/projeto/README.md](docs/projeto/README.md)** — índice da documentação do estado atual.
3. **[PENDENCIAS.md](PENDENCIAS.md)** — o que falta, por prioridade.
4. Conforme a tarefa: `CLAUDE.md` (regras e definição de pronto), `docs/01` a `07` (projeto,
   estrutura, SEO, HTML semântico, design, conteúdo, deploy) e `docs/design-plan.md`. Todos
   revisados em 2026-10-06 para o site atual; o mapa está em `docs/projeto/README.md`.

## Comandos

```bash
npm run dev       # servidor de desenvolvimento (porta 4321)
npm run build     # gera /dist; precisa passar sem erros nem avisos
npm run check     # astro check (TypeScript estrito); precisa dar 0 erros
npm run preview   # serve o /dist
```

Node >= 22.12. Sem testes automatizados: a verificação é build + check + conferência visual
(ver [docs/projeto/09-fluxo-de-trabalho.md](docs/projeto/09-fluxo-de-trabalho.md)).

## Regras inegociáveis

1. **Nunca invente conteúdo factual** (preço, parcela, garantia, certificado, carga horária,
   professor, número de alunos, depoimento, credenciamento). O que falta vira
   `<Preencher oque="..." />` (aparece como `[PREENCHER: ...]`) e entra no `PENDENCIAS.md`.
2. **Nada de avaliações falsas**: sem `Review`/`AggregateRating` no JSON-LD.
3. **Conteúdo teológico é do cliente.** Não afirme posições doutrinárias; use o texto enviado.
4. **Todo link de compra vem de `src/data/cursos.ts`** e é gerado pelo componente
   `CtaButton.astro`. Nunca escreva URL da Kiwify em outro lugar.
5. **Preços nunca são digitados em texto**: vêm de `cursos.ts` (`formatarReais`, `ofertaDestaque`).
6. HTML semântico, CSS com tokens, JavaScript só se indispensável (hoje: só o fechamento do menu
   do celular).
7. Acessibilidade é requisito: contraste ≥ 4,5:1 em texto, foco visível,
   `prefers-reduced-motion`, alvos de toque ≥ 44 px.
8. Todo texto visível em **português do Brasil**.
9. Não adicione dependências sem justificar (hoje: só `astro`, `@astrojs/sitemap`, `@astrojs/check`).

## Como o cliente trabalha (importante)

- Pede uma alteração por vez, olha no navegador e só então pede commit.
- **Commits separados por assunto**, mensagem em português, e **sem push** (ele mesmo dá o push;
  o VS Code dele às vezes faz push automático — não é você).
- **Não deixe servidores rodando.** Ele roda `npm run dev` manualmente. Para conferir algo, suba um
  preview numa porta avulsa e encerre ao terminar.
- `docs/design-plan.md` só recebe decisões **definitivas**; experimentos não são registrados.

## Armadilhas que já custaram tempo

Detalhes em [docs/projeto/08-armadilhas.md](docs/projeto/08-armadilhas.md). As principais:

- O minificador de CSS descarta `animation-timeline` se ele estiver junto do shorthand
  `animation:`. Use longhands e a timeline numa regra separada.
- O dev server às vezes serve CSS de componente velho. Antes de dizer "está certo", confira no mesmo
  endereço que o cliente está olhando; se divergir do build, reinicie o dev.
- O roxo da marca `#4C059E` tem 1,7:1 sobre o fundo: só funciona **preenchido**. Texto nunca é roxo.
