# Plano de design — Seminário Teológico APRISCO

Status: **em uso**. Descreve o design como está no site (revisado em 2026-10-06), com o raciocínio por
trás de cada escolha. Só recebe decisões **definitivas**, aprovadas pelo cliente; experimentos não
entram aqui. Os valores exatos vivem em `src/styles/tokens.css`; o resumo técnico (animações,
acessibilidade) está em `docs/projeto/06-visual-e-animacoes.md`, e a lista de decisões com datas, em
`docs/projeto/07-decisoes.md`.

Fonte original: leitura da pasta `/design` (peças 1–6, logos, 20 capas, prints da área de membros).
Não existe `design/identidade.md`; os valores iniciais foram **extraídos das imagens** e depois
ajustados por decisão do cliente (a cor de acento).

---

## 1. O que a pasta /design mostra

| Elemento | Observado | Origem |
|---|---|---|
| Wordmark | "APRISCO" em sans condensada muito pesada, caixa-alta; "SEMINÁRIO TEOLÓGICO" acima, em sans geométrica com tracking largo | `1.png`, `2.png`, `6.png` |
| Símbolo | Cordeiro em silhueta dentro de círculo de traço fino, à direita do wordmark | `logo-*.png`, todas as peças |
| Fundo | Preto puro `#000000` nas peças; `#09090B` na área de membros | amostra de pixel |
| Destaque das peças | Coral `#F98080` (barra sob as capas). **Substituído no site pelo roxo** (ver Paleta) | amostra de pixel em `Prints Aprisco (2).png` |
| Fotografia | Bíblias abertas, anotações, café, tablet; tudo escurecido e dessaturado | `1.png` a `4.png` |
| Títulos de campanha | Mesma condensada pesada, caixa-alta, alinhada à esquerda, quebrada em 2–4 linhas | `3.png`, `4.png`, `5.png` |
| Capas | Retrato, foto escurecida, título em sans fina caixa-alta + chamada pequena | `Capas Cursos/` |
| Tom | Sério, contemplativo, editorial, com uma provocação pontual (`5.png`: Santa Ceia com computadores) | |

Fontes identificadas: **Anton** (wordmark e títulos) e **Montserrat** (subtítulo espaçado e textos de
apoio), ambas SIL OFL, com uso web liberado.

---

## 2. Paleta

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| `--cor-preto` | `#000000` | Topo, fechamento, cabeçalho, rodapé | — |
| `--cor-fundo` | `#09090B` | Fundo geral | — |
| `--cor-superficie` | `#161618` | Faixas ("Por que escolher", "Como funciona"), card mensal, card "E mais" | — |
| `--cor-texto` | `#F4F1EC` | Texto principal (branco quente, igual ao das capas) | 17,7:1 no fundo |
| `--cor-texto-suave` | `#A3A09B` | Apoio, legendas | 7,6:1 no fundo; 6,9:1 na superfície |
| `--cor-roxo` | `#4C059E` | Botões de compra, selo "Melhor custo", skip link — **sempre preenchido**, com texto branco | 11,5:1 com branco em cima; 1,7:1 no fundo |
| `--cor-destaque` | `#7C3AED` | **Traços**: borda do card anual, linha sob a capa, ✓, números dos passos, foco de teclado, sublinhado no hover | 3,5:1 no fundo (mínimo de 3:1 para não-texto e texto grande) |
| `--cor-aviso` | `#E8C27A` | Marcador `[PREENCHER]` | 11,8:1 no fundo |

Regras:
- O roxo da marca (definido pelo cliente em 2026-10-06, no lugar do coral) é escuro: sobre o fundo
  tem 1,7:1, então **só aparece preenchido**.
- Tudo que é traço usa `#7C3AED`, o roxo mais escuro que ainda se enxerga no fundo. Tons mais claros
  puxam para o lilás/rosa e foram **recusados pelo cliente**.
- **Texto nunca é roxo.** Links e perguntas do FAQ ficam em creme; o que responde ao mouse é o
  sublinhado ou o ícone.
- Todos os botões de compra usam o mesmo roxo; a variante discreta muda só o tamanho.
- Texto sobre imagem (topo no celular): véu preto e medição pixel a pixel; pior ponto atual 4,97:1.

---

## 3. Tipografia

| Papel | Família | Pesos | Uso |
|---|---|---|---|
| Display | **Anton** | 400 (único) | `h1`, `h2`, títulos de trilha, "APRISCO" da assinatura, valores de preço. Sempre caixa-alta |
| Texto e interface | **Montserrat** (variável) | 400–600 | Parágrafos, botões, menu, FAQ. Caixa normal, exceto os botões de compra (caixa-alta, pedido do cliente) |
| Assinatura | Montserrat 500, tracking 0,3em | 500 | Só o "SEMINÁRIO TEOLÓGICO" da marca |

- 2 arquivos woff2 em `public/fonts/` (Anton e Montserrat variável), subset latin, `font-display:
  swap`, preload dos dois e uma fonte de reserva com métricas ajustadas (CLS 0).
- Escala fluida com `clamp()`: corpo 17 → 18 px (altura de linha 1,6); `h3` 22 → 26; `h2` 32 → 48;
  `h1` 44 → 88 (Anton com altura de linha 0,95, como nas peças).
- Largura de leitura: `68ch` no texto corrido. Medidas da Anton em `em` (o `ch` é estreito demais nela).
- Anton nunca em parágrafo.
- Uma troca para EB Garamond + Hanken Grotesk foi testada e revertida a pedido do cliente.

---

## 4. Layout

Conceito: **uma página de estudo à noite.** Fundo escuro, tipografia condensada que fala alto no topo
e depois dá espaço para ler. A home é **uma página só** (single page), na ordem de uma página de vendas.

| Seção | Conceito |
|---|---|
| Cabeçalho | Fixo. Só o cordeiro à esquerda (o nome ao lado ficava redundante); Cursos, Sobre, Dúvidas à direita; no celular, `<details>` |
| Topo | O momento memorável: assinatura da marca, `h1` enorme em Anton e o **mural de capas reais** (a "estante" da escola). Sem botão nem preço. No celular, o mural vira fundo com véu escuro e o texto fica por cima |
| Por que escolher | Faixa de superfície; título à esquerda e as quatro frases do cliente numa coluna à direita, com o botão logo abaixo delas. Sem ícone, card ou fio |
| Uma fé rasa (`#sobre`) | Título gigante em duas linhas, revelado de baixo para cima; texto e botão discreto ao lado |
| O que a assinatura inclui | Quatro itens com ✓ roxo, em duas colunas no desktop; botão |
| Vitrine (`#cursos`) | Cinco prateleiras como na área de membros: título da trilha em Anton e uma fileira de capas com o nome em texto. Celular: rolagem horizontal com a próxima capa "espiando". Card "E mais" no fim. Na home as capas não são links |
| Como funciona | Faixa de superfície com quatro passos numerados (é uma sequência real), em duas colunas |
| Planos (`#assinatura`) | Cabeçalho centralizado; card **anual grande** (borda roxa, selo, "12x de R$ 19,86" em 6 rem, botão, bandeiras de pagamento) ao lado do card **mensal pequeno** (cinza, "R$ 37 por mês", botão "ASSINAR") |
| Dúvidas (`#duvidas`) | `<details>` em linhas separadas por fio fino, sem cards |
| Fechamento | Cordeiro, frase em Anton centralizada e o botão. Sem linha de preço |
| Rodapé | Fundo preto; marca e navegação em duas colunas; linha de base com copyright à esquerda e selo "Pagamento 100% seguro" + políticas à direita |

### Wireframe: home, celular (375 px)

```
┌───────────────────────────────┐
│ (o)                  [☰ Menu] │  cabeçalho fixo: só o cordeiro
├───────────────────────────────┤
│▓▓▓▓▓ capas ao fundo, véu ▓▓▓▓▓│  primeira tela: mural como fundo
│ SEMINÁRIO TEOLÓGICO           │
│ APRISCO (o)                   │  assinatura (menor que o h1)
│                               │
│ ESTUDE TEOLOGIA DE            │  h1 Anton
│ MANEIRA PROFUNDA              │
│ E DESCOMPLICADA.              │
│ Para conhecer a Deus, …       │  parágrafo em creme
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
├───────────────────────────────┤
│ POR QUE ESCOLHER A APRISCO?   │  faixa #161618
│ A APRISCO capacita …          │
│ A APRISCO treina …            │
│ A APRISCO prepara …           │
│ A APRISCO levanta …           │
│ [QUERO COMEÇAR AGORA]         │
├───────────────────────────────┤
│ UMA FÉ RASA,                  │  manifesto (#sobre)
│ UMA VIDA RASA.                │
│ Teologia Clássica e Sólida …  │
│ [QUERO COMEÇAR MEUS ESTUDOS]  │
├───────────────────────────────┤
│ O QUE A ASSINATURA INCLUI     │
│ ✓ … ✓ … ✓ … ✓ …               │
│ [ASSINAR AGORA]               │
├───────────────────────────────┤
│ ESCOLHA POR ONDE COMEÇAR      │  vitrine (#cursos)
│ CRESCIMENTO ESPIRITUAL        │
│ ┌────┐┌────┐┌──             → │  rolagem horizontal
│ │capa││capa││E MAIS           │
│ └────┘└────┘└──               │
│ (5 trilhas)                   │
├───────────────────────────────┤
│ COMO FUNCIONA   1 2 3 4       │  faixa #161618
├───────────────────────────────┤
│ ACESSO A TODOS OS CURSOS      │  planos (#assinatura)
│ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ │
│ ┃ Plano anual  [Melhor custo]┃ │
│ ┃ 12x de R$ 19,86            ┃ │
│ ┃ ou R$ 192 à vista          ┃ │
│ ┃ [ASSINAR AGORA]            ┃ │
│ ┃ VISA  MC  elo  pix         ┃ │
│ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ │
│ ┌ Plano mensal  R$ 37 ──────┐ │
│ └ [ASSINAR] ────────────────┘ │
├───────────────────────────────┤
│ DÚVIDAS ANTES DE ASSINAR  +   │  FAQ (#duvidas)
├───────────────────────────────┤
│ (o) CONSTRUA UMA VIDA …       │  fechamento
│ [ASSINAR AGORA]               │
├───────────────────────────────┤
│ APRISCO · navegação 2 col.    │  rodapé
│ 🔒 Pagamento 100% seguro      │
│ Política · Termos · ©         │
└───────────────────────────────┘
```

### Wireframe: home, desktop (1366 px), topo e planos

```
┌──────────────────────────────────────────────────────────────────────┐
│ (o)                                       Cursos   Sobre   Dúvidas   │
├──────────────────────────────────────────────────────────────────────┤
│ SEMINÁRIO TEOLÓGICO                       ┌────┐ ┌────┐  ┌────┐      │
│ APRISCO (o)                               │capa│ │capa│  │capa│      │
│ ESTUDE TEOLOGIA DE                        └────┘ │    │  └────┘      │
│ MANEIRA PROFUNDA                          ┌────┐ └────┘  ┌────┐      │
│ E DESCOMPLICADA.                          │capa│ ┌────┐  │capa│      │
│ Para conhecer a Deus, …                   └────┘ │capa│  └────┘      │
│                                            mural: 3 colunas que      │
│                                            "respiram"                │
├──────────────────────────────────────────────────────────────────────┤
│                    ACESSO A TODOS OS CURSOS                          │
│              Uma assinatura, todos os cursos …                       │
│   ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  ┌───────────────────────┐  │
│   ┃ Plano anual          [Melhor custo]┃  │ Plano mensal          │  │
│   ┃ 12x de R$ 19,86                    ┃  │ R$ 37 por mês         │  │
│   ┃ ou R$ 192 à vista                  ┃  │ [ASSINAR]             │  │
│   ┃ [        ASSINAR AGORA           ] ┃  └───────────────────────┘  │
│   ┃     VISA   MC   elo   pix          ┃                             │
│   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛                             │
└──────────────────────────────────────────────────────────────────────┘
```

### Página de curso

```
┌──────────────────────────────────────────────────────────────────────┐
│ Início › Cristologia                                ┌──────────────┐ │
│ Teologia sistemática: introdução                    │    capa      │ │
│ CRISTOLOGIA                                         │    (4:5)     │ │
│ Aprenda sobre os mistérios de Cristo …              │              │ │
│ [PREENCHER: descrição]                              └──────────────┘ │
│ [ASSINAR AGORA]  Incluído na assinatura: 12x de R$ 19,86.            │
├──────────────────────────────────────────────────────────────────────┤
│ O QUE VOCÊ VAI ESTUDAR · PARA QUEM É · COMO FUNCIONA (ficha)         │
│ PLANOS (compacto) · PERGUNTAS FREQUENTES (3) · CURSOS RELACIONADOS   │
└──────────────────────────────────────────────────────────────────────┘
```

### Decisões de componente

- **CursoCard:** capa + `h3`/`h4` + chamada (a chamada só nas páginas de curso). Um único link por
  card, com a área de clique estendida por `::after` (na home o card não é link). Raio de 4 px, sem
  sombra. No hover/foco, a capa sobe 6 px e aparece a linha roxa de 3 px sob ela: citação da barra de
  progresso da área de membros, com outro significado (seleção).
- **Curso em duas trilhas** ("Como ler a sua Bíblia"): mesmo card nas duas prateleiras, mesma URL.
- **Cursos em preparação:** na vitrine, iguais aos outros (sem selo, decisão do cliente). A página do
  curso avisa que está em preparação e já incluído na assinatura. Nunca o cadeado da Kiwify, que no
  site sugeriria "conteúdo bloqueado".
- **Capas com texto aplicado:** o nome do curso se repete em HTML abaixo da capa; a capa tem `alt=""`.
- **Proporção das capas:** exibidas em 4:5 com `object-fit: cover`. As capas 8:11 perdem ~5% em cima
  e embaixo, sem cortar o texto.
- **Card "E mais":** mesmo formato de capa, em superfície, só com "E MAIS" e "Cursos novos entram na
  sua assinatura assim que são liberados." — a fileira não "acaba".
- **Botões:** um roxo só. Principal ("ASSINAR AGORA") e discreto ("QUERO COMEÇAR…", letra menor),
  ambos com o brilho lento; secundário de contorno para o mensal.

---

## 5. Princípios

1. **A marca já é escura; o site herda, não decora.** Preto e roxo, sem gradientes. O único brilho é
   o dos botões de compra.
2. **Fala alto no topo.** O `h1` e o mural são o momento memorável; o resto é leitura calma.
3. **O catálogo é o produto.** As capas são a parte mais rica do material e aparecem duas vezes:
   no mural do topo e na vitrine.
4. **Toda informação está em texto.** Nada importante fica só dentro da imagem.
5. **Nenhum espaço vazio vira enfeite.** Se faltar um dado (professor, depoimento), a seção não
   existe ou mostra `[PREENCHER]`; não é preenchida com algo genérico.

---

## 6. Revisão contra o visual genérico

| Padrão genérico | Como ficou | Por quê |
|---|---|---|
| Fundo `#0B0B0B` + um acento vibrante "porque escuro é elegante" | `#000000`/`#09090B` + o roxo `#4C059E` definido pelo cliente (antes, o coral `#F98080` das peças) | É a marca, não um tema |
| Eyebrow em caixa-alta espaçada acima de cada `h2` | Não existe. Tracking largo só no "SEMINÁRIO TEOLÓGICO" da marca | Evitar o rótulo decorativo repetido |
| Cards arredondados com sombra em tudo | Card só para cursos e planos. FAQ em linhas com fio; "Por que escolher" e "O que inclui" sem card. Raio de 4 px, sem sombra | Card só onde há um objeto |
| Ícones ilustrativos em listas | Só o ✓ de "O que inclui"; "Por que escolher" sem ícone | Ícone genérico não acrescenta informação |
| Destacar uma palavra do `h1` em cor | O `h1` é todo na mesma cor | O peso da Anton já dá ênfase |
| Animações chamativas | Fade sutil ao rolar (pedido do cliente), sem recortes nem cortinas; hover só nas capas e botões | Movimento discreto, que não distrai da leitura |
| Seções numeradas 01/02/03 | Numeração só em "Como funciona", que é sequência real | Número tem que significar ordem |
| Cadeado da Kiwify nas capas | Nada na capa; aviso só na página do curso | No site, cadeado sugere acesso negado |
| Hero com vídeo ou carrossel automático | Mural fixo de capas, com movimento lento | Peso no LCP e sem ganho de clareza |
| Faixa de "números" (alunos, avaliações) | Não entra; só o "+80 aulas" informado pelo cliente | Não há dados; inventar é proibido |
| Barra fixa de compra no celular | Retirada pelo cliente | Ficava aparecendo o tempo todo |

---

## 7. Motion

- **Ao carregar:** entrada do topo (assinatura → título → subtítulo) e subida das colunas do mural,
  que depois "respiram" devagar em loop.
- **Ao rolar:** fade com subida curta (16 px) nos blocos, linear, terminando perto do meio da tela,
  em cascata. O título "Uma fé rasa" é o único descoberto em linha.
- **Botões de compra:** brilho lento que vai e volta (ciclo de 13 s), por trás do texto.
- **Respostas a ação:** capa sobe 6 px, botão sobe 2 px, FAQ e menu deslizam ao abrir.
- `@media (prefers-reduced-motion: reduce)`: tudo instantâneo.

---

## 8. Riscos e dependências

- **Capas em baixa resolução:** 15 das 20 estão em 320 px de largura; ficam suaves em telas
  grandes. Ideal: 1080×1350 (4:5).
- **Peças de `/design` em coral:** a identidade de origem e a imagem de compartilhamento ainda usam o
  coral; o site usa roxo. Refazer as peças é decisão do cliente.
- **Logo sem SVG original:** o cordeiro foi vetorizado a partir do PNG (aguarda aprovação).
- **Navegador sem `animation-timeline`** (ex.: Firefox): o conteúdo aparece parado, sem quebrar.
- **Dados estruturados:** preço não vai no `Course` (a assinatura não é o curso).
