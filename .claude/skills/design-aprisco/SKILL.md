---
name: design-aprisco
description: Use em qualquer decisão visual do site do Seminário Teológico APRISCO: cores, tipografia, layout, componentes, imagens e animação. Obriga a conhecer a identidade atual (tokens e decisões do cliente) antes de codar e aplica princípios de design autoral, evitando o visual genérico de páginas geradas.
---

# Design do site APRISCO

Leia na primeira vez que usar a skill na sessão: `docs/projeto/06-visual-e-animacoes.md` (estado
atual), `docs/design-plan.md` (raciocínio e paleta) e `docs/05-DESIGN.md` (processo).

## Passo zero (obrigatório)

- **Valores visuais vêm de `src/styles/tokens.css`.** Nenhuma cor, fonte ou espaço solto no componente.
- A pasta `/design` é a identidade **de origem** (peças do Canva, capas, logo, prints): consulte para
  marca, cordeiro e capas, e **nunca altere** seus arquivos. Atenção: as peças ainda estão em coral;
  a cor primária do site passou a ser o **roxo** por decisão do cliente. Em conflito, valem as
  decisões do cliente (`docs/projeto/07-decisoes.md`) e os tokens.
- Antes de "corrigir" algo que pareça estranho, veja se não é decisão do cliente.

## Identidade atual (resumo)

- Escura, séria e contemplativa: preto `#000`/`#09090B`, creme `#F4F1EC`, Anton (títulos, caixa-alta)
  + Montserrat (texto), cordeiro como símbolo.
- **Roxo `#4C059E` só preenchido** (botões, selo), com texto branco. Sobre o fundo ele tem 1,7:1.
- **Traços em `#7C3AED`** (bordas, linhas, ícones, foco). **Texto nunca é roxo.**
- Nada de lilás ou tons claros de roxo ("puxa para o rosa", recusado pelo cliente).

## Fluxo

1. Celular primeiro (375 px), a partir dos tokens.
2. **Crítica com capturas** em 375 e 1366 px (e 320/768/1024 quando mexer em layout). Remova uma
   decoração antes de finalizar.
3. Só registre em `docs/design-plan.md` decisões **definitivas**, aprovadas pelo cliente.

## Princípios

- **Gaste a ousadia em um lugar só.** O memorável é o topo (tipografia + mural de capas); o resto,
  quieto e disciplinado.
- A tipografia carrega a personalidade. Escala dos tokens, linhas de 65–75 caracteres, texto de
  leitura ≥ 16 px no celular. Medidas da Anton em `em`, não `ch`.
- Estrutura visual (bordas, divisores, numeração, rótulos) só quando carrega informação. Numerar só
  sequências reais (ex.: passos de "Como funciona").
- Texto de interface em caixa normal; caixa-alta onde a marca exige (títulos) ou o cliente pediu
  (botões de compra: "ASSINAR AGORA", "QUERO COMEÇAR AGORA").
- Copy: do ponto de vista do aluno, mesmo nome para a mesma ação, sem exagero. Textos do cliente
  entram como ele mandou.

## Evitar (padrões de página genérica)

- Cartões idênticos arredondados com a mesma sombra em tudo (raio do site: 4 px, sem sombra).
- Rótulo em caixa-alta espaçada acima de todo título.
- Destacar uma única palavra do título com cor ou itálico.
- Gradientes decorativos; brilho em elementos que não são os botões de compra.
- Recortes, cortinas e efeitos "mirabolantes" na rolagem (testados e recusados pelo cliente).

## Qualidade mínima (sem anunciar)

Responsivo até 320 px; foco visível; `prefers-reduced-motion` respeitado; contraste ≥ 4,5:1 em
texto e ≥ 3:1 em elementos não textuais (texto sobre imagem medido pixel a pixel); alvos de toque
≥ 44 px; sem rolagem horizontal; CSS sem conflitos de especificidade (espaço vertical entre seções
por um único token, `--espaco-secao`).

## Motion (o que o cliente aprovou)

- Revelação ao rolar: **fade sutil** com subida curta (`.revela`, `animation-timeline: view()`),
  terminando perto do meio da tela; cascata com `--revela-i`.
- Entrada do topo ao carregar e mural de capas que "respira".
- Brilho lento nos botões de compra (passa por trás do texto).
- Respostas a ação: capa sobe 6 px no hover, botão sobe 2 px, FAQ e menu deslizam.
- Tudo desligado com `prefers-reduced-motion: reduce`. Ver armadilhas do minificador em
  `docs/projeto/08-armadilhas.md`.
