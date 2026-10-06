# 05 — Dados e conteúdo

Todo dado que aparece no site sai de `src/data/`. Componentes e páginas só leem daqui.

## `cursos.ts` — fonte única de cursos, planos, preços e checkout

- `assinatura.planos`: `mensal` e `anual` com `valor`, `periodo`, `parcelas` (anual) e
  `linkKiwify`. `linkKiwify: ''` marca o plano como indisponível.
- `ofertaDestaque`: o anual parcelado (`quantidade`, `parcela`, `aVista`, `totalAPrazo` calculado,
  `texto` = "12x de R$ 19,86").
- Utilitários: `getPlano`, `formatarReais` ("R$ 19,86"; inteiros sem centavos: "R$ 37"),
  `formatarNumero` ("19,86", sem "R$").
- `cursos`: lista com `slug`, `nome`, `tituloSeo`, `trilha` (principal), `chamada` (frase da capa),
  `descricao`, `paraQuem`, `aprendizados`, `formato?`, `cargaHoraria?`, `professor?`,
  `palavraChave`, `status` (`disponivel` | `em-breve`), `revisaoSensivel?`. A capa é ligada
  automaticamente pelo slug (`src/assets/cursos/<slug>.png`).
- Consultas: `getCurso`, `cursosDaTrilha`, `trilhasDoCurso`, `cursosRelacionados`, `urlDoCurso`.
- **Verificação no build**: slug único e válido, trilhas sem curso inexistente, todo curso em
  alguma trilha, `palavraChave` sem repetição.

Campos vazios (`descricao: ''`, `paraQuem: []`, `aprendizados: []`, `formato`/`cargaHoraria`
ausentes) aparecem como `[PREENCHER]` na página do curso. **Não preencher com texto inventado.**

## `trilhas.ts`

As 5 trilhas, na ordem da área de membros, e a ordem dos cursos em cada uma. Um slug pode estar em
mais de uma trilha (ex.: "Como ler a sua Bíblia").

## `faq.ts`

`faqGeral`: 9 perguntas com textos definitivos do cliente. Cada item: `pergunta`, `resposta`,
`lista?` (itens em `<ul>`), `pendente?` (vira `[PREENCHER]`). "Quanto custa?" monta os preços a
partir de `cursos.ts`. As páginas de curso mostram as 3 primeiras perguntas.

## `site.ts`

`nome`, `nomeCurto`, `descricaoPadrao`, imagem e alt do Open Graph, `contato` (e-mail, WhatsApp,
horário), `redes`, `empresa` (razão social, CNPJ) e `navegacao` (menu). Contato e CNPJ estão
vazios: o e-mail é pedido na Política de Privacidade; o WhatsApp é a alternativa do botão de compra;
o CNPJ entra no rodapé.

## Receitas

**Mudar preço ou parcela** → editar o plano em `cursos.ts`. Cards, FAQ, descriptions das páginas
de curso e o selo "Melhor custo" acompanham. Conferir se bate com a página da Kiwify.

**Trocar um link de checkout** → `linkKiwify` do plano em `cursos.ts`. Nada mais.

**Adicionar um curso**
1. Copiar a capa para `src/assets/cursos/<slug>.png` (ideal 1080×1350, 4:5).
2. Acrescentar o objeto em `cursos.ts` (slug em kebab-case, `palavraChave` única).
3. Pôr o slug na trilha certa em `trilhas.ts`.
4. `npm run build`: a verificação de integridade acusa qualquer inconsistência.

**Liberar um curso em preparação** → `status: 'disponivel'`. A página deixa de avisar.

**Alterar uma resposta do FAQ** → `faq.ts`. Preço nunca escrito à mão: usar `formatarReais` e
`ofertaDestaque`.

**Preencher CNPJ, e-mail etc.** → `site.ts`. Depois tirar o item do `PENDENCIAS.md`.

## Regras de conteúdo

- Textos enviados pelo cliente entram como ele mandou; só se ajusta grafia (maiúsculas no meio da
  frase, "APRISCO" em caixa-alta, erros de digitação evidentes como "Sevir"). Se ele mandar um
  número diferente do real (ex.: "R$ 19,90" quando a Kiwify cobra 19,86), use o real e avise.
- Textos de interface em caixa normal; caixa-alta só onde o cliente pediu (botões) ou a marca exige.
- Botões de compra: "ASSINAR AGORA" (principal), "QUERO COMEÇAR AGORA" e "QUERO COMEÇAR MEUS
  ESTUDOS AGORA" (seções 2 e 3), "ASSINAR" (mensal). Sem ponto de exclamação.
- Temas sensíveis (sexualidade, namoro, família, escatologia) passam por revisão doutrinária do
  cliente (`revisaoSensivel: true`).
