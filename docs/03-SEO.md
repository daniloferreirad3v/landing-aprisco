# 03 — SEO: técnico, de conteúdo e dados estruturados

O Google não se importa com onde o site está hospedado. Ele avalia o HTML que consegue ler, a velocidade, a clareza do conteúdo, a estrutura e a autoridade (links de outros sites). Este documento cobre o que o código controla.

## Princípios

1. **HTML completo no servidor.** Todo conteúdo importante precisa estar no HTML gerado no build, nunca montado só por JavaScript no navegador.
2. **Uma página, uma intenção, uma palavra-chave principal.** Cada URL responde a uma busca específica.
3. **Termos de nicho vencem termos genéricos.** "Curso de teologia" é disputado demais para um domínio novo. Mire em buscas específicas: "curso de cristologia", "como ler a Bíblia", "curso de escatologia", "o que é cosmovisão cristã".
4. **Cada página única tem seu próprio `title`, `description`, `h1`, canonical e imagem de compartilhamento.**
5. **Nunca prometa o que não existe.** Dado estruturado ou meta tag que contradiz o conteúdo visível prejudica o site.

## Mapa de palavras-chave

A palavra-chave de cada curso fica no campo `palavraChave` de `src/data/cursos.ts` (fonte única), e o
build **quebra** se duas páginas usarem a mesma. As atuais são propostas e precisam ser validadas
com o cliente (`PENDENCIAS.md`).

| Página | Palavra-chave principal | Intenção |
|---|---|---|
| `/` | proposta: seminário teológico online (validar) | comercial |
| `/cursos/escola-de-oracao` | curso de oração | comercial |
| `/cursos/cristologia` | curso de cristologia | comercial |
| `/cursos/escatologia` | curso de escatologia | comercial |
| `/cursos/como-ler-a-sua-biblia` | como ler a Bíblia | comercial/informacional |
| … (demais cursos) | ver `cursos.ts` | comercial |

Regra: duas páginas não podem disputar a mesma palavra-chave principal (canibalização). Se duas
parecem iguais, ajuste uma delas para uma variação mais específica.

## `<head>` de cada página (componente `Base.astro`)

Itens obrigatórios:

- `<html lang="pt-BR">`
- `<meta charset="utf-8">` e `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>` único, até 65 caracteres, com a palavra-chave no início e a marca no fim. Fórmula: `Curso de Cristologia | Seminário Teológico APRISCO`. A função `montarTitulo` (`src/lib/seo.ts`) encurta a marca para "APRISCO" quando passa do limite.
- `<meta name="description">` único, entre 120 e 165 caracteres (nas páginas de curso, montado por `descricaoDoCurso`), escrito para convencer o clique (a descrição não é fator direto de ranking, mas influencia o clique).
- `<link rel="canonical">` com URL **absoluta** e igual à versão oficial (o `site` do `astro.config.mjs` precisa estar definido).
- `<meta name="robots" content="noindex, nofollow">` **somente** em páginas que não devem aparecer no Google (404, páginas de teste). Nunca em produção por engano.
- `theme-color` com a cor de fundo da marca.
- Favicons: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`.
- **Open Graph:** `og:type`, `og:title`, `og:description`, `og:url`, `og:image` (1200×630, URL absoluta), `og:image:alt`, `og:locale` = `pt_BR`, `og:site_name`.
- **Twitter/X:** `twitter:card` = `summary_large_image`, mais título, descrição e imagem.
- `<meta name="keywords">`: **não usar** (o Google ignora).

### Esqueleto do `Base.astro`

```astro
---
// src/layouts/Base.astro
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
}

const {
  title,
  description,
  canonicalPath = Astro.url.pathname,
  ogImage = '/og/default.jpg',
  ogImageAlt = 'Seminário Teológico APRISCO',
  noindex = false,
  type = 'website',
} = Astro.props;

const canonical = new URL(canonicalPath, Astro.site).href;
const ogImageUrl = new URL(ogImage, Astro.site).href;
---
<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    <meta name="theme-color" content="#000000" />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <meta property="og:type" content={type} />
    <meta property="og:site_name" content="Seminário Teológico APRISCO" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:image:alt" content={ogImageAlt} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageUrl} />

    <slot name="head" />
  </head>
  <body>
    <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
    <slot />
  </body>
</html>
```

## Dados estruturados (JSON-LD)

Componente simples, reutilizável:

```astro
---
// src/components/JsonLd.astro
const { data } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

Use em `<Fragment slot="head">` dentro da página. Tipos a implementar:

### Em todas as páginas: `Organization` (ou `EducationalOrganization`) e `WebSite`

```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Seminário Teológico APRISCO",
  "url": "https://[DOMINIO]",
  "logo": "https://[DOMINIO]/logo.png",
  "sameAs": ["https://instagram.com/[PERFIL]"]
}
```

### Em cada página de curso: `Course`

```json
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Cristologia",
  "description": "[descrição real do curso]",
  "inLanguage": "pt-BR",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Seminário Teológico APRISCO",
    "sameAs": "https://[DOMINIO]"
  }
}
```

Regras do `Course`:

- Exigem-se `name`, `description` e `provider`. O resto é opcional.
- Só adicione `offers` (preço) se o valor estiver **confirmado** e igual ao da Kiwify.
- Só adicione `hasCourseInstance`, carga horária ou modalidade se existirem de fato.

### Em subpáginas: `BreadcrumbList`

Gerado pelo componente `Breadcrumbs.astro` a partir da mesma lista do visível (ex.: Início › Cristologia; não existe página de catálogo no meio).

### Sobre o FAQ

Marcar perguntas com `FAQPage` é opcional. Desde 2023 o Google limitou os resultados enriquecidos de FAQ a poucos tipos de site, então não conte com esse destaque. O bloco de perguntas continua útil para o visitante e para o texto da página.

### Não fazer

- `Review`, `AggregateRating` ou estrelas sem avaliações reais, públicas e verificáveis. É contra as diretrizes do Google e pode gerar ação manual.
- Dados estruturados sobre conteúdo que não aparece na página.

Valide tudo no **Teste de Resultados Pesquisáveis** do Google (Rich Results Test) e no validador do schema.org.

## SEO técnico

- `astro.config.mjs` com `site: 'https://[DOMINIO]'` e `trailingSlash` definido de forma consistente (escolha `'never'` ou `'always'` e mantenha).
- **Sitemap** com `@astrojs/sitemap`. Excluir 404 e páginas noindex.
- **`robots.txt`** gerado por `src/pages/robots.txt.ts` a partir de `site` (o domínio fica num lugar só):
  ```
  User-agent: *
  Allow: /

  Sitemap: https://[DOMINIO]/sitemap-index.xml
  ```
- **Demonstração fora do Google:** o `vercel.json` envia `X-Robots-Tag: noindex` para qualquer `*.vercel.app`. O domínio oficial não recebe esse cabeçalho.
- **Domínio canônico único:** escolha com ou sem `www` e redirecione o outro com 301 (configurar na Vercel).
- **HTTPS** sempre; nenhuma referência `http://` no código.
- **404 personalizada** com links úteis (volta para a home e para os cursos, `/#cursos`).
- **URLs** curtas, em minúsculas, sem acento, com a palavra-chave: `/cursos/escola-de-oracao`.
- Se uma URL mudar, adicionar redirecionamento 301 em `astro.config.mjs` ou `vercel.json`.
- **Links internos:** cada página de curso aponta para cursos relacionados e para as trilhas na home (`/#trilha-<id>`). As capas da home **não** são links (decisão do single page): o Google encontra as páginas de curso pelo sitemap e pelos relacionados. Âncora descritiva ("curso de cristologia"), nunca "clique aqui".
- **Links externos** para a Kiwify: `<a href="..." rel="noopener">`. Mesma aba, sem `target="_blank"`, para não quebrar o fluxo de compra no celular.

## Performance (Core Web Vitals)

Metas: **LCP < 2,5 s**, **INP < 200 ms**, **CLS < 0,1**, medidas no celular.

- Imagens com `astro:assets` (`<Image />`/`<Picture />`): AVIF/WebP, `width` e `height` sempre, `sizes` corretos.
- Imagens da primeira tela (mural de capas do topo) usam `loading="eager"`. Todas as outras, `loading="lazy"` e `decoding="async"`. As capas da vitrine **não** são prioritárias: ela fica longe do topo.
- O topo é tipográfico (o `h1` é o maior elemento) com o mural de capas em `<img>` reais, **não** `background-image` em CSS.
- Fontes em `woff2` locais: Anton e Montserrat (variável 400–600), com `font-display: swap`, `<link rel="preload">` nas duas e uma fonte de reserva com métricas ajustadas (evita o pulo de layout; CLS 0).
- JavaScript no cliente: o mínimo. O menu do celular é `<details>`; o único script fecha o menu ao tocar num link. Animações de rolagem são CSS puro (`animation-timeline`).
- Sem bibliotecas de animação. Sem carrosséis automáticos.
- CSS crítico enxuto; evite arquivos gigantes.
- Testar no PageSpeed Insights e no Lighthouse (celular) a cada fase.

## SEO de conteúdo

- Texto real em cada página, de preferência 300 palavras ou mais nas páginas de curso, em linguagem natural (sem repetir a palavra-chave de forma forçada).
- Responder às perguntas que a pessoa tem antes de comprar: para quem é, o que vai estudar, como funciona, quanto tempo, o que acontece depois de comprar, como pedir reembolso.
- **Não duplicar textos** entre páginas de curso. Cada descrição é única.
- Imagens com `alt` descritivo (ver `04-HTML-SEMANTICO.md`).
- **E-E-A-T** (experiência, especialização, autoridade, confiança): seção "Sobre" da home (hoje o manifesto) e, quando houver material real, professores, declaração de fé e depoimentos; política de privacidade e termos. Para conteúdo religioso e de relacionamento/família, a credibilidade do autor pesa.

## Medição

- **Google Search Console:** verificar o domínio (registro DNS TXT), enviar o sitemap, acompanhar consultas e páginas indexadas.
- **Analytics:** escolher uma ferramenta leve (Plausible, Umami ou GA4). Se usar cookies ou pixels de anúncio (Meta Pixel, GA4), avaliar aviso de cookies e a política de privacidade conforme a LGPD, preferencialmente com orientação jurídica.
- Os botões de compra devem ser mensuráveis (evento de clique), para saber quais cursos geram interesse.
- Verificar na Kiwify como instalar pixels e se o checkout preserva UTMs; consultar a documentação deles.

## Checklist de SEO por página (cola no PR)

- [ ] `title` único (≤ 65 caracteres) com a palavra-chave
- [ ] `description` única (120–165 caracteres)
- [ ] Canonical absoluto correto
- [ ] Um `h1`, hierarquia `h2`/`h3` sem pulos
- [ ] Open Graph e Twitter Card com imagem 1200×630
- [ ] JSON-LD correto e validado
- [ ] Imagens com `alt`, `width`, `height`; `eager` só na primeira tela, `lazy` no resto
- [ ] Links internos relevantes com âncora descritiva
- [ ] Está no sitemap; não está bloqueada no robots
- [ ] Lighthouse mobile: Performance, Acessibilidade, SEO e Boas práticas acima de 90
