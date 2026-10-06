# 03 — A home, seção por seção

Arquivo: `src/pages/index.astro`. Página única de vendas: o menu (Cursos, Sobre, Dúvidas) rola até
as âncoras. Os textos marcados como "do cliente" foram enviados por ele e não devem ser reescritos
sem pedido (só ajustes de grafia: maiúsculas no meio da frase, "APRISCO" em caixa-alta).

Outline de títulos: `h1` (topo) → um `h2` por seção → `h3` nas trilhas, passos e planos → `h4` nos
cursos da vitrine.

| # | Seção | Âncora | Fundo |
|---|---|---|---|
| 1 | Topo (hero) | — | preto `#000` |
| 2 | Por que escolher a APRISCO? | — | faixa `#161618` |
| 3 | Uma fé rasa, uma vida rasa | `#sobre` | `#09090B` |
| 4 | O que a assinatura inclui | — | `#09090B` |
| 5 | Escolha por onde começar (vitrine) | `#cursos` | `#09090B` |
| 6 | Como funciona | — | faixa `#161618` |
| 7 | Acesso a todos os cursos (planos) | `#assinatura` | `#09090B` |
| 8 | Dúvidas antes de assinar | `#duvidas` | `#09090B` |
| 9 | Fechamento | — | preto `#000` |

## 1. Topo (`Hero` + `AssinaturaMarca` + `MuralCapas`)

- Assinatura da marca ("SEMINÁRIO TEOLÓGICO / APRISCO" + cordeiro), em SVG com as fontes reais.
- `h1`: "Estude teologia de maneira profunda e descomplicada."
- Parágrafo (do cliente): "Para conhecer a Deus, fortalecer sua fé e servir com excelência à
  Igreja de Cristo." (Começava repetindo o título; o trecho repetido foi retirado.)
- **Sem botão e sem preço** no topo (pedido do cliente).
- Mural: três colunas de capas reais, desencontradas, que sobem ao carregar e "respiram" devagar.
  - **Desktop:** mural à direita do texto.
  - **Celular:** o mural vira **fundo** da primeira tela, com o texto por cima, um véu preto mais
    forte à esquerda e o parágrafo em creme. O pior pixel atrás do texto mede 4,97:1. Se mexer no
    véu ou na opacidade, meça de novo.

## 2. Por que escolher a APRISCO?

Quatro frases do cliente em litania ("A APRISCO capacita…", "treina…", "prepara…", "levanta…").
A repetição é proposital (anáfora). Sem ícone, sem card, sem fio: o espaço organiza.
Desktop: título à esquerda; frases e botão numa coluna à direita. Celular: título, frases e botão.
Botão: **QUERO COMEÇAR AGORA** (variante `suave`).

## 3. Uma fé rasa, uma vida rasa (`#sobre`)

Título grande em duas linhas, revelado de baixo para cima (a única revelação "em linha" da página).
Ao lado: "Teologia Clássica e Sólida aplicada aos dilemas da Atualidade. Aprenda a pregar a Bíblia
para os dias de hoje!" e o parágrafo sobre cosmovisão cristã (textos do cliente).
Botão: **QUERO COMEÇAR MEUS ESTUDOS AGORA** (variante `suave`).

## 4. O que a assinatura inclui

Quatro itens com ✓ (textos do cliente): Todos os cursos do Catálogo (com "+80 aulas", número do
cliente, manter atualizado), Cursos Novos sem Custo extra, Estudo On-line, Assinatura Simples.
Botão: **ASSINAR AGORA**.

## 5. Escolha por onde começar (`#cursos`)

Uma `TrilhaSection` por trilha (5), com `compacto` (só capa e nome), `link={false}` (as capas da
home **não** são links — decisão do single page) e `emais` (card "E mais" no fim da fileira, para a
fileira não parecer acabar). Celular: fileira com rolagem horizontal. Desktop: grade de 6 colunas.
Nenhuma capa é prioritária (`eager`): a vitrine fica longe do topo.

## 6. Como funciona

Quatro passos numerados (é uma sequência real), em 2 colunas a partir de 48rem:
1. Clique em "ASSINAR AGORA" — vai direto para a página de pagamento.
2. Finalize o pagamento — processado pela Kiwify.
3. Acesso à área de membros — por e-mail; app da Kiwify com o mesmo e-mail.
4. Estude no seu Ritmo.

## 7. Planos (`Planos`, `#assinatura`)

Título "Acesso a todos os cursos" e texto de apoio do cliente, centralizados no desktop.
- **Card anual, grande:** borda roxa, selo "Melhor custo" (só aparece se a parcela for menor que o
  mensal — é calculado), "12x de R$ 19,86" em destaque, "ou R$ 192 à vista" menor, botão
  **ASSINAR AGORA** e as fichas de pagamento (Visa, Mastercard, Elo, Pix).
- **Card mensal, pequeno:** R$ 37 por mês, "Pagamento mês a mês, cancele quando quiser.", botão
  **ASSINAR** (variante `secundario`, leva ao checkout mensal).
- Nota: "Pagamento processado pela Kiwify…".
- O total a prazo (R$ 238,32) **não** aparece no card, por decisão do cliente; está no FAQ.
  Pendência jurídica no `PENDENCIAS.md`.

## 8. Dúvidas antes de assinar (`#duvidas`)

`Faq` com as 9 perguntas de `src/data/faq.ts` (textos definitivos do cliente). `<details>` sem
JavaScript; a resposta abre deslizando.

## 9. Fechamento

Cordeiro, `h2` "Construa uma vida profunda a partir do conhecimento de Deus." e o botão
**ASSINAR AGORA**. Sem linha de preço (retirada pelo cliente). Usa `revela--cedo` para aparecer por
inteiro mesmo em telas altas (ver [06-visual-e-animacoes.md](06-visual-e-animacoes.md)).

## Cabeçalho e rodapé (todas as páginas)

- **Cabeçalho fixo:** só o cordeiro (sem o nome, pedido do cliente) e o menu. No celular, menu em
  `<details>`.
- **Rodapé:** marca + frase; navegação em duas colunas (Início e Cursos | Sobre e Dúvidas); linha de
  base com o copyright "© 2026 Seminário Teológico APRISCO · Todos os direitos reservados" à
  esquerda e, à direita, o selo "Pagamento 100% seguro", Política de privacidade e Termos de uso
  (sem sublinhado). O CNPJ entra sozinho no fim do copyright quando for preenchido em `site.ts`.
