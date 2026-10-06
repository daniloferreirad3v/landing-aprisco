# 06 — Visual, animações e acessibilidade

Fonte dos valores: `src/styles/tokens.css`. Nenhuma cor, fonte ou espaço deve ser escrita solta nos
componentes. O raciocínio de design está em `docs/design-plan.md` (paleta e tipografia atualizadas;
wireframes são do plano original).

## Direção

Marca escura, séria e contemplativa: preto, tipografia condensada pesada (Anton) em caixa-alta nos
títulos, o cordeiro como símbolo e um acento roxo usado com contenção. Nada de gradiente decorativo,
cards idênticos com sombra ou rótulos em caixa-alta acima de cada título.

## Cores

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `--cor-preto` | `#000000` | topo, fechamento, cabeçalho, rodapé | — |
| `--cor-fundo` | `#09090B` | fundo geral | — |
| `--cor-superficie` | `#161618` | faixas ("Por que escolher", "Como funciona"), card mensal, "E mais" | — |
| `--cor-texto` | `#F4F1EC` | texto principal (creme) | 17,7:1 |
| `--cor-texto-suave` | `#A3A09B` | apoio, legendas | 7,6:1 |
| `--cor-roxo` | `#4C059E` | **só preenchido**: botões, selo "Melhor custo", skip link | 11,5:1 com branco em cima; **1,7:1 sobre o fundo** |
| `--cor-destaque` | `#7C3AED` | **só traço**: borda do card anual, linha da capa, ✓, números dos passos, foco, sublinhado no hover | 3,5:1 (vale para não-texto e texto grande) |
| `--cor-aviso` | `#E8C27A` | marcador `[PREENCHER]` | 11,8:1 |
| `--cor-fio` | creme a 14% | divisórias | — |

Regras:
- **Texto nunca é roxo.** Links e perguntas do FAQ ficam em creme; o que responde ao mouse é o
  sublinhado roxo ou o ícone.
- Roxo claro/lilás foi recusado pelo cliente ("puxa para o rosa"). Não usar tons mais claros que
  `#7C3AED`.
- Todos os botões de compra usam o mesmo roxo; a variante `suave` se diferencia só pelo tamanho.

## Tipografia

- **Anton** (`--fonte-display`): `h1`, `h2`, assinatura "APRISCO", valores de preço. Caixa-alta.
  Medidas de linha em `em` (não `ch`, que é estreito demais na Anton).
- **Montserrat** (`--fonte-texto`, variável 400–600): todo o resto.
- `@font-face` de reserva ("Montserrat Reserva", Arial com `size-adjust`/`ascent-override`
  calculados do arquivo real) evita o pulo de layout quando a fonte chega (CLS 0).
- Escala: `--fs-mini` 13 · `--fs-pequeno` 15 · `--fs-corpo` 17→18 · `--fs-h4` · `--fs-h3` 22→26 ·
  `--fs-h2` 32→48 · `--fs-h1` 44→88.

## Layout

- `.container` (máx. 75rem; mais largo em telas ≥ 1600×800) + `.secao` (espaço vertical único
  `--espaco-secao`).
- Pontos de quebra usados: `48rem` (tablet) e `64rem` (desktop); `100rem` + altura para telas grandes.
- Celular primeiro; tudo testado de 320 a 2560 px sem rolagem horizontal (`overflow-x: clip` no
  `body`; `min-width: 0` em fileiras roláveis dentro de grid).
- Raio de 4 px em tudo; sem sombras.

## Animações

Todas desligadas com `prefers-reduced-motion: reduce` (regra global em `global.css`).

| Animação | Onde | Como |
|---|---|---|
| Revelação ao rolar | quase todo bloco (`.revela`) | `animation-timeline: view()`; fade + 16 px de subida, linear, da borda de baixo até ~meio da tela (`cover 50%`). `--revela-i` (0, 1, 2…) cria cascata |
| `.revela--linha` | só o título "Uma fé rasa, uma vida rasa" | texto descoberto de baixo para cima (`clip-path`; recorte começa em `-0.35em` para não cortar acento) |
| `.revela--zoom` | cards de planos | leve aproximação |
| `.revela--cedo` | fechamento da home | termina quando o elemento entra inteiro na tela (perto do fim da página não há rolagem para chegar ao meio) |
| Entrada do topo | `Hero` | assinatura → título → subtítulo, 700 ms, ao carregar |
| Mural | `MuralCapas` | colunas sobem ao carregar e derivam devagar, em loop |
| Brilho | botões `principal` e `suave` | faixa larga de luz branca atravessa o botão, vai e volta, ciclo de 13 s; passa **por trás** do texto (`isolation: isolate` + `z-index: -1`) |
| Hover da capa | `CursoCard` | capa sobe 6 px + linha roxa |
| Hover do botão | `CtaButton` | sobe 2 px; afunda ao clicar |
| FAQ / menu | `Faq`, `Header` | abrir desliza (resposta a uma ação) |

Navegador sem `animation-timeline` (ex.: Firefox): o conteúdo aparece parado, sem quebrar.
O cliente pediu animações **sutis, tipo fade**; recortes e cortinas foram testados e recusados.

## Acessibilidade

- Contraste: texto ≥ 4,5:1; elementos não textuais ≥ 3:1. Texto sobre imagem (topo no celular)
  medido pixel a pixel.
- Foco visível em tudo (`:focus-visible` com contorno roxo `#7C3AED`).
- Link "Ir para o conteúdo" leva a `#conteudo` (sem `tabindex` no `<main>`).
- Alvos de toque ≥ 44 px; menu do celular sem depender de JavaScript.
- Um `h1` por página, hierarquia sem pulos, landmarks (`header`, `nav`, `main`, `footer`).
- Imagens decorativas com `alt=""`; o mural tem `aria-hidden`.
