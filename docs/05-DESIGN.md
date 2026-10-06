# 05 — Direção visual e processo de design

## Passo zero: conheça a identidade atual

A identidade de origem vive em `/design` (peças do Canva, capas, logo e prints; veja
`design/LEIA-ME.md`). Os valores **em uso** estão em `src/styles/tokens.css`, e o estado atual está
resumido em `docs/projeto/06-visual-e-animacoes.md`.

- **Os tokens e as decisões do cliente vencem** os valores das peças. Exemplo: as peças usam coral,
  mas o cliente definiu o **roxo `#4C059E`** como cor primária (2026-10-06).
- Nunca altere arquivos de `/design`. Se faltar algo da marca, **pergunte**; não invente.
- Use só os tokens no CSS (cores, fontes, espaços, raios).

## O que a marca já mostra (observado na área de membros da Kiwify)

Ponto de partida para entender o clima. Confirme e substitua pelos valores oficiais:

- **Fundo escuro**, quase preto, com fotografia em tons dessaturados e escurecidos.
- **Wordmark "APRISCO"** em sans-serif condensada, pesada, em caixa-alta; "SEMINÁRIO TEOLÓGICO" em letras espaçadas acima; **cordeiro** como emblema dentro de um círculo.
- **Cor de destaque** das peças: coral/salmão (`#F98080`), usada de forma contida. **No site foi substituída pelo roxo** por decisão do cliente: `#4C059E` preenchido (botões, selo) e `#7C3AED` em traços (bordas, linhas, foco). Texto nunca é roxo.
- **Capas dos cursos** em formato retrato (4:5 ou 8:11), com foto escurecida e título tipográfico grande sobre ela.
- **Organização por trilhas** (categorias com título e uma fileira de capas).
- Tom visual: sério, contemplativo, editorial. Não é "igreja colorida" nem "startup".

Isso é **referência de clima**, não de layout. O site público precisa vender e ser achado; a área de membros precisa mostrar o progresso do aluno. São trabalhos diferentes.

## Processo em quatro passos

### 1. Plano de design (`docs/design-plan.md`)

O plano já existe e é mantido em `docs/design-plan.md`. Só registre lá decisões **definitivas**,
aprovadas pelo cliente. Para um projeto novo, o plano define:


- **Cor:** 4 a 6 valores nomeados em hex (fundo, superfície, texto, texto secundário, destaque, estado/erro), tirados de `/design`.
- **Tipografia:** as famílias e o papel de cada uma. Use uma ou duas; se duas, bem distintas (por exemplo, a condensada pesada da marca para títulos e uma sans ou serifada legível para leitura). Escala tipográfica definida (ex.: 1,125 ou 1,2), com limite de linha em torno de 65–75 caracteres.
- **Layout:** um conceito em uma frase por seção e um wireframe em ASCII da home e da página de curso. Defina o alinhamento (texto corrido à esquerda; centralizar apenas títulos curtos e CTAs).
- **Princípios:** o que torna esta página inconfundível.

### 2. Revisão contra o genérico

Antes de codar, compare o plano com os padrões que qualquer gerador de páginas produz e **reescreva** o que for padrão:

- Fundo quase preto + um único acento vibrante é o "tema escuro" padrão. Aqui ele é **a marca**, então siga-o, mas a escolha deve ser justificada pela identidade, e não pelo hábito: use a cor real e a tipografia real da marca, nada de preto "#0B0B0B + verde-ácido".
- Evite o kit de cartões idênticos arredondados com a mesma sombra cinza em tudo.
- Evite um rótulo em caixa-alta espaçada acima de cada título (o "eyebrow"). Só use se carregar informação (por exemplo, o nome da trilha em um card).
- Evite destacar uma única palavra do título em outra cor ou itálico.
- Evite numerar seções (01/02/03) quando o conteúdo não é uma sequência.
- Evite gradientes decorativos. O brilho existe só nos botões de compra (pedido do cliente).
- Animações de rolagem: o cliente pediu fade sutil nas seções; recortes e "cortinas" foram recusados.

Registre no `design-plan.md` o que você mudou e por quê.

### 3. Construção

- Comece pelos tokens e pelo `Base.astro`, depois Hero, depois cards, depois o restante.
- **Mobile primeiro** (375 px), depois tablet e desktop. A maior parte do tráfego vem do celular.
- Cuidado com especificidade de CSS: evite classes de seção e de elemento que se anulem (margens e paddings entre seções são o ponto mais comum de conflito). Prefira uma convenção simples (BEM leve ou estilos escopados do Astro) e um único espaçamento vertical entre seções definido por token.
- Respeite `prefers-reduced-motion`.

### 4. Crítica

Tire capturas de tela (Playwright, se disponível) em 375 e 1366 px (e 320, 768 e 1024 quando mexer em layout) e critique como diretor de arte:

- O primeiro olhar entende **o que é a escola** e **o que fazer**?
- Há um único elemento memorável? O resto está quieto e disciplinado?
- Alguma decoração poderia ser removida sem perda? Remova.
- Contraste do texto sobre foto passa em 4,5:1?
- Os cards de curso são legíveis no celular?

## Direção por seção (como está)

| Seção | Intenção visual |
|---|---|
| **Topo** | O momento memorável: assinatura da marca, `h1` tipográfico forte e o mural de capas reais (a "estante" da escola). Sem botão nem preço (decisão do cliente). No celular, o mural vira fundo da primeira tela, com véu escuro para o texto passar de 4,5:1 |
| **Por que escolher** | Quatro frases em litania sobre faixa de superfície, sem ícone nem card; o espaço organiza |
| **Manifesto ("Uma fé rasa")** | Título enorme revelado de baixo para cima; texto e botão discreto ao lado |
| **O que a assinatura inclui** | Quatro itens com ✓ roxo |
| **Trilhas e cursos** | Fileiras por trilha, como na área de membros, com o nome do curso em texto. Celular: rolagem horizontal com a próxima capa "espiando". Card "E mais" no fim. Na home as capas não são links |
| **Como funciona** | Quatro passos reais, numerados (é um processo) |
| **Planos** | Card anual grande, em destaque; card mensal pequeno, em segundo plano; bandeiras de pagamento sob o botão do anual |
| **Quem ensina / Depoimentos** | Só com material real; hoje não existem |
| **FAQ** | `<details>` estilizados; a resposta desliza ao abrir |
| **Fechamento** | Cordeiro, frase direta e botão. Sem urgência falsa |
| **Rodapé** | Marca, navegação em duas colunas, selo "Pagamento 100% seguro", políticas, copyright (CNPJ quando houver) |

## Tipografia: diretrizes

- Títulos em **Anton** (condensada pesada, caixa-alta) e texto em **Montserrat**, ambas OFL, em `public/fonts/` (woff2). Uma troca para EB Garamond + Hanken Grotesk foi testada e revertida pelo cliente.
- Texto de leitura em tamanho de pelo menos 16 px no celular (idealmente 17–18 px), altura de linha 1,5–1,7.
- Caixa-alta apenas onde a marca exige (wordmark, títulos de destaque). Textos de interface e parágrafos em caixa normal (sentence case).
- Peso, largura e espaçamento são ferramentas de hierarquia; não use mais de 3 pesos.

## Botões e microcópia

- Rótulos em uso (definidos pelo cliente, em maiúsculas, sem "!"): **ASSINAR AGORA** (botão principal), **QUERO COMEÇAR AGORA** e **QUERO COMEÇAR MEUS ESTUDOS AGORA** (seções 2 e 3), **ASSINAR** (plano mensal). Alternativa quando falta link: "Falar no WhatsApp".
- O mesmo nome de ação em todo o fluxo: o passo 1 de "Como funciona" diz "Clique em ASSINAR AGORA".
- Estados: normal, hover (sobe 2 px e clareia), foco visível, ativo (afunda), indisponível ("Assinatura indisponível no momento").
- Mensagens de erro dizem o que houve e como resolver, sem se desculpar de forma vaga.

## Motion

- Um momento orquestrado ao carregar: a entrada do topo e o mural de capas.
- Ao rolar, **fade sutil** com subida curta nos blocos (pedido do cliente); a revelação termina perto do meio da tela.
- Brilho lento nos botões de compra, passando por trás do texto.
- Movimento que responde a uma ação (hover da capa, abrir FAQ, abrir menu) é bem-vindo.
- Detalhes e armadilhas: `docs/projeto/06-visual-e-animacoes.md` e `docs/projeto/08-armadilhas.md`.
- Tudo desligado quando `prefers-reduced-motion: reduce`.

## Qualidade mínima

Responsivo até 320 px, foco visível, contraste adequado, imagens otimizadas, sem rolagem horizontal da página, alvos de toque de 44 px.
