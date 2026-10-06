# 02 — Estrutura do projeto, rotas e componentes

Descrição mais completa (fluxo dos dados, SEO, deploy) em `docs/projeto/02-arquitetura.md` e
`docs/projeto/04-componentes.md`.

## Pastas

```
landing-aprisco/
├── AGENTS.md                     # ponto de entrada para agentes de IA
├── CLAUDE.md
├── PROMPT-INICIAL.md             # registro das fases de construção
├── PENDENCIAS.md                 # lista viva do que falta
├── .claude/skills/               # skills de SEO e design
├── design/                       # identidade de origem (nunca alterar)
├── docs/                         # estes documentos + design-plan.md + projeto/
├── public/
│   ├── favicon.svg, favicon.ico, apple-touch-icon.png
│   ├── og/default.jpg            # 1200x630
│   ├── logo/                     # cordeiro em SVG (branco/preto) e PNG
│   └── fonts/                    # Anton e Montserrat (woff2, OFL)
├── src/
│   ├── assets/cursos/            # capas por curso (<slug>.png), processadas pelo Astro
│   ├── components/
│   │   ├── Header.astro          # cabeçalho fixo; só o cordeiro + menu
│   │   ├── Footer.astro          # marca, navegação, selo de pagamento seguro, links legais
│   │   ├── Logo.astro            # cordeiro via <svg><use>
│   │   ├── AssinaturaMarca.astro # "SEMINÁRIO TEOLÓGICO / APRISCO" + cordeiro (topo)
│   │   ├── Hero.astro
│   │   ├── MuralCapas.astro      # mural de capas do topo
│   │   ├── CursoCard.astro
│   │   ├── TrilhaSection.astro   # uma trilha + seus cards (+ card "E mais")
│   │   ├── CtaButton.astro       # único componente que gera links de compra
│   │   ├── Planos.astro          # cards anual e mensal (#assinatura)
│   │   ├── FormasPagamento.astro # fichas Visa, Mastercard, Elo, Pix
│   │   ├── Faq.astro             # <details>/<summary>
│   │   ├── Breadcrumbs.astro     # visível + JSON-LD BreadcrumbList
│   │   ├── Preencher.astro       # marcador [PREENCHER: ...]
│   │   └── JsonLd.astro
│   ├── data/
│   │   ├── site.ts               # nome, descrições, contato, CNPJ, menu
│   │   ├── trilhas.ts            # trilhas e a ordem dos cursos
│   │   ├── cursos.ts             # FONTE ÚNICA: cursos, planos, preços, links Kiwify
│   │   └── faq.ts                # perguntas e respostas (texto do cliente)
│   ├── lib/seo.ts                # montagem de <title> e description
│   ├── layouts/
│   │   ├── Base.astro            # <head> completo + skip link + header/main/footer
│   │   └── Pagina.astro          # páginas de texto (políticas)
│   ├── pages/
│   │   ├── index.astro           # home, página única
│   │   ├── cursos/[slug].astro   # página de cada curso (gerada de cursos.ts)
│   │   ├── politica-de-privacidade.astro
│   │   ├── termos-de-uso.astro
│   │   ├── 404.astro
│   │   ├── teste.astro           # vitrine de componentes; noindex; REMOVER antes do lançamento
│   │   └── robots.txt.ts         # gerado a partir de `site`
│   └── styles/
│       ├── tokens.css            # todas as cores, fontes, tamanhos e espaços
│       ├── reset.css
│       └── global.css            # base, utilitários e animações de rolagem
├── astro.config.mjs              # `site` resolvido por variável de ambiente
├── vercel.json                   # cabeçalhos, cache e noindex em *.vercel.app
├── tsconfig.json
└── package.json
```

Não existem: catálogo (`/cursos`), `/sobre`, `/contato`, blog (`src/content`, `/blog`, layout de
artigo), componente de depoimentos nem barra fixa de assinatura.

## Fonte única de dados: `src/data/cursos.ts`

Todo curso é um objeto. Páginas, cards, sitemap e dados estruturados leem daqui.

```ts
export interface Curso {
  slug: string;              // vira /cursos/<slug>
  nome: string;              // nome de exibição
  tituloSeo: string;         // início do <title>
  trilha: TrilhaId;          // trilha principal
  chamada: string;           // frase curta transcrita da capa
  descricao: string;         // 2–4 frases; "" = [PREENCHER]
  paraQuem: string[];        // [] = [PREENCHER]
  aprendizados: string[];    // módulos/temas; [] = [PREENCHER]
  formato?: string;          // ausente = [PREENCHER]
  cargaHoraria?: string;     // ausente = [PREENCHER]
  professor?: string;
  palavraChave: string;      // termo principal da página (única entre os cursos)
  status: 'disponivel' | 'em-breve';
  revisaoSensivel?: boolean; // tema que exige revisão doutrinária
  capa?: ImageMetadata;      // ligada automaticamente: src/assets/cursos/<slug>.png
}

// Venda por ASSINATURA: preço e link ficam nos planos, não no curso.
export const assinatura = {
  incluiCursosEmPreparacao: true,
  planos: [
    { id: 'mensal', nome: 'Plano mensal', valor: 37, periodo: 'por mês', linkKiwify: '…' },
    { id: 'anual', nome: 'Plano anual', valor: 192, periodo: 'à vista, por ano',
      parcelas: { quantidade: 12, valor: 19.86 }, linkKiwify: '…' },
  ],
};
// ofertaDestaque: o anual parcelado ("12x de R$ 19,86"), com à vista e total a prazo calculados.
```

Regras:

- Se o `linkKiwify` de um plano estiver vazio, o `CtaButton` mostra a alternativa (WhatsApp, se
  houver, ou "Assinatura indisponível no momento"), **nunca** um botão quebrado.
- Curso `em-breve` mantém a página pública, sem prometer prazo de lançamento. A assinatura dá
  acesso a ele (confirmado pelo cliente). Na vitrine aparece igual aos outros.
- Um curso que aparece em duas trilhas (como "Como ler a sua Bíblia") tem **uma única página e uma
  única URL**.
- O build quebra se houver slug duplicado, trilha com curso inexistente, curso fora de trilha ou
  `palavraChave` repetida.

## Rotas e intenção de cada página

| Rota | Função | Palavra-chave principal |
|---|---|---|
| `/` | Landing de vendas em página única: topo, por que escolher, manifesto (`#sobre`), o que inclui, vitrine (`#cursos`), como funciona, planos (`#assinatura`), dúvidas (`#duvidas`), fechamento | proposta: seminário teológico online (validar) |
| `/cursos/[slug]` | Porta de entrada pelo Google e anúncios; vende a assinatura a partir de um curso. Não recebe link da home | termo do curso (`palavraChave`) |
| `/politica-de-privacidade`, `/termos-de-uso` | Confiança e LGPD (rascunhos) | não ranqueiam |
| `/404` | Página não encontrada (`noindex`) | — |

## Componente `CtaButton.astro`

Único lugar que cria o link de compra:

- Sem `plano` e sem `destino`, leva ao **checkout anual** (todo botão de compra do site).
- `plano="mensal"` leva ao checkout mensal (só o card mensal).
- `destino` serve para navegação interna, sem checkout.
- Renderiza um `<a>` (é navegação, não formulário) com rótulo de ação: "ASSINAR AGORA",
  "QUERO COMEÇAR AGORA", "ASSINAR". Nunca "Clique aqui".
- Atributos `data-cta`, `data-plano` e `data-curso` prontos para analytics.
- Repassar UTMs ao checkout **somente se** a Kiwify aceitar (ainda não verificado; ver `PENDENCIAS.md`).

## Convenções

- Nomes de arquivo e rotas em minúsculas, sem acento, com hífen: `/cursos/escola-de-oracao`.
- Componentes em PascalCase. Variáveis CSS em `--kebab-case`.
- Texto de interface e conteúdo em pt-BR; nomes de dados do domínio em português (`cursos`, `trilhas`).
- Commits pequenos, um assunto por commit, mensagem em português no imperativo.
