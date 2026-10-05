# 02 — Estrutura do projeto, rotas e componentes

## Pastas

```
aprisco-site/
├── CLAUDE.md
├── PROMPT-INICIAL.md
├── PENDENCIAS.md                 # lista viva do que falta (criar na Fase 0)
├── .claude/skills/               # skills de SEO e design
├── design/                       # identidade visual (LER ANTES DE TUDO)
├── docs/                         # estes documentos
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og/default.jpg            # 1200x630
│   ├── robots.txt
│   └── fonts/                    # fontes locais (woff2)
├── src/
│   ├── assets/                   # imagens processadas pelo Astro
│   │   ├── cursos/               # capas por curso
│   │   └── professor/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── CursoCard.astro
│   │   ├── TrilhaSection.astro   # uma categoria + seus cards
│   │   ├── CtaButton.astro       # único componente que gera links de compra
│   │   ├── Faq.astro             # <details>/<summary>
│   │   ├── Depoimentos.astro     # só renderiza se houver depoimentos reais
│   │   ├── Breadcrumbs.astro
│   │   └── JsonLd.astro
│   ├── content/                  # blog em Markdown/MDX (Fase 4)
│   │   └── blog/
│   ├── data/
│   │   ├── site.ts               # nome, domínio, redes, contato
│   │   ├── trilhas.ts            # categorias e ordem
│   │   └── cursos.ts             # FONTE ÚNICA dos cursos e links Kiwify
│   ├── layouts/
│   │   ├── Base.astro            # <head> completo + skip link + slot
│   │   └── Artigo.astro          # layout do blog
│   ├── pages/
│   │   ├── index.astro
│   │   ├── cursos/
│   │   │   ├── index.astro       # catálogo completo
│   │   │   └── [slug].astro      # página de cada curso (gerada de cursos.ts)
│   │   ├── sobre.astro
│   │   ├── contato.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── politica-de-privacidade.astro
│   │   ├── termos-de-uso.astro
│   │   └── 404.astro
│   └── styles/
│       ├── tokens.css            # variáveis extraídas de /design
│       ├── reset.css
│       └── global.css
├── astro.config.mjs              # com `site` definido
├── vercel.json                   # redirects e cabeçalhos (Fase 5)
├── tsconfig.json
└── package.json
```

## Fonte única de dados: `src/data/cursos.ts`

Todo curso é um objeto. Páginas, cards, sitemap e dados estruturados leem daqui.

```ts
export interface Curso {
  slug: string;              // vira /cursos/<slug>
  nome: string;              // nome de exibição
  trilha: TrilhaId;          // categoria
  chamada: string;           // frase curta (1 linha), para cards e meta description
  descricao: string;         // 2–4 frases, para o topo da página do curso
  paraQuem: string[];        // lista de perfis
  aprendizados: string[];    // o que o aluno vai estudar
  formato?: string;          // [PREENCHER] ex.: videoaulas + material
  cargaHoraria?: string;     // [PREENCHER] só se existir
  professor?: string;        // referência ao cadastro de professores
  capa: string;              // arquivo em src/assets/cursos/
  palavraChave: string;      // termo principal da página (ver 03-SEO.md)
  status: 'disponivel' | 'em-breve';
}

// Modelo de venda confirmado em 2026-10-05: ASSINATURA.
// Um único checkout libera os cursos; preço e link ficam na assinatura, não no curso.
export const assinatura: {
  nome: string;              // [PREENCHER] nome do plano na Kiwify
  planos: Array<{            // confirmados em 2026-10-05
    id: 'mensal' | 'anual';
    valor: number;           // mensal 37.00 · anual 192.00
    parcelas?: string;       // anual: "12x de R$ 19,86"
    linkKiwify: string;      // um checkout por plano; "" = indisponível
  }>;
};
```

Regras:

- Se `assinatura.linkKiwify` estiver vazio, o `CtaButton` mostra a alternativa (WhatsApp/contato), **nunca** um botão quebrado.
- Curso `em-breve` mantém a página pública, mas não promete prazo de lançamento nem que entra na assinatura, até isso ser confirmado.
- Um curso que aparece em duas prateleiras (como "Como ler a sua Bíblia") tem **uma única página e uma única URL**. A ligação com a segunda categoria é só um link. Páginas duplicadas prejudicam o SEO.

## Rotas e intenção de cada página

| Rota | Função | Palavra-chave principal (definir) |
|---|---|---|
| `/` | Landing de vendas institucional | `[PREENCHER]` ex.: seminário teológico online |
| `/cursos` | Catálogo por trilhas | cursos de teologia online |
| `/cursos/[slug]` | Venda de um curso | termo do curso (ex.: curso de cristologia) |
| `/sobre` | Quem somos, doutrina, professores | nome da marca |
| `/contato` | Canais de atendimento | nome da marca + contato |
| `/blog` e `/blog/[slug]` | Tráfego orgânico | perguntas reais do público |
| `/politica-de-privacidade`, `/termos-de-uso` | Confiança e LGPD | não ranqueiam |

## Componente `CtaButton.astro`

Único lugar que cria o link de compra. Responsabilidades:

- Receber `curso` (ou o link geral) e o texto do botão.
- Renderizar um `<a>` (é navegação, não ação de formulário) com texto específico: "Quero me inscrever no curso de Cristologia", em vez de só "Clique aqui".
- Se o curso estiver `em-breve`, renderizar a alternativa (lista de espera/WhatsApp).
- Preservar parâmetros UTM da URL de origem, **somente se** a Kiwify aceitar esse repasse no checkout (verificar na documentação da Kiwify antes de implementar).

## Convenções

- Nomes de arquivo e rotas em minúsculas, sem acento, com hífen: `/cursos/escola-de-oracao`.
- Componentes em PascalCase. Variáveis CSS em `--kebab-case`.
- Texto de interface e conteúdo em pt-BR; nomes de código em inglês ou português de forma consistente (preferir português para dados do domínio, como `cursos`, `trilhas`).
- Commits pequenos, mensagem no imperativo.
