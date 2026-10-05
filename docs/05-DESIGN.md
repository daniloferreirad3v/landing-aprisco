# 05 — Direção visual e processo de design

## Passo zero: leia a pasta `/design`

A identidade da marca vive em `/design` (veja `design/LEIA-ME.md`). **Antes de escrever qualquer CSS ou componente, leia tudo o que estiver lá**: logo, paleta, tipografia, manual de identidade, referências e fotos.

- Valores oficiais da pasta `/design` **sempre vencem** qualquer valor deste documento.
- Se faltar logo, paleta ou fontes, **pare e pergunte**. Não invente a marca.
- Extraia tudo para `src/styles/tokens.css` (cores, fontes, espaçamentos, raios) e use só esses tokens no resto do CSS.

## O que a marca já mostra (observado na área de membros da Kiwify)

Ponto de partida para entender o clima. Confirme e substitua pelos valores oficiais:

- **Fundo escuro**, quase preto, com fotografia em tons dessaturados e escurecidos.
- **Wordmark "APRISCO"** em sans-serif condensada, pesada, em caixa-alta; "SEMINÁRIO TEOLÓGICO" em letras espaçadas acima; **cordeiro** como emblema dentro de um círculo.
- **Cor de destaque** em coral/salmão, usada de forma contida (barras de progresso, linhas de base dos cards). Aproximadamente `#F28B82`; **extrair o valor real do arquivo de identidade**.
- **Capas dos cursos** em formato retrato (proporção próxima de 2:3), com foto escurecida e título tipográfico grande sobre ela.
- **Organização por trilhas** (categorias com título e uma fileira de capas).
- Tom visual: sério, contemplativo, editorial. Não é "igreja colorida" nem "startup".

Isso é **referência de clima**, não de layout. O site público precisa vender e ser achado; a área de membros precisa mostrar o progresso do aluno. São trabalhos diferentes.

## Processo em quatro passos

### 1. Plano de design (escrever em `docs/design-plan.md` antes de codar)

Em poucas linhas, defina:

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
- Evite gradientes decorativos, brilhos e animações de entrada em todas as seções.

Registre no `design-plan.md` o que você mudou e por quê.

### 3. Construção

- Comece pelos tokens e pelo `Base.astro`, depois Hero, depois cards, depois o restante.
- **Mobile primeiro** (375 px), depois tablet e desktop. A maior parte do tráfego vem do celular.
- Cuidado com especificidade de CSS: evite classes de seção e de elemento que se anulem (margens e paddings entre seções são o ponto mais comum de conflito). Prefira uma convenção simples (BEM leve ou estilos escopados do Astro) e um único espaçamento vertical entre seções definido por token.
- Respeite `prefers-reduced-motion`.

### 4. Crítica

Tire capturas de tela (Playwright, se disponível) em 375, 768 e 1280 px e critique como diretor de arte:

- O primeiro olhar entende **o que é a escola** e **o que fazer**?
- Há um único elemento memorável? O resto está quieto e disciplinado?
- Alguma decoração poderia ser removida sem perda? Remova.
- Contraste do texto sobre foto passa em 4,5:1?
- Os cards de curso são legíveis no celular?

## Direção por seção

| Seção | Intenção visual |
|---|---|
| **Hero** | O momento memorável. Abre com o que é mais característico do universo da escola: a palavra, o estudo, o cordeiro. Fotografia escurecida com título tipográfico forte e um único botão principal. O `h1` é texto real, legível, não parte da imagem. |
| **Trilhas e cursos** | Fileiras por categoria, como na área de membros, mas com **título e uma linha de descrição visíveis em texto** (não só na imagem). Capas em retrato; no celular, rolagem horizontal com a próxima capa "espiando" ou grade de 2 colunas. |
| **Como funciona** | Poucos passos reais (só se a informação existir). Sequência numerada aqui **é** apropriada, porque é um processo. |
| **Quem ensina** | Foto real, nome, formação/ministério em poucas linhas. Rosto e voz humana geram confiança. |
| **Depoimentos** | Só reais e autorizados. Se não houver, omitir a seção inteira. |
| **FAQ** | `<details>` estilizados, sem animação chamativa; a resposta aparece ao abrir. |
| **CTA final** | Frase direta + botão. Sem urgência falsa. |
| **Rodapé** | Links úteis, contato, redes, políticas, razão social/CNPJ (se houver). |

## Tipografia: diretrizes

- A marca usa um título condensado pesado: se a fonte for licenciada ou open source, inclua em `public/fonts/` (woff2). Se for proprietária sem licença web, **pergunte** e proponha uma alternativa parecida.
- Texto de leitura em tamanho de pelo menos 16 px no celular (idealmente 17–18 px), altura de linha 1,5–1,7.
- Caixa-alta apenas onde a marca exige (wordmark, títulos de destaque). Textos de interface e parágrafos em caixa normal (sentence case).
- Peso, largura e espaçamento são ferramentas de hierarquia; não use mais de 3 pesos.

## Botões e microcópia

- Botão principal: verbo + objeto. "Quero me inscrever", "Ver o curso de Cristologia", "Falar no WhatsApp".
- O mesmo nome de ação em todo o fluxo (se o botão diz "Inscrever-se", o rótulo seguinte não vira "Comprar").
- Estados: normal, hover, foco visível, ativo, desabilitado ("Em breve").
- Mensagens de erro dizem o que houve e como resolver, sem se desculpar de forma vaga.

## Motion

- No máximo **um** momento orquestrado (por exemplo, uma revelação suave do hero ao carregar). Nada de fade-in em todas as seções nem hover animado em todos os cards.
- Movimento que responde a uma ação (abrir FAQ, abrir menu) é bem-vindo.
- Tudo desligado quando `prefers-reduced-motion: reduce`.

## Qualidade mínima

Responsivo até 320 px, foco visível, contraste adequado, imagens otimizadas, sem rolagem horizontal da página, alvos de toque de 44 px.
