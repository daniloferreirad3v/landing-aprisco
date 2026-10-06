# 08 — Armadilhas conhecidas

Problemas que já aconteceram neste projeto, com a causa e o jeito certo.

## CSS e build

**O minificador descarta `animation-timeline`.**
Se `animation-timeline` estiver na mesma regra que o shorthand `animation:`, o minificador junta
tudo num `animation:` abreviado (que não aceita timeline) e a animação de rolagem some só no build.
Use longhands (`animation-name`, `animation-timing-function`, `animation-fill-mode`) e ponha
`animation-timeline`/`animation-range` numa regra com seletor mais específico (`html .revela`).
Animações por tempo (ex.: o brilho dos botões) podem usar o shorthand normalmente.

**Ordem das regras escopadas.** Uma media query declarada *antes* da regra base é sobrescrita por
ela (mesma especificidade). Regras de celular/desktop vão **depois** das regras base.

**`clip-path` em texto da Anton corta acentos.** O `line-height` da Anton é curto; o "É" passa da
caixa da linha. Por isso o recorte de `revela--linha` começa em `-0.35em`.

**Estado final de animação continua valendo.** Com `animation-fill-mode: both`, o último quadro fica
aplicado para sempre. Um `clip-path: inset(0)` final cortaria o contorno de foco; use folga negativa.

**Fileira rolável dentro de grid alarga a página.** Precisa de `min-width: 0` no item do grid.

**Revelação ao rolar perto do fim da página.** Se a faixa termina no meio da tela, elementos no fim
da página nunca chegam lá e ficam meio apagados em telas altas. Use `revela--cedo`.

## Servidor de desenvolvimento

**O dev server às vezes serve CSS de componente velho** (cache do HMR). Já aconteceu de o build
estar certo e o cliente ver o antigo. Antes de afirmar que algo está certo, verifique **no mesmo
endereço** que o cliente está olhando; se divergir do build, reinicie o `npm run dev` e peça
Ctrl+F5.

**Não deixe servidores rodando** (pedido do cliente). Para conferir, use uma porta avulsa
(ex.: `npx astro preview --port 4399`) e encerre ao terminar. No Windows:
`Get-NetTCPConnection -LocalPort 4399 -State Listen` → `Stop-Process -Id <pid>`.

## Auditoria do Astro (barra de dev)

- **`tabindex` em elemento não interativo**: não ponha `tabindex` no `<main>`; o skip link funciona
  sem ele.
- **"Below the fold and could be lazy-loaded"**: imagens fora da primeira tela precisam de
  `loading="lazy"`; as da primeira tela não podem ter. Não marque como prioritárias as capas da
  vitrine (ela fica longe do topo).
- **Elemento fixo (`sticky`)**: a regra soma `offsetTop`, que cresce com a rolagem num elemento
  fixo; um `<img>` no cabeçalho é acusado como "abaixo da dobra" quando a página está rolada. Por
  isso o logo é `<svg><use>`. Ao auditar, teste também com a página rolada.

## Conteúdo e dados

- O cliente às vezes manda números que não batem com a Kiwify (ex.: "R$ 19,90"). Vale o da Kiwify
  (em `cursos.ts`); avise a divergência e registre no `PENDENCIAS.md`.
- O FAQ diz "cartão, Pix ou boleto", mas o checkout só tem cartão e Pix Automático. Pendente de
  decisão do cliente; não acrescente ficha de boleto.
- Capas: 15 das 20 estão em 320×440 px. Não amplie com upscaling; aguarde as originais.

## Git e ambiente

- **Push automático do VS Code**: commits aparecem no `origin/main` sem ninguém dar push. Não é o
  agente; apenas não dê push.
- **Shell no Windows**: a ferramenta Bash é Git Bash. Em heredoc com aspas simples os escapes de
  regex sobrevivem; em outros contextos `\s`, `\d` podem ser comidos. Para scripts com regex,
  escreva o arquivo e rode depois.
- O diretório do usuário tem acento (`Homologação2`); prefira caminhos curtos (`HOMOLO~1`) em scripts.
- O repositório usa LF (`.gitattributes`); arquivos editados no Windows podem aparecer como
  modificados só por quebra de linha. O conteúdo é normalizado no commit.
