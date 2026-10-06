# PENDENCIAS.md — Seminário Teológico APRISCO

Lista viva do que falta. Marque `[x]` quando resolver e anote a resposta ao lado.
Última revisão: 2026-10-06, conferida contra o site atual (home single page, 20 páginas
de curso, políticas). Itens que deixaram de existir com as mudanças do site foram retirados;
o histórico fica no git.

## Como o site está hoje (decisões já tomadas)

- Home em página única: topo → Por que escolher → Uma fé rasa → O que a assinatura inclui →
  vitrine de cursos → Como funciona → planos → dúvidas → fechamento. Sem seção de contato
- Venda por assinatura: anual (12x de R$ 19,86 ou R$ 192 à vista) em destaque e mensal (R$ 37)
  em segundo plano. Todo botão de compra leva ao checkout **anual**; só o card mensal leva ao mensal
- Cor primária: roxo `#4C059E` (botões); traços e ícones em `#7C3AED`. Fontes: Anton + Montserrat
- FAQ com os textos definitivos do cliente; garantia de 7 dias, cancelamento livre, certificado
  de conclusão (não conta como carga horária de bacharelado)
- A home **não tem nenhum [PREENCHER] visível**. Os que restam estão nas páginas de curso e nas
  políticas (abaixo)

---

## 1. Bloqueiam o lançamento

- [ ] **CNPJ e razão social.** A lei de e-commerce (Decreto 7.962/2013) pede nome e CNPJ do
  fornecedor no site. Preencher `empresa` em `src/data/site.ts`: entram sozinhos no rodapé e na
  Política de Privacidade
- [ ] **Boleto.** O FAQ ("Onde eu faço meu pagamento?") diz "cartão, Pix ou boleto", mas os dois
  checkouts da Kiwify oferecem só **Cartão e Pix Automático** (conferido em 2026-10-06). Ativar o
  boleto na Kiwify ou tirar do FAQ (`src/data/faq.ts`)
- [ ] **Total a prazo do anual.** O card mostra "12x de R$ 19,86" e "ou R$ 192 à vista", sem o
  total (R$ 238,32), por decisão do cliente. As regras de oferta parcelada (CDC / Decreto
  5.903/2006) pedem à vista, parcelas e total juntos. Confirmar com o jurídico. O total aparece
  hoje só na resposta "Quanto custa?" do FAQ
- [ ] **Política de Privacidade** (rascunho, com aviso visível de revisão jurídica). Faltam:
  - razão social, CNPJ e endereço do controlador
  - e-mail do encarregado de dados (LGPD), em `site.contato.email`
  - provedor de hospedagem e prazo de retenção dos registros
  - quais dados de alunos o APRISCO recebe da Kiwify e para quê
  - ferramenta de medição/pixel, se houver, e os cookies envolvidos
- [ ] **Termos de Uso** (rascunho). Faltam foro e legislação aplicável, e as regras da assinatura.
  Já se sabe: cancelamento livre e garantia de 7 dias; falta confirmar como funciona a renovação
- [ ] **Domínio oficial** (com ou sem `www`) conectado na Vercel, conferindo que ele **não**
  responde `X-Robots-Tag: noindex` (o `vercel.json` bloqueia só os endereços `*.vercel.app`)
- [ ] **Vercel no plano Pro** (uso comercial; a demonstração está no plano gratuito)
- [ ] **Remover `src/pages/teste.astro`** (página de teste da Fase 1, com noindex e fora do sitemap)

## 2. Conteúdo que o cliente precisa enviar

- [ ] **Páginas de curso (20).** Cada uma mostra [PREENCHER] em: descrição (2 a 4 frases), "O que
  você vai estudar" (módulos/temas), "Para quem é", formato e carga horária. Sem isso as páginas
  dificilmente ranqueiam no Google (ideal: 300+ palavras reais por curso). Campos em
  `src/data/cursos.ts`
- [ ] **Revisão doutrinária** de todos os textos, com atenção aos cursos marcados como sensíveis:
  Escatologia, Teologia do Corpo, Escola de Sexualidade Bíblica, Salve a sua Família, Namoro
  Cristão, Encontre a Pessoa Certa
- [ ] **Chamadas dos cursos lidas dos prints** (conferir a redação final):
  - Fé e Trabalho: "Glorificando a Deus num mundo caído."
  - Panorama do Novo Testamento: "Mergulhe numa jornada entre os Evangelhos, Atos, Cartas e Apocalipse."
  - Panorama do Antigo Testamento: "Descubra a beleza da revelação de Deus nas páginas do Antigo Testamento…"
  - Namoro Cristão: "…aprendendo a controlar o fogo no parquinho enquanto esperam." (expressão
    informal; confirmar se vai para o site público)

## 3. Confirmações rápidas

- [ ] **Bandeiras de cartão.** As fichas sob o botão do anual mostram Visa, Mastercard, Elo e Pix
  (`src/components/FormasPagamento.astro`). O checkout não lista bandeiras; confirmar com a Kiwify
- [ ] **Parcela do anual.** O texto do cliente dizia "R$ 19,90"; a Kiwify cobra **R$ 19,86**, que é o
  que o site mostra. Se a Kiwify mudar, atualizar só `src/data/cursos.ts`
- [ ] **Aprovar o cordeiro vetorizado** (`public/logo/cordeiro-selo-*.svg`, `public/favicon.svg`),
  feito a partir de `design/logo-preto.png`
- [ ] **Aprovar a imagem de compartilhamento** `public/og/default.jpg` (recriação da peça `6.png`)
- [ ] **Peças da pasta `/design` no roxo?** Capas, logo e imagem de compartilhamento seguem o
  visual antigo (coral)
- [ ] **Nome do curso:** o arquivo da capa diz "Escola de Sexologia Bíblica"; o site usa "Escola de
  Sexualidade Bíblica". Confirmar o nome oficial
- [ ] **Nome da trilha:** a área de membros usa "Teologia para o dia-a-dia"; o site usa "dia a dia"
  (grafia atual)
- [ ] **Palavras-chave de SEO:** home ("seminário teológico online") e as dos 20 cursos (campo
  `palavraChave` em `src/data/cursos.ts`; o build impede duas páginas com a mesma)

## 4. Melhoram o site, mas não bloqueiam

- [ ] **Capas em alta resolução:** 15 das 20 estão em 320×440 px e ficam borradas em telas
  grandes. Ideal 1080×1350 (4:5), como Cristologia, Escatologia, Teontologia, Antropologia e
  Pneumatologia
- [ ] **Prova social:** depoimentos reais com autorização, professores (nome, foto, minibiografia)
  e declaração de fé. Hoje a home não tem essas seções; entram quando houver material real
- [ ] **Logo em SVG original** (símbolo e wordmark), se existir, no lugar da vetorização
- [ ] **Analytics** (Plausible, Umami ou GA4) e pixels de anúncio. Os botões já têm
  `data-cta`/`data-plano`/`data-curso` para medição. Impacta aviso de cookies e a Política de
  Privacidade. Antes de repassar UTMs ao checkout, verificar se a Kiwify as preserva
- [ ] **Previsão dos cursos "em preparação"** (Escatologia, Antropologia Bíblica, Pneumatologia),
  só se o cliente quiser divulgar
- [ ] **Links para as páginas de curso:** na home as capas não são links (decisão do single page);
  o Google acha as páginas pelo sitemap e pelos cursos relacionados. Links de fora (Instagram,
  anúncios) ajudam
- [ ] **Imagem de compartilhamento por curso** (hoje todas usam `og/default.jpg`)

## 5. Manter atualizado

- [ ] **"+80 aulas disponíveis hoje"** (seção "O que a assinatura inclui", `src/pages/index.astro`):
  número informado pelo cliente. Revisar quando entrarem cursos novos
- [ ] **Preços e links de checkout** só em `src/data/cursos.ts`; o site inteiro acompanha
