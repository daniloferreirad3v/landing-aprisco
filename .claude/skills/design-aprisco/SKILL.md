---
name: design-aprisco
description: Use em qualquer decisão visual do site do Seminário Teológico APRISCO: cores, tipografia, layout, componentes, imagens e animação. Obriga a ler a pasta /design (identidade oficial) antes de codar e aplica princípios de design autoral, evitando o visual genérico de páginas geradas.
---

# Design do site APRISCO

Detalhes completos em `docs/05-DESIGN.md`. Leia-o na primeira vez que usar a skill na sessão.

## Passo zero (obrigatório)

Leia **toda** a pasta `/design`: `LEIA-ME.md`, `identidade.md`, logos, fontes, fotos e referências. Os valores de lá vencem qualquer valor dos documentos. Se faltar logo, paleta ou fontes, **pare e pergunte**. Nunca invente a marca. Nunca altere arquivos de `/design`.

## Fluxo

1. **Plano em `docs/design-plan.md`:** paleta (4–6 hex nomeados), tipografia (famílias e papéis), layout (frase por seção + wireframe ASCII da home e da página de curso) e princípios.
2. **Revisão contra o genérico:** compare o plano com os padrões de página gerada e reescreva o que for padrão (ver abaixo). Registre o que mudou e por quê.
3. **Construção mobile primeiro** (375 px), a partir de `src/styles/tokens.css`. Todo valor visual vem de token.
4. **Crítica com capturas** em 375, 768 e 1280 px (Playwright, se disponível). Remova uma decoração antes de finalizar.

## Princípios

- A marca é escura, séria e contemplativa: fotografia escurecida, wordmark condensado pesado, cordeiro, acento coral usado com contenção. Siga a identidade oficial; o escuro aqui é a marca, não um padrão.
- **Gaste a ousadia em um lugar só.** Um elemento memorável (o hero); o resto, quieto e disciplinado.
- A tipografia carrega a personalidade. Uma ou duas famílias, bem distintas se forem duas. Escala definida, linhas de 65–75 caracteres, texto de leitura ≥ 16 px no celular.
- Estrutura visual (bordas, divisores, numeração, rótulos) só quando carrega informação. Numerar só sequências reais (ex.: passos de como funciona).
- Texto de interface em caixa normal; caixa-alta apenas onde a marca exige (wordmark, títulos de destaque).
- Copy de design: do ponto de vista do aluno, verbos de ação nos botões ("Quero me inscrever"), mesmo nome para a mesma ação, sem exagero.

## Evitar (padrões de página genérica)

- Cartões idênticos arredondados com a mesma sombra em tudo.
- Rótulo em caixa-alta espaçada acima de todo título.
- Destacar uma única palavra do título com cor ou itálico.
- Gradientes decorativos, brilhos, fade-in em todas as seções, hover animado em todos os cards.
- Preto "#0B0B0B" com um único acento neon só por hábito. Use as cores reais da marca.

## Qualidade mínima (sem anunciar)

Responsivo até 320 px; foco visível; `prefers-reduced-motion` respeitado; contraste ≥ 4,5:1 (inclusive texto sobre foto, com overlay); alvos de toque ≥ 44 px; sem rolagem horizontal da página; CSS sem conflitos de especificidade (espaçamento vertical entre seções definido por um único token).

## Motion

No máximo um momento orquestrado (ex.: revelação suave do hero). Movimento que responde a uma ação (abrir FAQ ou menu) é bem-vindo. Tudo desligado com `prefers-reduced-motion: reduce`.
