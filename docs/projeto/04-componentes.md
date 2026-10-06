# 04 — Componentes

Todos em `src/components/`. Estilos escopados no próprio arquivo; valores visuais vêm de
`src/styles/tokens.css`.

## Compra

### `CtaButton.astro` — o único gerador de link de compra

| Prop | Tipo | Padrão | Uso |
|---|---|---|---|
| `plano` | `'anual' \| 'mensal'` | — | abre o checkout daquele plano |
| `destino` | `string` | — | navegação interna (ex.: `#assinatura`), **sem** checkout |
| `curso` | `string` (slug) | — | só para medição (`data-curso`) |
| `variante` | `principal \| secundario \| suave \| link` | `principal` | aparência |
| `largura` | `auto \| total` | `auto` | `total` ocupa a largura do card |

Regras de destino:
- **Sem `plano` e sem `destino` → checkout ANUAL** (pedido do cliente: todo botão de compra leva ao
  anual). Botões novos herdam isso.
- Se o link do plano em `cursos.ts` for `''`, o botão vira "Falar no WhatsApp" (se houver WhatsApp
  em `site.ts`) ou "Assinatura indisponível no momento".
- É sempre `<a>`, mesma aba, `rel="noopener"` no externo. Atributos `data-cta`, `data-plano`,
  `data-curso` prontos para analytics.

Variantes:
- `principal`: roxo `#4C059E`, texto branco; hover clareia para `#7C3AED`. Tem o **brilho** animado.
- `suave`: mesma cor, letra menor e mais espaçada (os "QUERO COMEÇAR…"). Também tem o brilho.
- `secundario`: contorno creme, fundo transparente (botão "ASSINAR" do mensal). Sem brilho.
- `link`: aparência de link sublinhado, alvo de toque de 44 px.

### `Planos.astro` — seção de assinatura (`#assinatura`)

Props: `titulo` (padrão "Acesso a todos os cursos"), `curso` (slug, nas páginas de curso),
`variante` (`completa` na home, `compacta` nas páginas de curso). Card anual grande, card mensal
pequeno. Valores via `getPlano`, `ofertaDestaque`, `formatarNumero`, `formatarReais`.

### `FormasPagamento.astro`

Fichas brancas com Visa, Mastercard, Elo e Pix, desenhadas em SVG no próprio arquivo (sem imagem
externa). Lista com `aria-label="Formas de pagamento"`; cada marca com nome acessível. Hoje só
aparece no card anual. Boleto não aparece porque o checkout não oferece (ver `PENDENCIAS.md`).

## Vitrine

### `TrilhaSection.astro`

Props: `trilha`, `nivel` (`h2`/`h3`, título da trilha), `prioridade` (as 2 primeiras capas com
`eager`; **não usar na home**), `compacto`, `link`, `emais`. No celular a fileira rola na horizontal
(`min-width: 0` no container evita que ela alargue a página). Com `emais`, acrescenta o card
"E mais" (só título e texto, sem link).

### `CursoCard.astro`

Props: `curso`, `nivel` (`h3`/`h4`), `prioridade`, `compacto` (só capa e nome), `link` (`false` na
home). A área de clique cobre o card inteiro (`a::after`), sem links aninhados. A capa tem
`alt=""` porque o nome vem logo abaixo em texto. Hover/foco: a capa sobe 6 px e aparece uma linha
roxa sob ela. **Não** mostra selo "Em preparação" (retirado pelo cliente).

## Topo e marca

### `Hero.astro`

Props: `titulo` (vira o `h1`), `id`. Slots: `marca` (assinatura acima do título), padrão (subtítulo),
`acoes` (botões; hoje não usado na home), `visual` (à direita; sem ele, mostra o cordeiro). Entrada
orquestrada ao carregar (assinatura → título → subtítulo), desligada com movimento reduzido. Com
`visual`, no celular o visual vira fundo da primeira tela (ver [03-home.md](03-home.md)).

### `MuralCapas.astro`

Três colunas de capas reais, `aria-hidden`, `loading="eager"` (está na primeira tela). Sobem ao
carregar e derivam devagar sem parar.

### `AssinaturaMarca.astro`

Lockup "SEMINÁRIO TEOLÓGICO / APRISCO" em SVG com `textLength` (as duas linhas têm a mesma largura
em qualquer tela) + cordeiro. O nome também vai em texto para leitor de tela. Menor no celular.

### `Logo.astro`

Prop `soSelo` (cabeçalho: só o cordeiro; o nome fica para leitor de tela). O cordeiro é
`<svg><use href="/logo/cordeiro-selo-branco.svg#selo">`, **não** `<img>`: o cabeçalho é fixo e,
com a página rolada, a auditoria do Astro lia o `<img>` como "abaixo da dobra". O arquivo SVG tem
um `<g id="selo">` para isso.

## Navegação e estrutura

- **`Header.astro`**: cabeçalho fixo (`sticky`). Menu do desktop em lista; no celular,
  `<details>`/`<summary>` com um script mínimo que fecha o menu ao tocar num link.
- **`Footer.astro`**: ver [03-home.md](03-home.md#cabeçalho-e-rodapé-todas-as-páginas).
- **`Breadcrumbs.astro`**: recebe os itens **sem** "Início" (ele acrescenta) e gera o visível e o
  JSON-LD `BreadcrumbList` da mesma lista.

## Conteúdo e utilitários

- **`Faq.astro`**: props `itens`, `titulo`, `id`. `<details>` animado com `::details-content`
  (abre direto onde não há suporte). Item com `lista` vira `<ul>` (usado em "Quanto custa?").
- **`Preencher.astro`**: `<Preencher oque="..." />` → `[PREENCHER: ...]` visível, com borda
  tracejada âmbar. Todo uso precisa constar no `PENDENCIAS.md`.
- **`JsonLd.astro`**: `<script type="application/ld+json">` com `<` escapado.
