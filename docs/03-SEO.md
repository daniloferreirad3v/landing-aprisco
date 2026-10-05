# 03 — SEO: técnico, de conteúdo e dados estruturados

O Google não se importa com onde o site está hospedado. Ele avalia o HTML que consegue ler, a velocidade, a clareza do conteúdo, a estrutura e a autoridade (links de outros sites). Este documento cobre o que o código controla.

## Princípios

1. **HTML completo no servidor.** Todo conteúdo importante precisa estar no HTML gerado no build, nunca montado só por JavaScript no navegador.
2. **Uma página, uma intenção, uma palavra-chave principal.** Cada URL responde a uma busca específica.
3. **Termos de nicho vencem termos genéricos.** "Curso de teologia" é disputado demais para um domínio novo. Mire em buscas específicas: "curso de cristologia", "como ler a Bíblia", "curso de escatologia", "o que é cosmovisão cristã".
4. **Cada página única tem seu próprio `title`, `description`, `h1`, canonical e imagem de compartilhamento.**
5. **Nunca prometa o que não existe.** Dado estruturado ou meta tag que contradiz o conteúdo visível prejudica o site.

## Mapa de palavras-chave (preencher e manter atualizado)

| Página | Palavra-chave principal | Variações / buscas relacionadas | Intenção |
|---|---|---|---|
| `/` | `[PREENCHER]` | seminário teológico online, estudar teologia online | comercial |
| `/cursos/fundamentos-da-fe` | `[PREENCHER]` | | comercial |
| `/cursos/escola-de-oracao` | curso de oração | como aprender a orar | comercial |
| `/cursos/cristologia` | curso de cristologia | quem é Jesus teologia | comercial |
| `/cursos/escatologia` | curso de escatologia | fim dos tempos bíblico | comercial |
| `/cursos/como-ler-a-sua-biblia` | como ler a Bíblia | estudo bíblico para iniciantes | comercial/informacional |
| … | | | |

Regra: duas páginas não podem disputar a mesma palavra-chave principal (canibalização). Se duas parecem iguais, uma delas deve virar artigo de blog que aponta para a outra.

## `<head>` de cada página (componente `Base.astro`)

Itens obrigatórios:

- `<html lang="pt-BR">`
- `<meta charset="utf-8">` e `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>` único, de preferência até cerca de 60 caracteres, com a palavra-chave no início e a marca no fim. Fórmula: `Curso de Cristologia | Seminário Teológico APRISCO`.
- `<meta name="description">` único, entre 140 e 160 caracteres, escrito para convencer o clique (a descrição não é fator direto de ranking, mas influencia o clique).
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

Casa com o componente `Breadcrumbs.astro` (ex.: Início › Cursos › Cristologia).

### No catálogo: `ItemList`

Lista dos cursos com nome e URL de cada um.

### No blog: `BlogPosting`

Título, data de publicação e de modificação (ISO 8601), autor real, imagem, `mainEntityOfPage`.

### Sobre o FAQ

Marcar perguntas com `FAQPage` é opcional. Desde 2023 o Google limitou os resultados enriquecidos de FAQ a poucos tipos de site, então não conte com esse destaque. O bloco de perguntas continua útil para o visitante e para o texto da página.

### Não fazer

- `Review`, `AggregateRating` ou estrelas sem avaliações reais, públicas e verificáveis. É contra as diretrizes do Google e pode gerar ação manual.
- Dados estruturados sobre conteúdo que não aparece na página.

Valide tudo no **Teste de Resultados Pesquisáveis** do Google (Rich Results Test) e no validador do schema.org.

## SEO técnico

- `astro.config.mjs` com `site: 'https://[DOMINIO]'` e `trailingSlash` definido de forma consistente (escolha `'never'` ou `'always'` e mantenha).
- **Sitemap** com `@astrojs/sitemap`. Excluir 404 e páginas noindex.
- **`public/robots.txt`:**
  ```
  User-agent: *
  Allow: /

  Sitemap: https://[DOMINIO]/sitemap-index.xml
  ```
- **Domínio canônico único:** escolha com ou sem `www` e redirecione o outro com 301 (configurar na Vercel).
- **HTTPS** sempre; nenhuma referência `http://` no código.
- **404 personalizada** com links úteis (volta para a home e para o catálogo).
- **URLs** curtas, em minúsculas, sem acento, com a palavra-chave: `/cursos/escola-de-oracao`.
- Se uma URL mudar, adicionar redirecionamento 301 em `astro.config.mjs` ou `vercel.json`.
- **Links internos:** a home aponta para cada curso; cada curso aponta para cursos relacionados e para artigos do blog; cada artigo aponta para o curso relacionado. Âncora descritiva ("curso de cristologia"), nunca "clique aqui".
- **Links externos** para a Kiwify: `<a href="..." rel="noopener">`. Mesma aba, sem `target="_blank"`, para não quebrar o fluxo de compra no celular.

## Performance (Core Web Vitals)

Metas: **LCP < 2,5 s**, **INP < 200 ms**, **CLS < 0,1**, medidas no celular.

- Imagens com `astro:assets` (`<Image />`/`<Picture />`): AVIF/WebP, `width` e `height` sempre, `sizes` corretos.
- A imagem principal da dobra (hero) usa `loading="eager"` e `fetchpriority="high"`. Todas as outras, `loading="lazy"` e `decoding="async"`.
- O hero é um `<img>` real (ou `<Picture>`), **não** `background-image` em CSS, para o navegador priorizar.
- Fontes em `woff2` locais, no máximo 2 famílias e 3–4 pesos, com `font-display: swap` e `<link rel="preload">` só para a fonte do título.
- JavaScript no cliente: o mínimo. Menu mobile pode ser feito com `<details>` ou CSS. Se precisar de script, uma "ilha" Astro pequena.
- Sem bibliotecas de animação. Sem carrosséis automáticos.
- CSS crítico enxuto; evite arquivos gigantes.
- Testar no PageSpeed Insights e no Lighthouse (celular) a cada fase.

## SEO de conteúdo

- Texto real em cada página, de preferência 300 palavras ou mais nas páginas de curso, em linguagem natural (sem repetir a palavra-chave de forma forçada).
- Responder às perguntas que a pessoa tem antes de comprar: para quem é, o que vai estudar, como funciona, quanto tempo, o que acontece depois de comprar, como pedir reembolso.
- **Não duplicar textos** entre páginas de curso. Cada descrição é única.
- Imagens com `alt` descritivo (ver `04-HTML-SEMANTICO.md`).
- Datas visíveis e `dateModified` nos artigos do blog, mantidos atualizados.
- **E-E-A-T** (experiência, especialização, autoridade, confiança): página "Sobre" com professores reais, declaração de fé (se houver), contato, política de privacidade e termos. Para conteúdo religioso e de relacionamento/família, a credibilidade do autor pesa.

### Blog: ideias de clusters (sugestões, validar doutrinariamente com o cliente)

| Cluster | Artigo (pergunta real) | Aponta para |
|---|---|---|
| Ler a Bíblia | Como ler a Bíblia: por onde começar | `/cursos/como-ler-a-sua-biblia` |
| Ler a Bíblia | Panorama do Antigo e do Novo Testamento em linguagem simples | cursos de panorama |
| Doutrinas | O que é cristologia e por que importa | `/cursos/cristologia` |
| Doutrinas | O que é escatologia? Visão geral dos temas | `/cursos/escatologia` |
| Doutrinas | Quem é o Espírito Santo segundo a Bíblia (pneumatologia) | `/cursos/pneumatologia` |
| Vida prática | O que é cosmovisão cristã | `/cursos/cosmovisao-crista` |
| Vida prática | Fé e trabalho: como viver a vocação | `/cursos/fe-e-trabalho` |
| Família | Princípios bíblicos para o namoro | `/cursos/namoro-cristao` |
| Oração | Como aprender a orar: o exemplo de Jesus | `/cursos/escola-de-oracao` |

Cada artigo: um `h1`, introdução que responde direto, subtítulos `h2` em forma de pergunta quando fizer sentido, conclusão com chamada para o curso relacionado, autor real e data.

## Medição

- **Google Search Console:** verificar o domínio (registro DNS TXT), enviar o sitemap, acompanhar consultas e páginas indexadas.
- **Analytics:** escolher uma ferramenta leve (Plausible, Umami ou GA4). Se usar cookies ou pixels de anúncio (Meta Pixel, GA4), avaliar aviso de cookies e a política de privacidade conforme a LGPD, preferencialmente com orientação jurídica.
- Os botões de compra devem ser mensuráveis (evento de clique), para saber quais cursos geram interesse.
- Verificar na Kiwify como instalar pixels e se o checkout preserva UTMs; consultar a documentação deles.

## Checklist de SEO por página (cola no PR)

- [ ] `title` único (≈60 caracteres) com a palavra-chave
- [ ] `description` única (140–160 caracteres)
- [ ] Canonical absoluto correto
- [ ] Um `h1`, hierarquia `h2`/`h3` sem pulos
- [ ] Open Graph e Twitter Card com imagem 1200×630
- [ ] JSON-LD correto e validado
- [ ] Imagens com `alt`, `width`, `height`; hero com `fetchpriority="high"`
- [ ] Links internos relevantes com âncora descritiva
- [ ] Está no sitemap; não está bloqueada no robots
- [ ] Lighthouse mobile: Performance, Acessibilidade, SEO e Boas práticas acima de 90
