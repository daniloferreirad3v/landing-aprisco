# 07 — Deploy, domínio e checklist de lançamento

**Situação (2026-10-06):** o código está pronto para **demonstração** na Vercel (plano gratuito), com
`noindex` automático em `*.vercel.app`. A importação do repositório na Vercel é feita pelo cliente.
Nada da seção "Checklist de lançamento" foi cumprido ainda; o que bloqueia está no grupo 1 do
`PENDENCIAS.md`.

## Aviso sobre o plano da Vercel

O plano gratuito (Hobby) da Vercel é restrito a uso pessoal e não comercial. Um site que vende cursos é uso comercial e precisa do plano **Pro**. Use o Hobby apenas para desenvolvimento e testes. Confirme as regras vigentes em vercel.com/docs/limits/fair-use-guidelines.

## Configuração do projeto

1. Repositório no GitHub: `github.com/daniloferreirad3v/landing-aprisco`, branch `main` (feito).
2. Na Vercel: **Add New → Project → importar o repositório**. A Vercel reconhece o Astro automaticamente. Confirme as configurações sugeridas (comando de build e pasta de saída) na tela de importação.
3. Cada `git push` na branch principal publica em produção; cada branch/PR gera uma URL de pré-visualização.
4. Teste tudo no endereço `*.vercel.app` antes de ligar o domínio.

## Domínio

- O domínio é comprado e registrado **no nome do cliente** (CPF/CNPJ dele no Registro.br).
- Na Vercel: **Settings → Domains → Add**. Use exatamente os registros DNS que a Vercel mostrar (eles podem mudar com o tempo).
- No Registro.br, crie os registros no DNS do domínio (normalmente um para o domínio raiz e um CNAME para `www`).
- Defina o endereço oficial (com ou sem `www`) e configure o outro para **redirecionar 301** para ele.
- O HTTPS é emitido automaticamente. A propagação pode levar de minutos a horas.
- O `site` do `astro.config.mjs` é resolvido sozinho: na Vercel, usa o endereço de produção do projeto (`VERCEL_PROJECT_PRODUCTION_URL`), que passa a ser o domínio oficial quando ele for conectado. Para forçar outro, defina `SITE_URL`. Depois de ligar o domínio, confira canonical, Open Graph e sitemap.
- Confira que o domínio oficial **não** responde `X-Robots-Tag: noindex` (o `vercel.json` só manda isso para `*.vercel.app`).

## `vercel.json` (feito)

O arquivo na raiz já tem:

- cabeçalhos de segurança em todas as rotas (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`, `Permissions-Policy`);
- cache de 1 ano (`immutable`) para `/_astro/*` (nomes com hash);
- cache de 7 dias, com revalidação em segundo plano por até 30, para `/fonts/*` (nome fixo, então
  não pode ser `immutable`);
- `X-Robots-Tag: noindex, nofollow` para qualquer host `*.vercel.app` (demonstração fora do Google);
- `trailingSlash: false`, igual ao `trailingSlash: 'never'` do Astro.

## E-mail com o domínio

Criar `contato@[dominio]` e usar na política de privacidade (e-mail do encarregado de dados, LGPD). O site não tem seção de contato. Opções: hospedagem de e-mail simples ou Google Workspace. O DNS do e-mail (MX, SPF, DKIM, DMARC) deve ser adicionado no Registro.br sem apagar os registros do site.

## Pós-publicação (primeiro dia)

- [ ] Google Search Console: verificar o domínio (TXT no DNS) e enviar `sitemap-index.xml`.
- [ ] Solicitar a indexação da home e das principais páginas de curso.
- [ ] Testar o compartilhamento do link no WhatsApp e no Instagram (a imagem Open Graph aparece?).
- [ ] Conferir **cada** botão de compra: todos abrem o checkout **anual**, e só o "ASSINAR" do card mensal abre o mensal?
- [ ] Rich Results Test nas páginas com JSON-LD.
- [ ] PageSpeed Insights (celular) na home e em um curso.
- [ ] Configurar analytics e o evento de clique nos botões de compra.
- [ ] Criar o perfil da escola no Google Meu Negócio **somente se** houver endereço/atendimento local (provavelmente não se aplica).

## Checklist de lançamento (tudo marcado antes de divulgar)

**Conteúdo**
- [ ] Nenhum `[PREENCHER]` visível no site publicado.
- [ ] Textos revisados doutrinariamente pelo cliente.
- [ ] Preços, garantia e condições batem com a Kiwify (inclusive as formas de pagamento citadas no FAQ: hoje o checkout não tem boleto).
- [ ] Razão social e CNPJ no rodapé (Decreto 7.962/2013).
- [ ] Oferta parcelada revisada pelo jurídico (total a prazo).
- [ ] Depoimentos só se forem reais e autorizados (hoje a seção não existe).
- [ ] Política de privacidade e termos publicados e linkados no rodapé.

**SEO**
- [ ] Checklist por página (`03-SEO.md`) concluído em todas as páginas.
- [ ] Sitemap acessível, robots.txt correto, nenhuma página de produção com `noindex`.
- [ ] Domínio canônico único com redirecionamento 301.
- [ ] 404 personalizada (feita).
- [ ] Página `/teste` removida (`src/pages/teste.astro`).

**Qualidade técnica**
- [ ] `npm run build` sem erros e sem avisos; `npm run check` com 0 erros.
- [ ] Lighthouse mobile ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO.
- [ ] LCP < 2,5 s, CLS < 0,1 no PageSpeed Insights.
- [ ] Sem links quebrados (internos e para a Kiwify).
- [ ] Testado em Android e iPhone reais, em 375 px e em desktop.

**Acessibilidade**
- [ ] Navegação completa só com teclado.
- [ ] Contraste verificado, inclusive texto sobre fotos.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Hierarquia de títulos verificada (HeadingsMap).

## Manutenção contínua

- Atualizar `cursos.ts` quando um curso for lançado ou mudar de preço.
- Atualizar o "+80 aulas" da seção "O que a assinatura inclui" quando entrarem cursos novos.
- Preencher, aos poucos, descrição, módulos e público das páginas de curso: é o que as faz ranquear.
- Acompanhar o Search Console mensalmente: quais buscas trazem gente, quais páginas não indexam.
