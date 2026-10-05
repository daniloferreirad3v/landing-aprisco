# 04 — HTML semântico, hierarquia de títulos e acessibilidade

HTML semântico ajuda o Google a entender a estrutura da página e ajuda leitores de tela a navegar. Escolha a tag pelo **significado**, não pela aparência. A aparência é trabalho do CSS.

## Regra de ouro

Antes de usar `<div>`, pergunte: existe uma tag que descreve melhor isso? Se existir, use. `<div>` e `<span>` só quando não houver significado a expressar.

## Marcos (landmarks) da página

| Tag | Uso | Quantidade por página |
|---|---|---|
| `<header>` | Cabeçalho do site (logo + menu). Também pode abrir uma `<section>` ou `<article>`. | 1 principal |
| `<nav aria-label="Principal">` | Blocos de navegação. Se houver mais de um, cada um com `aria-label` diferente. | 1 ou mais |
| `<main id="conteudo">` | Conteúdo principal e único da página. | **exatamente 1** |
| `<section aria-labelledby="id-do-titulo">` | Bloco temático com título próprio. | vários |
| `<article>` | Conteúdo independente e reaproveitável: card de curso, post de blog, depoimento. | vários |
| `<aside>` | Conteúdo complementar (cursos relacionados, nota lateral). | 0 ou mais |
| `<footer>` | Rodapé do site; também pode fechar uma `<section>`/`<article>`. | 1 principal |

Nunca coloque `<section>` sem título, nem `<main>` dentro de `<article>`/`<section>`.

## Esqueleto da home

```html
<body>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header>
    <a href="/" aria-label="Seminário Teológico APRISCO, página inicial">
      <!-- logo SVG com <title> ou img com alt -->
    </a>
    <nav aria-label="Principal">
      <ul>
        <li><a href="/cursos">Cursos</a></li>
        <li><a href="/sobre">Quem somos</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo">
    <section aria-labelledby="titulo-hero">
      <h1 id="titulo-hero">…</h1>
      <p>…</p>
      <a href="…" class="btn">Quero me inscrever</a>
    </section>

    <section aria-labelledby="titulo-trilhas">
      <h2 id="titulo-trilhas">Escolha por onde começar</h2>

      <section aria-labelledby="trilha-crescimento">
        <h3 id="trilha-crescimento">Crescimento espiritual</h3>
        <ul>
          <li>
            <article>
              <h4><a href="/cursos/escola-de-oracao">Escola de Oração</a></h4>
              <p>…</p>
            </article>
          </li>
        </ul>
      </section>
    </section>

    <section aria-labelledby="titulo-faq">
      <h2 id="titulo-faq">Perguntas frequentes</h2>
      <details>
        <summary>Como recebo o acesso depois da compra?</summary>
        <p>…</p>
      </details>
    </section>
  </main>

  <footer>…</footer>
</body>
```

## Hierarquia de títulos

- **Um único `<h1>` por página**, descrevendo o assunto principal (e contendo a palavra-chave de forma natural).
- Depois, `<h2>` para seções, `<h3>` para subseções. **Sem pular níveis** (nada de `h2` direto para `h4`).
- Título não é estilo: não use `<h3>` só porque a fonte é menor. Ajuste o tamanho com CSS.
- Os títulos, lidos em sequência, devem formar um resumo coerente da página. Teste: extraia só os `h1`–`h4`; a página deve fazer sentido.

Outline sugerido da página de um curso:

```
h1  Curso de Cristologia
  h2  O que você vai estudar
  h2  Para quem é este curso
  h2  Como funciona
  h2  Quem ensina
  h2  Perguntas frequentes
  h2  Cursos relacionados
```

Outline sugerido da home:

```
h1  [Promessa principal da escola]
  h2  Escolha por onde começar
    h3  Crescimento espiritual
    h3  Teologia sistemática: introdução
    h3  Teologia para o dia a dia
    h3  Conheça sua Bíblia
    h3  Família e relacionamentos
    h3  Treinamento e capacitação
  h2  Como funcionam os cursos
  h2  Quem ensina
  h2  O que dizem os alunos        (somente com depoimentos reais)
  h2  Perguntas frequentes
  h2  Comece agora
```

## Textos, listas e tabelas

- Parágrafos em `<p>`. Listas em `<ul>`/`<ol>`/`<li>`: o menu é lista de links, os módulos do curso são `<ol>` se tiverem ordem, `<ul>` se não tiverem.
- `<strong>` para importância semântica; `<em>` para ênfase. Não use `<b>`/`<i>` para isso.
- `<blockquote>` + `<cite>` para depoimentos e citações (com `<footer>` para a autoria, quando fizer sentido).
- `<time datetime="2026-10-05">5 de outubro de 2026</time>` para datas.
- `<address>` para o contato da organização no rodapé.
- `<abbr title="…">` para siglas na primeira ocorrência.
- Tabela (`<table>`) só para dados tabulares, com `<caption>`, `<th scope="col">`.
- Versículos bíblicos citados: `<blockquote>` com a referência em `<cite>`. Informe a tradução usada.

## Links e botões

- **Link (`<a>`)** leva a outro lugar, inclusive para o checkout da Kiwify. O botão "Quero me inscrever" é um `<a>` estilizado como botão.
- **Botão (`<button>`)** executa uma ação na própria página (abrir/fechar menu).
- Texto do link autoexplicativo: "Ver o curso de Cristologia", não "Saiba mais" nem "Clique aqui". Se o design pedir um texto curto, complemente com `aria-label` ou texto escondido visualmente (`.sr-only`).
- Card de curso clicável: o link fica **no título** (`<h4><a>`) e o card inteiro ganha área de clique com `a::after { content: ""; position: absolute; inset: 0; }` no contêiner com `position: relative`. Assim há um único link por card, sem aninhar links.
- Links que levam para fora do site não precisam de `target="_blank"` aqui; abrir na mesma aba é melhor para a compra no celular.

## Imagens

- Imagem com conteúdo: `alt` descritivo e curto. Ex.: `alt="Professor segurando uma Bíblia aberta"`.
- Imagem decorativa: `alt=""` (vazio, não omitido).
- Logo: `alt="Seminário Teológico APRISCO"` quando for o único conteúdo do link da home.
- Sempre `width` e `height` (evita salto de layout).
- Use `<figure>` + `<figcaption>` quando houver legenda.
- Capas de curso com texto embutido na imagem: repita o texto essencial no HTML. O Google não lê texto dentro de imagem de forma confiável.
- Ícones decorativos: SVG inline com `aria-hidden="true"`.

## Formulários (se houver, ex.: contato)

- `<label for>` associado a cada `<input id>`; nunca só placeholder.
- `type` correto (`email`, `tel`), `autocomplete`, `required` com mensagem de erro clara.
- Botão de envio com texto de ação ("Enviar mensagem").
- Não coletar dados sensíveis. Informar o uso dos dados e linkar a política de privacidade.

## Acessibilidade (conta para SEO e para a lei)

- **Contraste:** texto normal com razão mínima de 4,5:1; texto grande, 3:1. Cuidado especial com texto sobre fotos: use gradiente/overlay escuro e teste.
- **Foco visível** em tudo que é interativo (`:focus-visible` com contorno claro). Nunca `outline: none` sem substituto.
- **Teclado:** toda a navegação e o FAQ funcionam só com Tab/Enter/Espaço.
- **Skip link** para pular o menu.
- **`prefers-reduced-motion`:** desligar ou reduzir qualquer animação.
- **Alvos de toque** de pelo menos 44×44 px no celular.
- **Idioma:** `lang="pt-BR"` no `<html>`; trechos em outro idioma (ex.: grego/hebraico) com `lang` próprio.
- **Estado dos elementos** com `aria-current="page"` no item ativo do menu.
- ARIA só quando o HTML nativo não resolve. A primeira regra do ARIA é não usar ARIA se a tag certa existe.

## Menu mobile sem JavaScript

Prefira `<details>`/`<summary>` ou o padrão checkbox+CSS. Se usar JavaScript, que seja uma ilha mínima e com o botão `<button aria-expanded aria-controls>`.

## Verificação

- Rode o validador de HTML (validator.nu) nas páginas principais.
- Teste com leitor de tela (VoiceOver ou NVDA) ao menos a home e uma página de curso.
- Extensões úteis: axe DevTools, HeadingsMap, Lighthouse.
- Desative o CSS no navegador: a página precisa continuar lógica e legível.
