# 06 — Conteúdo, catálogo de cursos e copy

## Regra central

O catálogo foi **lido das capas e de prints da área de membros**. Os textos das seções da home e do
FAQ foram **enviados pelo cliente** (2026-10-06). O que ainda falta aparece como `[PREENCHER]` e está
no `PENDENCIAS.md`. **Nunca complete com texto inventado.** A fonte dos dados é `src/data/cursos.ts`;
esta tabela é um retrato e pode ficar para trás.

## Catálogo por trilha (20 cursos, 5 trilhas)

Cada curso tem **uma página única** (`/cursos/<slug>`). As chamadas vêm das capas; as marcadas com
"conferir" ainda aguardam a redação final do cliente.

### Crescimento espiritual

| Curso | Slug | Chamada |
|---|---|---|
| Fundamentos da Fé | `fundamentos-da-fe` | Introdução ao evangelho e à vida cristã. |
| Escola de Oração | `escola-de-oracao` | Aprenda a orar como Jesus e os apóstolos. |
| Como ler a sua Bíblia | `como-ler-a-sua-biblia` | Aprendendo a ouvir a voz de Deus e construindo uma relação de amor com as Escrituras. |
| Caráter Cristão | `carater-cristao` | Desenvolvendo o caráter cristão por meio da obra do Espírito Santo. |
| Dons Espirituais | `dons-espirituais` | Descubra como servir a Deus através dos dons do Espírito disponíveis para você. |

### Teologia sistemática: introdução

| Curso | Slug | Chamada |
|---|---|---|
| Teontologia | `teontologia` | Aprenda sobre o ser de Deus: seus atributos, sua natureza, seu caráter e seu poder. |
| Cristologia | `cristologia` | Aprenda sobre os mistérios de Cristo na Palavra de Deus. |
| Escatologia (em preparação) | `escatologia` | Estude a doutrina do fim dos tempos. |
| Antropologia Bíblica (em preparação) | `antropologia-biblica` | Aprenda sobre a criação, a natureza e o propósito final da humanidade. |
| Pneumatologia (em preparação) | `pneumatologia` | Aprenda sobre a natureza e o ministério do Espírito Santo. |

### Teologia para o dia a dia

| Curso | Slug | Chamada |
|---|---|---|
| Cosmovisão Cristã | `cosmovisao-crista` | Interpretando o mundo à luz da Palavra de Deus. |
| Teologia Digital | `teologia-digital` | Vivendo para a glória de Deus na era da internet. |
| Teologia do Corpo | `teologia-do-corpo` | Restaurando uma visão bíblica de corpo num mundo caído. |
| Fé e Trabalho | `fe-e-trabalho` | Glorificando a Deus num mundo caído. (conferir) |
| Escola de Sexualidade Bíblica | `escola-de-sexualidade-biblica` | Colocando em ordem identidade, desejos e emoções fora do lugar. |

### Conheça sua Bíblia

| Curso | Slug | Chamada |
|---|---|---|
| Como ler a sua Bíblia | (mesma página de `como-ler-a-sua-biblia`) | aparece também nesta trilha |
| Panorama do Novo Testamento | `panorama-novo-testamento` | Mergulhe numa jornada entre os Evangelhos, Atos, Cartas e Apocalipse. (conferir) |
| Panorama do Antigo Testamento | `panorama-antigo-testamento` | Descubra a beleza da revelação de Deus nas páginas do Antigo Testamento e compreenda toda a sua estrutura bíblica. (conferir) |

### Família e relacionamentos

| Curso | Slug | Chamada |
|---|---|---|
| Salve a sua Família | `salve-a-sua-familia` | Vivendo a restauração e os propósitos de Deus para o casamento. |
| Namoro Cristão | `namoro-cristao` | Vivendo um relacionamento para a glória de Deus e aprendendo a controlar o fogo no parquinho enquanto esperam. (conferir: expressão informal) |
| Encontre a Pessoa Certa | `encontre-a-pessoa-certa` | Escolha de maneira bíblica e viva um casamento abençoado. |

O curso **FLM** e a trilha **"Treinamento e capacitação"** foram retirados do site pelo cliente (2026-10-05).

### Observações

- O cadeado da área de membros significa **curso em preparação** (status `em-breve`). A assinatura já
  dá acesso a eles. Na vitrine aparecem iguais aos outros; a página do curso avisa que está em preparação.
- Cursos sobre temas sensíveis (Escatologia, Teologia do Corpo, Escola de Sexualidade Bíblica, Salve
  a sua Família, Namoro Cristão, Encontre a Pessoa Certa) têm `revisaoSensivel: true` e exigem
  **revisão do cliente** antes de qualquer texto novo.
- O nome "Teontologia" é o usado pela escola; mantenha-o. O texto da página pode explicar "o estudo
  sobre Deus" sem trocar o nome oficial.
- O arquivo da capa diz "Escola de Sexologia Bíblica"; o site usa "Sexualidade" (a confirmar).

## Estrutura da home (como está)

Detalhe seção por seção, com os textos, em `docs/projeto/03-home.md`.

1. **Topo:** assinatura da marca + `h1` "Estude teologia de maneira profunda e descomplicada." +
   parágrafo do cliente + mural de capas. Sem botão nem preço.
2. **Por que escolher a APRISCO?** Quatro frases do cliente + "QUERO COMEÇAR AGORA".
3. **Uma fé rasa, uma vida rasa** (`#sobre`): manifesto do cliente + "QUERO COMEÇAR MEUS ESTUDOS AGORA".
4. **O que a assinatura inclui:** quatro itens do cliente + "ASSINAR AGORA".
5. **Escolha por onde começar** (`#cursos`): as cinco trilhas, capa e nome de cada curso, card "E mais".
6. **Como funciona:** quatro passos do cliente.
7. **Acesso a todos os cursos** (`#assinatura`): card anual (grande) e mensal (pequeno).
8. **Dúvidas antes de assinar** (`#duvidas`): FAQ do cliente.
9. **Fechamento:** frase + "ASSINAR AGORA".

"Para quem é", "Quem ensina" e "Depoimentos" **não** existem na home: entram só com material real.

## Estrutura da página de curso (como está)

1. Breadcrumbs (Início › Curso) e as trilhas do curso (links para a home).
2. `h1`: nome do curso + chamada.
3. Descrição curta (2 a 4 frases) — hoje `[PREENCHER]` em todos.
4. Botão "ASSINAR AGORA" e "Incluído na assinatura: 12x de R$ 19,86". Nos cursos em preparação, aviso de que já está incluído.
5. **O que você vai estudar** (módulos) — `[PREENCHER]`.
6. **Para quem é este curso** — `[PREENCHER]`.
7. **Como funciona** (ficha: situação, acesso, formato, carga horária, certificado). Formato e carga horária em `[PREENCHER]`; certificado preenchido com a resposta do FAQ.
8. **Planos** (versão compacta).
9. **Perguntas frequentes** (as 3 primeiras do FAQ geral).
10. **Cursos relacionados** (links internos).

## Regras de copy

- Frases curtas, voz ativa, verbos de ação. Falar com a pessoa ("você").
- Específico vence esperto: "Aprenda a ler os evangelhos com atenção ao contexto" é melhor que "Transforme sua jornada".
- Sem exagero, sem promessa de resultado garantido, sem urgência falsa ("últimas vagas" só se for verdade).
- Sem jargão teológico sem explicação na primeira ocorrência.
- Linguagem acolhedora para quem está começando.
- Citações bíblicas: referência completa e tradução indicada.
- Cada descrição de curso é **única** (não copiar a estrutura palavra por palavra entre cursos).
- **Textos do cliente entram como ele mandou**; ajuste só a grafia (maiúsculas no meio da frase,
  "APRISCO" em caixa-alta, erro de digitação evidente). Número que não bate com a Kiwify: use o real
  e avise.
- Botões: "ASSINAR AGORA", "QUERO COMEÇAR AGORA", "QUERO COMEÇAR MEUS ESTUDOS AGORA", "ASSINAR"
  (mensal). Maiúsculas, sem "!". Mesmo nome para a mesma ação em todo o site.
- Preço nunca digitado em texto: sempre de `cursos.ts`.
- Rótulos de conteúdo ausente: `[PREENCHER: …]` visível, e entrada em `PENDENCIAS.md`.

## Páginas institucionais

- **Sobre e Contato não são páginas.** "Sobre" é a seção do manifesto na home; o contato foi
  retirado do site pelo cliente.
- **Política de privacidade e Termos de uso:** rascunhos com aviso visível de revisão jurídica.
  Citam que o pagamento é processado pela Kiwify. Faltam controlador, CNPJ, e-mail do encarregado,
  hospedagem, analytics, regras de renovação e foro (ver `PENDENCIAS.md`).

## `PENDENCIAS.md`

Lista viva na raiz, organizada por prioridade: bloqueiam o lançamento, conteúdo do cliente,
confirmações rápidas, melhorias, manter atualizado. Atualize sempre que algo for resolvido ou surgir.
