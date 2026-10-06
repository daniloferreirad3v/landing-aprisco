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
| `<article>` | Conteúdo independente e reaproveitável: card de curso, card de plano, depoimento. | vários |
| `<aside>` | Conteúdo complementar (cursos relacionados, nota lateral). | 0 ou mais |
| `<footer>` | Rodapé do site; também pode fechar uma `<section>`/`<article>`. | 1 principal |

Nunca coloque `<section>` sem título, nem `<main>` dentro de `<article>`/`<section>`.

## Esqueleto da home (página única)

```html
<body>
  <a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

  <header>
    <a href="/" aria-label="Seminário Teológico APRISCO, página inicial">
      <!-- só o cordeiro (svg); o nome fica em .sr-only -->
    </a>
    <nav aria-label="Principal">
      <ul>
        <li><a href="/#cursos">Cursos</a></li>
        <li><a href="/#sobre">Sobre</a></li>
        <li><a href="/#duvidas">Dúvidas</a></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo">                       <!-- sem tabindex -->
    <section aria-labelledby="titulo-hero">
      <p><!-- assinatura SEMINÁRIO TEOLÓGICO / APRISCO --></p>
      <h1 id="titulo-hero">Estude teologia de maneira profunda e descomplicada.</h1>
      <p>…</p>                               <!-- sem botão no topo -->
    </section>

    <section aria-labelledby="titulo-porque"> <h2>Por que escolher a APRISCO?</h2> … </section>
    <section id="sobre" aria-labelledby="titulo-manifesto"> <h2>Uma fé rasa, uma vida rasa.</h2> … </section>
    <section aria-labelledby="titulo-inclui"> <h2>O que a assinatura inclui</h2> … </section>

    <section id="cursos" aria-labelledby="titulo-trilhas">
      <h2 id="titulo-trilhas">Escolha por onde começar</h2>
      <section aria-labelledby="trilha-crescimento-espiritual">
        <h3 id="trilha-crescimento-espiritual">Crescimento espiritual</h3>
        <ul>
          <li>
            <article>
              <!-- capa --><h4>Escola de Oração</h4>   <!-- na home o card não é link -->
            </article>
          </li>
        </ul>
      </section>
    </section>

    <section aria-labelledby="titulo-como-funciona"> <h2>Como funciona</h2> <ol>…</ol> </section>
    <section id="assinatura" aria-labelledby="titulo-assinatura"> <h2>Acesso a todos os cursos</h2> … </section>
    <div id="duvidas"><section aria-labelledby="titulo-faq"> <h2>Dúvidas antes de assinar</h2> <details>…</details> </section></div>
    <section aria-labelledby="titulo-final"> <h2>Construa uma vida profunda…</h2> … </section>
  </main>

  <footer>…</footer>
</body>
```

## Hierarquia de títulos

- **Um único `<h1>` por página**, descrevendo o assunto principal (e contendo a palavra-chave de forma natural).
- Depois, `<h2>` para seções, `<h3>` para subseções. **Sem pular níveis** (nada de `h2` direto para `h4`).
- Título não é estilo: não use `<h3>` só porque a fonte é menor. Ajuste o tamanho com CSS.
- Os títulos, lidos em sequência, devem formar um resumo coerente da página. Teste: extraia só os `h1`–`h4`; a página deve fazer sentido.

Outline da página de um curso (como está):

```
h1  Cristologia
  h2  O que você vai estudar
  h2  Para quem é este curso
  h2  Como funciona
  h2  Assine e estude Cristologia      (planos)
    h3  Plano anual
    h3  Plano mensal
  h2  Perguntas frequentes
  h2  Cursos relacionados
    h3  (um por curso)
```

"Quem ensina" entra quando houver professores reais.

Outline da home (como está):

```
h1  Estude teologia de maneira profunda e descomplicada.
  h2  Por que escolher a APRISCO?
  h2  Uma fé rasa, uma vida rasa.
  h2  O que a assinatura inclui
  h2  Escolha por onde começar
    h3  Crescimento espiritual
      h4  (um por curso)
    h3  Teologia sistemática: introdução
    h3  Teologia para o dia a dia
    h3  Conheça sua Bíblia
    h3  Família e relacionamentos
  h2  Como funciona
    h3  (um por passo)
  h2  Acesso a todos os cursos
    h3  Plano anual
    h3  Plano mensal
  h2  Dúvidas antes de assinar
  h2  Construa uma vida profunda a partir do conhecimento de Deus.
```

"Quem ensina" e "O que dizem os alunos" entram só com dados reais.

## Textos, listas e tabelas

- Parágrafos em `<p>`. Listas em `<ul>`/`<ol>`/`<li>`: o menu é lista de links, os módulos do curso são `<ol>` se tiverem ordem, `<ul>` se não tiverem.
- `<strong>` para importância semântica; `<em>` para ênfase. Não use `<b>`/`<i>` para isso.
- `<blockquote>` + `<cite>` para depoimentos e citações (com `<footer>` para a autoria, quando fizer sentido).
- `<time datetime="2026-10-05">5 de outubro de 2026</time>` para datas.
- `<address>` para o contato da organização (hoje o site não tem seção de contato).
- `<abbr title="…">` para siglas na primeira ocorrência.
- Tabela (`<table>`) só para dados tabulares, com `<caption>`, `<th scope="col">`.
- Versículos bíblicos citados: `<blockquote>` com a referência em `<cite>`. Informe a tradução usada.

## Links e botões

- **Link (`<a>`)** leva a outro lugar, inclusive para o checkout da Kiwify. Os botões "ASSINAR AGORA" e "QUERO COMEÇAR AGORA" são `<a>` estilizados como botão (gerados pelo `CtaButton`).
- **Botão (`<button>`)** executa uma ação na própria página (abrir/fechar menu).
- Texto do link autoexplicativo: "Ver o curso de Cristologia", não "Saiba mais" nem "Clique aqui". Se o design pedir um texto curto, complemente com `aria-label` ou texto escondido visualmente (`.sr-only`).
- Card de curso clicável (nas páginas de curso; na home os cards não são links): o link fica **no título** (`<h4><a>`) e o card inteiro ganha área de clique com `a::after { content: ""; position: absolute; inset: 0; }` no contêiner com `position: relative`. Assim há um único link por card, sem aninhar links.
- Links que levam para fora do site não precisam de `target="_blank"` aqui; abrir na mesma aba é melhor para a compra no celular.

## Imagens

- Imagem com conteúdo: `alt` descritivo e curto. Ex.: `alt="Professor segurando uma Bíblia aberta"`.
- Imagem decorativa: `alt=""` (vazio, não omitido).
- Logo: `alt="Seminário Teológico APRISCO"` quando for o único conteúdo do link da home.
- Sempre `width` e `height` (evita salto de layout).
- Use `<figure>` + `<figcaption>` quando houver legenda.
- Capas de curso com texto embutido na imagem: repita o texto essencial no HTML. O Google não lê texto dentro de imagem de forma confiável.
- Ícones decorativos: SVG inline com `aria-hidden="true"`.

## Formulários (hoje o site não tem nenhum)

- `<label for>` associado a cada `<input id>`; nunca só placeholder.
- `type` correto (`email`, `tel`), `autocomplete`, `required` com mensagem de erro clara.
- Botão de envio com texto de ação ("Enviar mensagem").
- Não coletar dados sensíveis. Informar o uso dos dados e linkar a política de privacidade.

## Acessibilidade (conta para SEO e para a lei)

- **Contraste:** texto normal com razão mínima de 4,5:1; texto grande, 3:1. Cuidado especial com texto sobre fotos: use gradiente/overlay escuro e teste.
- **Foco visível** em tudo que é interativo (`:focus-visible` com contorno claro). Nunca `outline: none` sem substituto.
- **Teclado:** toda a navegação e o FAQ funcionam só com Tab/Enter/Espaço.
- **Skip link** para pular o menu (o `<main id="conteudo">` não precisa de `tabindex`).
- **`prefers-reduced-motion`:** desligar ou reduzir qualquer animação.
- **Alvos de toque** de pelo menos 44×44 px no celular.
- **Idioma:** `lang="pt-BR"` no `<html>`; trechos em outro idioma (ex.: grego/hebraico) com `lang` próprio.
- **Estado dos elementos** com `aria-current="page"` no item ativo do menu.
- ARIA só quando o HTML nativo não resolve. A primeira regra do ARIA é não usar ARIA se a tag certa existe.

## Menu mobile sem JavaScript

Prefira `<details>`/`<summary>` ou o padrão checkbox+CSS. Se usar JavaScript, que seja uma ilha mínima e com o botão `<button aria-expanded aria-controls>`. Hoje: `<details>`, mais um script de poucas linhas que fecha o menu ao tocar num link.

## Verificação

- Rode o validador de HTML (validator.nu) nas páginas principais.
- Teste com leitor de tela (VoiceOver ou NVDA) ao menos a home e uma página de curso.
- Extensões úteis: axe DevTools, HeadingsMap, Lighthouse.
- Desative o CSS no navegador: a página precisa continuar lógica e legível.
