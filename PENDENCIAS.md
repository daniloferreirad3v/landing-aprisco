# PENDENCIAS.md — Seminário Teológico APRISCO

Lista viva do que falta. Marque `[x]` quando resolver e anote a resposta ao lado.
Última atualização: 2026-10-05 (Fase 0).

## Decisões respondidas (2026-10-05)

- [x] **Modelo de venda:** assinatura (um único checkout na Kiwify)
- [x] **Cadeados:** cursos ainda não liberados → status "em-breve" (Escatologia, Antropologia Bíblica, Pneumatologia)
- [x] **Fontes:** as das peças do Canva (Anton + Montserrat)
- [x] **Fotos sem texto:** não existem → hero tipográfico sobre preto
- [x] **Promessa do hero:** usar as frases das peças por enquanto; CTA definitivo a rever

## Decorrentes da assinatura (novas)

- [x] Planos: mensal R$ 37,00; anual R$ 192,00 à vista ou 12x de R$ 19,86 (já na Kiwify)
- [x] Checkout mensal: `https://pay.kiwify.com.br/226Zzxj` (oficial)
- [x] Checkout anual: `https://pay.kiwify.com.br/Rcvmvex` (oficial)
- [ ] Nome oficial do plano/assinatura, se houver
- [x] A assinatura dá acesso a todos os cursos, inclusive os ainda não liberados
- [ ] Previsão de lançamento dos cursos "em breve" (só se o cliente quiser divulgar)
- [ ] Cancelamento: como funciona (texto para o FAQ)
- [ ] CTA definitivo do hero
- [ ] **FAQ definitivo:** o FAQ atual é PROVISÓRIO (rascunho). Substituir todas as respostas antes do lançamento

## Pendências de identidade visual (pasta /design)

- [ ] `design/identidade.md` não existe (paleta e fontes deste plano foram extraídas das imagens; confirmar)
- [ ] Logo em **SVG**: símbolo (cordeiro no círculo) e wordmark completo ("SEMINÁRIO TEOLÓGICO / APRISCO"). Hoje só há PNG 2560×1440 com o símbolo no centro de um quadro vazio; o wordmark existe apenas dentro de `6.png`
  - Alternativa, se não houver SVG: vetorizar o PNG do cordeiro (pedir aprovação do resultado)
- [ ] Manual de marca (área de respiro, tamanho mínimo, usos proibidos), se existir
- [ ] Capas em alta resolução: 15 das 20 capas estão em 320×440 px (ficam borradas em telas grandes). Ideal: 1080×1350, como Cristologia, Escatologia, Teontologia, Antropologia e Pneumatologia
- [ ] Padronizar a proporção das capas: há capas em 4:5 (1080×1350) e em 8:11 (320×440)
- [x] ~~Capa do curso FLM~~ (curso retirado do site em 2026-10-05)
- [ ] O arquivo `CAPAS CURSOS APRISCO.png` é a capa do Panorama do Antigo Testamento (renomear na origem, se quiser)
- [ ] O arquivo `ESCOLA DE SEXOLOGIA BIBLICA.png` tem o nome divergente do curso ("Sexualidade"); confirmar que o nome oficial é "Escola de Sexualidade Bíblica"
- [ ] Fonte usada no texto das capas (sans fina, parecida com Inter/Helvetica); só importa se o cliente quiser reproduzi-la no site
- [ ] A imagem `5.png` (Santa Ceia com computadores) é peça de campanha? Pode ser usada no site?

## Pendências de conteúdo

- [x] Preço da assinatura (ver acima; o site precisa continuar igual à Kiwify se o preço mudar)
- [ ] Garantia: prazo e regras (o que a Kiwify de fato oferece)
- [ ] Certificado: existe? carga horária? regras?
- [ ] Formato dos cursos (videoaulas, material em PDF, tempo de acesso, suporte)
- [ ] Professores/fundador: nome, foto com autorização, minibiografia, formação e ministério
- [ ] Depoimentos reais com autorização (se não houver, a seção não aparece)
- [ ] Linha doutrinária ou declaração de fé
- [x] ~~Nome completo da sigla FLM~~ (curso retirado do site em 2026-10-05)
- [ ] Módulos/aulas de cada curso (para "O que você vai estudar")
- [ ] Descrição de 2–4 frases de cada curso (só há a chamada curta)
- [ ] Revisão doutrinária do cliente em todos os textos, com atenção a: Escola de Sexualidade Bíblica, Namoro Cristão, Salve a sua Família, Encontre a Pessoa Certa, Escatologia
- [ ] Material gratuito para quem ainda não vai comprar (aula, PDF), se existir
- [ ] Chamadas lidas dos prints (conferir a redação final):
  - Fé e Trabalho: "Glorificando a Deus num mundo caído."
  - Panorama do Novo Testamento: "Mergulhe numa jornada entre os Evangelhos, Atos, Cartas e Apocalipse."
  - Panorama do Antigo Testamento: "Descubra a beleza da revelação de Deus nas páginas do Antigo Testamento e compreenda toda sua estrutura bíblica."
  - Namoro Cristão: "Vivendo um relacionamento para a glória de Deus e aprendendo a controlar o fogo no parquinho enquanto esperam." (expressão informal; confirmar se deve ir para o site público)
- [ ] Nome das trilhas: a área de membros usa "Teologia para o dia-a-dia"; no site proponho "dia a dia" (grafia atual). Confirmar

## Pendências institucionais e legais

- [ ] Canais oficiais: Instagram, YouTube, WhatsApp de atendimento, e-mail
- [ ] Horário de atendimento
- [ ] CNPJ/razão social e endereço (rodapé e política de privacidade)
- [ ] Revisão jurídica da Política de Privacidade e dos Termos de Uso (serão rascunhos)

## Pendências técnicas

- [ ] Domínio definido (com ou sem `www`)
- [x] Links de checkout da assinatura na Kiwify (oficiais, ver acima)
- [ ] **Aprovar o cordeiro vetorizado** (Fase 1): `public/logo/cordeiro-selo-branco.svg`, `cordeiro-selo-preto.svg`, `public/favicon.svg`. Feito a partir de `design/logo-preto.png`
- [ ] Aprovar a imagem de compartilhamento `public/og/default.jpg` (recriação da peça `6.png` com as fontes reais)
- [x] Endereço do site automático (`astro.config.mjs`): na Vercel usa o endereço de produção do projeto (o `*.vercel.app` na demonstração e o domínio oficial quando for conectado); fora da Vercel, `aprisco.example.com`
- [x] Demonstração fora do Google: `vercel.json` manda `X-Robots-Tag: noindex` para qualquer endereço `*.vercel.app`. O domínio oficial não recebe esse cabeçalho
- [ ] Antes do lançamento: conectar o domínio oficial na Vercel e conferir que ele **não** responde `X-Robots-Tag: noindex`
- [ ] Remover `src/pages/teste.astro` antes do lançamento (página de teste da Fase 1, já com noindex e fora do sitemap)
- [ ] Verificar se o checkout da Kiwify preserva UTMs
- [ ] Ferramenta de analytics (Plausible, Umami ou GA4) e pixels de anúncio (impacta aviso de cookies/LGPD)
- [ ] Conta Vercel no plano Pro (uso comercial)
- [ ] Repositório no GitHub (privado ou público)

## SEO

- [ ] Palavra-chave principal da home: proposta "seminário teológico online" (validar)
- [ ] Validar as palavras-chave propostas para os 21 cursos (campo `palavraChave` em `src/data/cursos.ts`; o build impede duas páginas com a mesma)

## Dados do cliente a manter atualizados (2026-10-06)

- [ ] **"+80 aulas disponíveis hoje"** (seção "O que a assinatura inclui", em `src/pages/index.astro`): número informado pelo cliente. Revisar sempre que entrarem cursos novos, para o site não prometer menos nem mais do que existe
- [ ] **"cancele quando quiser"**: o cliente informou que o cancelamento é livre. A resposta "Posso cancelar quando quiser?" no FAQ (`src/data/faq.ts`) ainda está como [PREENCHER] — confirmar o texto e preencher

## Oferta parcelada (2026-10-05)

- [ ] O card do plano anual mostra "12x de R$ 19,86" e "ou R$ 192 à vista", sem o total a prazo (R$ 238,32), por decisão do cliente. As regras de oferta parcelada (CDC / Decreto 5.903/2006) pedem preço à vista, parcelas e total a prazo juntos: **confirmar com o jurídico**. O total ainda aparece na resposta "Quanto custa?" do FAQ

## Single page (2026-10-05)

- [ ] Páginas de curso sem link da home: o Google as encontra pelo sitemap e pelos links entre cursos relacionados. Para cada curso ranquear bem, o ideal é ter descrição real (300+ palavras) e, se possível, links de fora (Instagram, anúncios)
- [ ] Sobre (seção da home): hoje só tem o manifesto; declaração de fé e professores entram quando houver material
- [ ] Contato (seção da home): canais em `src/data/site.ts`

## Registro da Fase 3 (2026-10-05)

- [ ] **Sobre:** história da escola, declaração de fé e "Quem ensina" (professores) aparecem como [PREENCHER]
- [ ] Home: "Quem ensina" e "Depoimentos" **não aparecem** até haver dados reais (decisão de design: seção some em vez de mostrar placeholder)
- [x] ~~Home, passo 3: como e quando o acesso chega ao aluno~~ (texto enviado pelo cliente em 2026-10-06: acesso por e-mail + app da Kiwify)
- [ ] Páginas de curso: ficha "Como funciona" com formato, carga horária e certificado em [PREENCHER]
- [ ] Política de Privacidade e Termos de Uso: rascunhos com aviso visível de revisão jurídica; faltam controlador, hospedagem, analytics, regras da assinatura e foro
- [ ] Contato: canais (WhatsApp, e-mail, Instagram, horário) em `src/data/site.ts`
- [ ] Imagem de compartilhamento por curso: hoje todas usam `og/default.jpg` (capas são retrato e cortariam mal em 1200×630); gerar uma por curso é opcional
- [x] Blog removido do escopo pelo cliente (2026-10-05); link retirado do menu

## Registro da Fase 2 (2026-10-05)

- [ ] Os 21 cursos estão com `descricao`, `paraQuem` e `aprendizados` vazios → aparecem como [PREENCHER] nas páginas de curso (Fase 3) até o cliente enviar o material
- [ ] Cursos marcados com `revisaoSensivel` (revisão doutrinária obrigatória): Escatologia, Teologia do Corpo, Escola de Sexualidade Bíblica, Salve a sua Família, Namoro Cristão, Encontre a Pessoa Certa
- [x] ~~FLM sem capa~~ (curso e trilha "Treinamento e capacitação" retirados do site em 2026-10-05)
- [ ] FAQ provisório (`src/data/faq.ts`): 6 de 9 respostas com [PREENCHER] (pagamento, acesso, cancelamento, garantia, certificado, dispositivos, pré-requisitos)
- [ ] Verificar se o checkout da Kiwify preserva UTMs antes de repassá-las no `CtaButton`
- [ ] Os botões de compra já têm `data-cta`/`data-plano`/`data-curso` para medição; falta escolher a ferramenta de analytics
