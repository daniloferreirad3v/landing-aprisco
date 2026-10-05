# Plano de design — Seminário Teológico APRISCO

Status: **proposta revisada após as respostas do cliente, aguardando aprovação** (Fase 0, 2026-10-05).
Fonte: leitura da pasta `/design` (peças 1–6, logos, 20 capas, prints da área de membros). Não existe `design/identidade.md`, então os valores abaixo foram **extraídos das imagens**.

## 0. Decisões do cliente que mudam o plano (2026-10-05)

| Decisão | Efeito no design |
|---|---|
| Venda **por assinatura**, com **um checkout por plano** | Os botões gerais ("Quero assinar o APRISCO" no hero, no CTA final e na página de curso) **não vão direto ao checkout**: levam à seção **Planos**. Só os dois botões dentro de Planos ("Assinar o plano mensal" / "Assinar o plano anual") abrem a Kiwify. Na página de curso, o bloco Planos se repete em versão compacta, para a compra não exigir voltar à home. Não há preço por curso. |
| Cadeado = **curso não liberado** | Selo "Em breve" na capa. A página do curso existe e **mantém o botão de assinar**, porque a assinatura já dá acesso a todos os cursos, inclusive os em preparação. O texto diz "Em preparação. Quem assina já tem acesso garantido quando for liberado." Não divulga data. |
| Planos: mensal R$ 37 / anual R$ 192 (ou 12x R$ 19,86) | Nova seção **"Planos"** na home, antes do FAQ: dois blocos lado a lado (empilhados no celular), sem "mais popular" nem preço riscado. O anual mostra só os números reais da Kiwify; a economia ("equivale a R$ 16/mês") fica de fora até o cliente aprovar o texto. Os valores ficam em `cursos.ts` (`assinatura.planos`). |
| FAQ provisório | Perguntas reais de quem vai assinar. Respostas baseadas nos dados confirmados (preço, acesso a todos os cursos, compra pela Kiwify); o que não se sabe (cancelamento, certificado, dispositivos) fica com `[PREENCHER]` visível. Os dados ficam marcados com `rascunho: true`. |
| Fontes das peças do Canva | Anton + Montserrat, como abaixo. |
| **Não há fotos sem texto** | Hero **tipográfico sobre preto**, na linha da peça `6.png`. A primeira tela fica sem imagem, o que também acelera o carregamento (o LCP passa a ser o texto). O componente aceita foto depois, se aparecer. |
| Frases das peças como promessa | `h1` = "Estude teologia de maneira profunda e descomplicada."; CTA final = "Uma fé rasa, uma vida rasa." |
| Logo sem SVG | Cordeiro vetorizado a partir do PNG (para aprovação) e wordmark montado como **texto real** em Anton + Montserrat, mais nítido e legível pelo Google. |

---

## 1. O que a pasta /design mostra

| Elemento | Observado | Origem |
|---|---|---|
| Wordmark | "APRISCO" em sans condensada muito pesada, caixa-alta; "SEMINÁRIO TEOLÓGICO" acima, em sans geométrica com tracking largo | `1.png`, `2.png`, `6.png` |
| Símbolo | Cordeiro em silhueta dentro de círculo de traço fino, à direita do wordmark | `logo-*.png`, todas as peças |
| Fundo | Preto puro `#000000` nas peças; `#09090B` na área de membros | amostra de pixel |
| Destaque | Coral `#F98080` (barra sob as capas) | amostra de pixel em `Prints Aprisco (2).png` |
| Fotografia | Bíblias abertas, anotações, café, tablet; tudo escurecido e dessaturado, com overlay preto de 50–70% | `1.png` a `4.png` |
| Títulos de campanha | Mesma condensada pesada, caixa-alta, alinhada à esquerda, quebrada em 2–4 linhas | `3.png`, `4.png`, `5.png` |
| Capas | Retrato, foto escurecida, título em sans fina caixa-alta + chamada pequena | `Capas Cursos/` |
| Tom | Sério, contemplativo, editorial, com uma provocação pontual (`5.png`: Santa Ceia com computadores) | |

Identificação das fontes (provável, **confirmar**): **Anton** (wordmark e títulos) e **Montserrat** (subtítulo espaçado e textos de apoio). As duas são do Google Fonts, licença SIL OFL, com uso web liberado.

---

## 2. Paleta

| Token | Hex | Uso | Origem | Contraste |
|---|---|---|---|---|
| `--cor-preto` | `#000000` | Hero, faixas de marca, rodapé | peças da marca | — |
| `--cor-fundo` | `#09090B` | Fundo geral das páginas | área de membros | — |
| `--cor-superficie` | `#161618` | Blocos de FAQ, faixa "como funciona", campo de formulário | derivado (um degrau acima do fundo) | — |
| `--cor-texto` | `#F4F1EC` | Texto principal (branco quente, igual ao das capas) | derivado das capas | 17,7:1 no fundo |
| `--cor-texto-suave` | `#A3A09B` | Chamadas, legendas, metadados | derivado | 7,6:1 no fundo; 6,9:1 na superfície |
| `--cor-destaque` | `#F98080` | Botão principal, linha sob a capa em foco, links em hover | área de membros | 8,0:1 no fundo |
| `--cor-aviso` | `#E8C27A` | Selo "Em breve" e mensagens de atenção | derivado (âmbar quente, coerente com as fotos) | 11,8:1 no fundo |

Regras:
- **Botão principal:** fundo coral com **texto escuro** (`#09090B`, 8,0:1). Texto branco sobre coral reprova (2,5:1).
- Coral aparece em no máximo **3 lugares por tela**: botão, linha da capa em foco e o foco de teclado. Nada de títulos coloridos.
- Erro de formulário: texto `--cor-texto` com ícone e borda coral. A cor nunca é o único sinal.
- Texto sobre foto: overlay preto mínimo de 60% na área do texto, verificado em 4,5:1 na Fase 5.

---

## 3. Tipografia

| Papel | Família | Pesos | Uso |
|---|---|---|---|
| Display | **Anton** | 400 (único peso) | `h1`, `h2`, títulos de trilha. Sempre caixa-alta, porque é assim que a marca usa |
| Texto e interface | **Montserrat** | 400, 600 | Parágrafos, botões, menu, chamadas, FAQ. Caixa normal |
| Assinatura | Montserrat 500 com tracking 0,3em | 500 | Apenas o "SEMINÁRIO TEOLÓGICO" do logo e o rótulo da trilha dentro do card (carrega informação) |

- Total: 2 famílias, 4 arquivos woff2 (Anton 400 e Montserrat 400/500/600), hospedados em `public/fonts/`, com subset latin, `font-display: swap` e preload só da Anton.
- Escala com razão 1,25, fluida com `clamp()`:
  - corpo 17 px (celular) → 18 px (desktop), altura de linha 1,6
  - `h3` 22 → 26 · `h2` 32 → 48 · `h1` 44 → 88 (Anton com altura de linha 0,95, como nas peças)
- Largura de leitura: `max-inline-size: 68ch` em todo texto corrido.
- Anton nunca em parágrafo nem em texto menor que 22 px (perde a legibilidade).

---

## 4. Layout

Conceito geral: **uma página de estudo à noite.** Fundo escuro, fotografia de Bíblia aberta, tipografia condensada que fala alto uma vez e depois dá espaço para ler. Texto corrido à esquerda; centralizado só o CTA final.

| Seção | Conceito em uma frase |
|---|---|
| Header | Wordmark compacto à esquerda, quatro links à direita; no celular, menu com `<details>` sem JS. |
| Hero | O momento memorável: fundo preto puro, `h1` enorme em Anton quebrado em 3–4 linhas à esquerda, como nas peças 4 e 6, o cordeiro como selo à direita, o botão "Quero assinar o APRISCO" e um link de texto "Ver os cursos". |
| Para quem é | Quatro perfis em lista de texto simples, com duas colunas no desktop, sem ícones nem cards. |
| Trilhas | Seis prateleiras como na área de membros: título da trilha em Anton e uma fileira de capas; no celular, rolagem horizontal com a próxima capa aparecendo pela metade. |
| Como funciona | Faixa em `--cor-superficie` com 3–4 passos numerados (é uma sequência real: escolher → comprar na Kiwify → receber o acesso por e-mail → estudar). Só entra o que for confirmado. |
| Quem ensina | Foto grande em P&B ao lado de uma bio curta; some se não houver professor confirmado. |
| Depoimentos | Só com depoimentos reais. Sem eles, a seção não é renderizada. |
| FAQ | `<details>` em linhas separadas por fio fino, sem cards. |
| CTA final | A frase de campanha "Uma fé rasa, uma vida rasa." em Anton, centralizada, com um botão. |
| Rodapé | Fundo preto, logo, links, contato em `<address>`, políticas, CNPJ. |

### Wireframe: home, celular (375 px)

```
┌───────────────────────────────┐
│ SEMINÁRIO TEOLÓGICO  [☰ Menu] │  header, 56 px
│ APRISCO (o)                   │
├───────────────────────────────┤
│■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■│  fundo preto #000
│■ ESTUDE TEOLOGIA             ■│  (sem foto: LCP = texto)
│■ DE MANEIRA                  ■│  h1 Anton, ~44 px
│■ PROFUNDA E                  ■│
│■ DESCOMPLICADA.          (o) ■│  cordeiro = selo
│■                             ■│
│■ Uma fé rasa, uma vida rasa. ■│  subtítulo Montserrat
│■ [PREENCHER: subtítulo]      ■│
│■ [ Quero assinar o APRISCO ] ■│  botão coral, texto escuro
│■   Ver os cursos ↓           ■│  link de texto
│■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■│
├───────────────────────────────┤
│ PARA QUEM É                   │  h2 Anton
│ — Quem quer ler a Bíblia ...  │  lista simples
│ — Líderes de mesa e célula... │
│ — Casais e famílias ...       │
├───────────────────────────────┤
│ ESCOLHA POR ONDE COMEÇAR      │  h2
│                               │
│ CRESCIMENTO ESPIRITUAL        │  h3 Anton menor
│ ┌──────┐┌──────┐┌───          │  rolagem horizontal
│ │capa  ││capa  ││ca           │  (scroll-snap), 3ª capa
│ │ 4:5  ││      ││             │  aparece pela metade
│ └──────┘└──────┘└───          │
│ ━━━━━━                        │  linha coral só no foco
│ Fundamentos  Escola de        │  h4 com link (texto real)
│ da Fé        Oração           │
│ Introdução…  Aprenda a…       │  chamada, texto suave
│                               │
│ TEOLOGIA SISTEMÁTICA …        │  (repete para 6 trilhas)
├───────────────────────────────┤
│░ COMO FUNCIONAM OS CURSOS    ░│  faixa superfície
│░ 1  Escolha o curso          ░│  ol numerada (sequência real)
│░ 2  Inscreva-se pela Kiwify  ░│
│░ 3  Receba o acesso por email░│  [só o que for confirmado]
│░ 4  Estude no seu ritmo      ░│
├───────────────────────────────┤
│ QUEM ENSINA                   │  some se não houver dado
│ [foto P&B]                    │
│ Nome · formação · ministério  │
├───────────────────────────────┤
│ PLANOS                        │  h2
│ Acesso a todos os cursos,     │
│ inclusive os em preparação.   │
│ ┌───────────────────────────┐ │
│ │ Mensal                    │ │  h3 Montserrat 600
│ │ R$ 37 /mês                │ │  número em Anton
│ │ [ Assinar o plano mensal ]│ │
│ └───────────────────────────┘ │
│ ┌───────────────────────────┐ │
│ │ Anual                     │ │
│ │ R$ 192 à vista            │ │
│ │ ou 12x de R$ 19,86        │ │
│ │ [ Assinar o plano anual  ]│ │
│ └───────────────────────────┘ │
├───────────────────────────────┤
│ PERGUNTAS FREQUENTES          │
│ ─────────────────────────── + │  <details>
│ Como recebo o acesso?         │
│ ─────────────────────────── + │
├───────────────────────────────┤
│    UMA FÉ RASA,               │  CTA final, centralizado
│    UMA VIDA RASA.             │
│  Construa uma vida profunda…  │
│  [ Quero assinar o APRISCO ]  │
├───────────────────────────────┤
│■ logo · links · contato      ■│  rodapé preto
│■ privacidade · termos · CNPJ ■│
└───────────────────────────────┘
```

### Wireframe: home, desktop (1280 px), hero e trilha

```
┌──────────────────────────────────────────────────────────────────────┐
│ SEMINÁRIO TEOLÓGICO                 Cursos  Quem somos  Blog  Contato│
│ APRISCO (o)                                                          │
├──────────────────────────────────────────────────────────────────────┤
│■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■│
│■  ESTUDE TEOLOGIA                                    fundo preto puro■│
│■  DE MANEIRA                                                        ■│
│■  PROFUNDA E                                              ( o )     ■│
│■  DESCOMPLICADA.                                          selo      ■│
│■  Uma fé rasa, uma vida rasa.                                       ■│
│■  [ Quero assinar o APRISCO ]   Ver os cursos ↓                     ■│
│■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■│
│                                                                      │
│  CRESCIMENTO ESPIRITUAL                          Ver a trilha (5) →  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │        │ │        │ │        │ │        │ │        │  grade de 5  │
│  │  4:5   │ │        │ │        │ │        │ │        │              │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘              │
│  Fundamentos Escola de  Como ler a Caráter    Dons                   │
│  da Fé       Oração     sua Bíblia Cristão    Espirituais            │
│  Introdução… Aprenda a… Aprendendo Desenvol…  Descubra…              │
└──────────────────────────────────────────────────────────────────────┘
```

### Wireframe: página de curso, celular

```
┌───────────────────────────────┐
│ header                        │
├───────────────────────────────┤
│ Início › Cursos › Cristologia │  breadcrumbs
│ Teologia sistemática          │  link para a trilha (texto suave)
│ CURSO DE                      │  h1 Anton
│ CRISTOLOGIA                   │
│ Os mistérios de Cristo na     │  chamada
│ Palavra de Deus.              │
│ Descrição de 2–4 frases…      │  [PREENCHER] se não houver
│ Incluído na assinatura ·      │  texto suave
│ a partir de R$ 37/mês         │
│ [ Quero assinar e estudar   ] │  CtaButton → checkout da
│ [ Cristologia               ] │  assinatura (em breve: aviso
│                               │  "em preparação" + mesmo botão)
│ ┌───────────────────────────┐ │
│ │ capa 4:5 (largura 100%)   │ │  img lazy=false (LCP)
│ └───────────────────────────┘ │
├───────────────────────────────┤
│ O QUE VOCÊ VAI ESTUDAR        │  h2 · ol de módulos
│ PARA QUEM É ESTE CURSO        │  h2 · ul
│ COMO FUNCIONA                 │  h2 · formato/acesso/certificado
│ QUEM ENSINA                   │  h2
│ PERGUNTAS FREQUENTES          │  h2 · details
│ [ Quero assinar e estudar … ] │  botão final
│ CURSOS RELACIONADOS           │  h2 · aside, 2–3 cards
└───────────────────────────────┘
```

### Wireframe: página de curso, desktop

```
┌──────────────────────────────────────────────────────────────────────┐
│ header                                                               │
├──────────────────────────────────────────────────────────────────────┤
│ Início › Cursos › Cristologia                                        │
│                                                                      │
│  Teologia sistemática                         ┌──────────────────┐   │
│  CURSO DE                                     │                  │   │
│  CRISTOLOGIA                                  │   capa 4:5       │   │
│  Os mistérios de Cristo na Palavra de Deus.   │                  │   │
│  Descrição de 2–4 frases…                     │                  │   │
│  [ Quero assinar e estudar Cristologia ]      │                  │   │
│                                               └──────────────────┘   │
├──────────────────────────────────────────────────────────────────────┤
│  O QUE VOCÊ VAI ESTUDAR     (coluna de leitura 68ch)                 │
│  …                                                                   │
└──────────────────────────────────────────────────────────────────────┘
```

### Decisões de componente

- **CursoCard:** capa + `h3`/`h4` com o link + chamada. Um único link por card, com a área de clique estendida por `::after`. Sem sombra, sem cantos muito arredondados (raio de 4 px, como nas capas). A linha coral de 3 px sob a capa aparece **só em hover e foco**; é a citação direta da área de membros, com outro significado (seleção, em vez de progresso).
- **Curso em duas trilhas** ("Como ler a sua Bíblia"): mesmo card nas duas prateleiras, apontando para a mesma URL.
- **Selo "Em breve":** texto em `--cor-aviso` sobre a capa, com fundo escuro; não usa o ícone de cadeado da Kiwify, que no site sugeriria "conteúdo bloqueado".
- **Capas com texto aplicado:** o nome e a chamada sempre se repetem em HTML abaixo da capa. Na capa, `alt` = "Capa do curso Cristologia".
- **Proporção das capas:** exibidas em 4:5 com `object-fit: cover`. As capas 8:11 perdem ~5% em cima e embaixo, sem cortar o texto, que fica centralizado.

---

## 5. Princípios

1. **A marca já é escura; o site herda, não decora.** Preto e coral vêm da marca real, sem gradientes nem brilho.
2. **Fala alto uma vez.** Só o hero usa Anton em escala grande. O resto é leitura calma em Montserrat.
3. **O catálogo é o produto.** As capas são a parte mais rica do material; ganham espaço e não competem com nenhum ornamento.
4. **Toda informação está em texto.** Nada importante fica só dentro da imagem.
5. **Nenhum espaço vazio vira enfeite.** Se faltar um dado (professor, depoimento, preço), a seção some ou mostra `[PREENCHER]`; não é preenchida com algo genérico.

---

## 6. Revisão contra o visual genérico

| Padrão genérico que apareceu no primeiro rascunho | O que mudou | Por quê |
|---|---|---|
| Fundo `#0B0B0B` + um acento vibrante "porque escuro é elegante" | `#000000`/`#09090B` + coral `#F98080`, amostrados das peças | É a marca real, não um tema |
| Eyebrow em caixa-alta espaçada acima de cada `h2` ("NOSSOS CURSOS") | Removido. O tracking largo fica só no "SEMINÁRIO TEOLÓGICO" do logo e no nome da trilha dentro do card, onde carrega informação | Evitar o rótulo decorativo repetido |
| Cards arredondados (12–16 px) com sombra em tudo, inclusive "Para quem é" e FAQ | Só os cursos usam card. "Para quem é" virou lista, FAQ virou linhas com fio. Raio de 4 px, sem sombra | Card só onde há um objeto clicável |
| Ícones ilustrativos nos perfis de "Para quem é" | Removidos; o texto basta | Ícone genérico não acrescenta informação |
| Destacar uma palavra do `h1` em coral ("PROFUNDA") | Removido; o `h1` é todo na mesma cor | Padrão de página gerada; o peso da Anton já dá ênfase |
| Fade-in em todas as seções e hover que levanta o card | Um único movimento: o `h1` do hero sobe 12 px e aparece em 600 ms. Hover do card = só a linha coral. Tudo desligado com `prefers-reduced-motion` | "Gastar a ousadia em um lugar só" |
| Seções numeradas 01/02/03 | Numeração só em "Como funciona", que é sequência real | Número tem que significar ordem |
| Cadeado da Kiwify nas capas | Selo "Em breve" em texto | No site, cadeado sugere acesso negado, não lançamento |
| Hero com vídeo ou carrossel automático (como na área de membros) | Uma foto fixa | Peso no LCP e sem ganho de clareza |
| Faixa de "números" (alunos, horas, avaliações) | Não entra | Não há dados; inventar é proibido |

---

## 7. Motion

- Único momento orquestrado: entrada do `h1` do hero (opacidade 0→1 e deslocamento de 12 px, 600 ms, ease-out), só CSS.
- Respostas a ação: abrir FAQ (o ícone `+` gira 45°), abrir o menu, linha coral no foco e hover do card.
- `@media (prefers-reduced-motion: reduce)`: tudo instantâneo.

---

## 8. Riscos e dependências deste plano

- **Hero sem foto:** confirmado que não há fotos sem texto. O hero é tipográfico sobre `#000000` (como `6.png`). Se surgir uma foto, o componente `Hero` aceita a imagem sem mudar o resto.
- **Links de checkout:** mensal `226Zzxj` e anual `Rcvmvex` (oficiais) ficam só em `cursos.ts` (`assinatura.planos[].linkKiwify`). Trocar é editar uma linha.
- **FAQ provisório:** precisa ser substituído antes do lançamento (item do checklist da Fase 5).
- **Dados estruturados:** preço não vai no `Course` (a assinatura não é o curso). Se fizer sentido, um `Offer` para a assinatura entra na home, com os mesmos valores da Kiwify.
- **Capas em baixa resolução:** 15 capas com 320 px de largura servem bem no celular (grade de ~160 px), mas ficam suaves em cards desktop de ~230 px em tela retina.
- **Fontes não confirmadas:** se não forem Anton e Montserrat, os tokens mudam, mas a estrutura não.

---

## 9. Revisão de conversão da home (2026-10-05, pedido do cliente)

Objetivo: dar à home cara de página de vendas de alta conversão sem inventar dados.

| Mudança | Por quê |
|---|---|
| Hero com **mural de capas reais** (3 colunas desencontradas que somem no preto) no lugar do selo | Mostra o produto na primeira tela; é o elemento mais específico do APRISCO (a "estante" da área de membros). Único ponto de ousadia da página |
| Linha de oferta no hero: "Acesso aos 21 cursos a partir de R$ 37 por mês" | Preço e tamanho do catálogo antes da rolagem. Números vêm de `cursos.ts` |
| Seção **manifesto** com "Uma fé rasa, uma vida rasa." e a pergunta da peça 5 | Problema → solução, com as palavras do cliente |
| **O que a assinatura inclui** (4 itens, marca de check) | Valor concreto antes do preço; só fatos confirmados |
| Trilhas da home em versão **compacta** (capa + nome) | Vitrine do catálogo sem virar uma página de 21 textos; o detalhe fica em `/cursos` e nas páginas de curso |
| Planos: **anual primeiro, em destaque**, com equivalente mensal (R$ 16) e diferença para 12 meses do mensal (R$ 252) | Ancoragem de preço. Valores calculados dos preços confirmados, nunca digitados |
| **Barra fixa de assinatura** no celular (aparece após a primeira tela; sem JS) | CTA sempre ao alcance no celular, onde está a maior parte do tráfego |
| CTA repetido após "O que inclui" e no fechamento | Pontos de decisão naturais |
| Blog removido do menu | Fora do escopo |

Mantido de fora por falta de dado real: contador de alunos, depoimentos, garantia, urgência.
Movimento: entrada do h1 + subida das colunas do mural numa única sequência de carregamento.
