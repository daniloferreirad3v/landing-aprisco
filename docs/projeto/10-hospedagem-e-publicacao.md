# 10 — Hospedagem, desempenho e publicação no Google

Resumo das conversas de 2026-10-06 sobre teste de carga, PageSpeed, onde hospedar e como
virar o site para o domínio oficial. Os números foram medidos no próprio projeto ou tirados das
páginas oficiais citadas no fim; preços e limites de hospedagem mudam com frequência, então
confira antes de decidir.

## Decisão pendente

Antes de ligar o domínio oficial e começar a divulgar, é preciso escolher **onde o site vai ficar**:

- **Vercel Pro** (pago): nada muda no projeto. É o caminho mais simples.
- **Cloudflare Pages** (gratuito): banda ilimitada e uso comercial permitido; exige uma migração pequena.
- **Hostinger** ou outra hospedagem tradicional: bom se o cliente já paga uma; exige deploy automático.
- **Não** deixar no Vercel gratuito (proibido para uso comercial) nem no Netlify gratuito (o site sai do ar quando os créditos acabam).

Detalhes na seção 5.

---

## 1. Como o site está hoje

Conferido em `https://landing-aprisco.vercel.app` (plano gratuito da Vercel, só demonstração):

| Item | Situação |
|---|---|
| Cabeçalho `X-Robots-Tag` | `noindex, nofollow` (fora do Google, de propósito) |
| Canonical, Open Graph, sitemap e robots.txt | apontam para `landing-aprisco.vercel.app` |
| Cache | `X-Vercel-Cache: HIT` (servido pela CDN) |
| Publicação | automática a cada `git push` na `main` |

O `noindex` vem do `vercel.json` e vale **só para endereços `*.vercel.app`**. O domínio oficial não
recebe esse cabeçalho.

---

## 2. PageSpeed Insights

### Como usar

1. Acesse **pagespeed.web.dev**, cole o endereço publicado e clique em **Analisar**.
2. Olhe primeiro a aba **Celular**.
3. Metas: as quatro notas (Desempenho, Acessibilidade, Práticas recomendadas, SEO) em **90 ou mais**;
   **LCP < 2,5 s**; **CLS < 0,1**; TBT perto de zero.
4. A seção "dados de usuários reais" fica vazia até o site ter tráfego real (semanas após o
   lançamento). Não é erro.

Antes de publicar, o PageSpeed não acessa `localhost`. Use o **Lighthouse** do Chrome:
`npm run build` → `npm run preview` → abrir `http://localhost:4321` numa **janela anônima** →
F12 → aba **Lighthouse** → **Mobile** → **Analyze page load**.

### Resultado atual

Tudo acima de 95, **exceto SEO = 69 no `vercel.app`**. A causa é só o `noindex`: o item "Page is
blocked from indexing" pesa muito na nota. No build local, sem o cabeçalho, o SEO deu **100** na
home e na página de curso, sem nenhum item reprovado. No domínio oficial a nota sobe sozinha.

### Avisos "Fora da pontuação"

| Aviso | Decisão |
|---|---|
| Solicitações que bloqueiam a renderização (4 arquivos CSS) | Testado colocar o CSS dentro do HTML (`inlineStylesheets: 'always'`). O conteúdo aparecia ~230 ms antes, mas o tempo travado (TBT) subiu de ~25 ms para ~200–300 ms e a nota caiu de 99 para 96. **Desfeito**: o site fica como está |
| Árvore de dependência da rede | Mesma causa do item anterior; mesma decisão |
| Reflow forçado (42 ms, "sem atribuição") | Não vem do código do site (o único script fecha o menu do celular e não mede nada). Nada a fazer |

---

## 3. Teste de carga (o site aguenta o fluxo?)

### Onde está o limite

- **O site** é estático (HTML, CSS e imagens prontos) servido por CDN. Não há servidor nem banco
  de dados para travar; aguenta muito mais do que um lançamento normal.
- **O checkout** é da Kiwify, que está acostumada a lançamentos. **Nunca faça teste de carga contra
  a Kiwify**: não é infraestrutura sua e pode ser tratado como ataque.
- O limite real é a **franquia de tráfego** do plano de hospedagem.

### Peso de uma visita (medido rolando a página até o fim)

| Página | Celular | Desktop |
|---|---|---|
| Home | ~360 KB | ~315 KB |
| Página de curso | ~160 KB | ~175 KB |

Conta de bolso: cada **100 GB** de franquia comportam por volta de **280 mil visitas completas à
home**. (HTML e CSS chegam comprimidos, então o tráfego real é um pouco menor.)

### Se quiser rodar o teste

Ferramenta: **k6** (gratuita). Arquivo `teste.js`:

```js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // sobe até 100 usuários simultâneos
    { duration: '3m', target: 300 },  // segura 300
    { duration: '1m', target: 0 },    // desce
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],    // menos de 1% de erros
    http_req_duration: ['p(95)<800'],  // 95% das respostas em menos de 800 ms
  },
};

const BASE = 'https://SEU-ENDERECO';

export default function () {
  const r = http.get(`${BASE}/`);
  check(r, { 'home 200': (res) => res.status === 200 });
  http.get(`${BASE}/cursos/cristologia`);
  sleep(Math.random() * 3 + 2); // pausa de 2 a 5 s, como uma pessoa lendo
}
```

Rodar com `k6 run teste.js` e olhar: taxa de erros (`http_req_failed`) perto de zero, o `p(95)`
do tempo de resposta e o cabeçalho de cache (`x-vercel-cache: HIT` na Vercel).

Cuidados: testar só o seu endereço; a proteção contra ataques da hospedagem pode bloquear um teste
agressivo (leia as regras dela antes); cada requisição do teste conta na franquia.

Mais útil do que estressar o site: acompanhar o **PageSpeed no celular** e o **consumo de banda**
no painel da hospedagem durante campanhas.

---

## 4. O projeto está pronto para a virada?

**Sim. Não é preciso criar sitemap nem mexer no código.** Verificado assim:

- **Site publicado:** canonical, imagem de compartilhamento, `robots.txt` e sitemap usam o endereço
  que a Vercel informa no build (hoje o `vercel.app`).
- **Simulação local** (build fingindo que a Vercel informava um domínio de exemplo,
  `aprisco.com.br`; nada foi publicado):
  - `sitemap-index.xml` gerado sozinho, com **23 endereços** (home, 20 cursos, duas políticas);
    `/404` e `/teste` ficam de fora;
  - `robots.txt` aponta para o sitemap do domínio;
  - canonical e Open Graph com o domínio; nenhum resto de `vercel.app`.
- **Documentação da Vercel:** a variável `VERCEL_PROJECT_PRODUCTION_URL`, usada pelo site, passa a
  conter o domínio próprio quando ele é conectado e está disponível no build.

### Atenção: com ou sem `www`

Quando há mais de um domínio, a Vercel escolhe **o mais curto**.

- **Oficial sem `www`** (`aprisco.com.br`): funciona sozinho. **Recomendado.**
- **Oficial com `www`**: a Vercel escolheria o sem `www`, e o canonical apontaria para um endereço
  que redireciona. Nesse caso, criar em **Settings → Environment Variables** a variável
  `SITE_URL = https://www.aprisco.com.br` (o site já usa essa variável com prioridade).

---

## 5. Onde hospedar: regras de uso comercial

O site existe para vender a assinatura. Mesmo com o pagamento na Kiwify, isso conta como uso
comercial nas regras das hospedagens.

### Vercel

- **Plano gratuito (Hobby): proibido para uso comercial.** A política diz que contas Hobby são
  "restritas a uso pessoal e não comercial" e lista como comercial "anunciar a venda de um produto
  ou serviço" e "receber pagamento para criar, atualizar ou hospedar o site".
- Tecnicamente o Hobby aceita domínio próprio, mas a Vercel pode **pausar o site ou a conta** se
  identificar o uso comercial.
- Para testes sem divulgação (como hoje), o gratuito é aceitável.
- **Pro:** pago por membro da equipe; nada muda no projeto (só trocar o plano em Settings → Billing).

### Netlify

- **Uso comercial permitido** no plano gratuito.
- Funciona por **créditos**: 300 por mês no gratuito. Banda custa 20 créditos por GB; cada
  publicação (deploy) custa 15; requisições, 2 a cada 10 mil.
- **Quando os créditos acabam, o site sai do ar** ("Site not available") até o mês seguinte, e não
  dá para comprar mais no gratuito.
- No ritmo deste projeto, é o ponto fraco: **20 pushes num mês esgotam os 300 créditos** (num só dia
  houve mais de 30 commits, e o push automático do VS Code publica cada um). Sem contar publicações,
  os créditos aguentam algo como 15 a 30 mil visitas por mês.

### Cloudflare Pages

- **Plano gratuito com banda ilimitada**, até **500 builds por mês**, até 20.000 arquivos por site.
- Uso comercial permitido no gratuito, segundo comparações de terceiros. **Confirmar nos termos da
  Cloudflare.**
- Migração pequena: ver seção 7.

### Hostinger (ou outra hospedagem tradicional)

- Uso comercial permitido (é um serviço pago).
- Serve o site sem problema: depois do build, ele é só a pasta `dist/`.
- Sem configuração extra, cada atualização exigiria **subir os arquivos na mão**. A solução é o
  deploy automático (seção 7).
- Velocidade depende do servidor (prefira um no Brasil) ou do CDN da hospedagem.

### Comparação

| | Uso comercial no gratuito | Atualizar o site | Risco ou custo | Mudanças no projeto |
|---|---|---|---|---|
| **Vercel Hobby** | não | `git push` | pausa por violar regras | nenhuma |
| **Vercel Pro** | (pago) | `git push` | mensalidade em dólar | nenhuma |
| **Netlify gratuito** | sim | `git push` | site cai quando acabam os créditos | arquivo de cabeçalhos + `SITE_URL` |
| **Cloudflare Pages** | sim (confirmar) | `git push` | limite de 500 builds/mês | arquivo de cabeçalhos + `SITE_URL` |
| **Hostinger** | (pago) | `git push`, depois de configurar | plano da hospedagem | `.htaccess` + workflow do GitHub + `SITE_URL` |

**Recomendação:** para vender, **Vercel Pro** (zero mudança) ou **Cloudflare Pages** (gratuito,
banda ilimitada). Se o cliente **já paga** a Hostinger, ela também resolve, com deploy automático.

---

## 6. Passo a passo da virada para o domínio oficial (na Vercel)

### Antes
1. Resolver o grupo 1 do `PENDENCIAS.md`: CNPJ em `src/data/site.ts`, boleto no FAQ, revisão
   jurídica (total a prazo, Política e Termos).
2. Remover `src/pages/teste.astro` e dar push.
3. Trocar o plano da Vercel para **Pro** (Settings → Billing).

### Virada
4. **Adicionar o domínio:** projeto → **Settings → Domains → Add**. Adicionar `aprisco.com.br` e
   `www.aprisco.com.br`; escolher o oficial (recomendado: sem `www`) e deixar o outro redirecionando.
5. **DNS no Registro.br:** Domínio → DNS → criar **exatamente** os registros que a Vercel mostrar
   (em geral um **A** para o domínio sem `www` e um **CNAME** para o `www`). Esperar
   **"Valid Configuration"**; o HTTPS é emitido sozinho.
6. **Redeploy:** Deployments → último → **⋯ → Redeploy** (ou qualquer `git push`). Sem isso,
   canonical, sitemap e imagem de compartilhamento continuam com o `vercel.app`.

### Conferir (no domínio oficial)
7. **Sem `noindex`:** F12 → Network → recarregar → primeiro item → em Response Headers **não**
   pode aparecer `x-robots-tag`.
8. **Endereços:** Ctrl+U → o `canonical` deve ser o domínio oficial. Abrir `/sitemap-index.xml` e
   `/robots.txt` e conferir os endereços.
9. **PageSpeed:** SEO deve dar 100.
10. **Teste real:** clicar em todos os botões de compra (todos vão ao checkout anual; o "ASSINAR" do
    card mensal vai ao mensal) e compartilhar o link no WhatsApp para ver a imagem.

### Avisar o Google
11. **Google Search Console** (search.google.com/search-console): propriedade do tipo **Domínio**,
    verificada com o registro **TXT** criado no DNS do Registro.br.
12. **Sitemaps:** enviar `sitemap-index.xml`.
13. **Inspeção de URL:** solicitar indexação da home e de algumas páginas de curso.
14. **Rich Results Test** (search.google.com/test/rich-results) numa página de curso.

### Depois
- Aparecer na busca leva de **alguns dias a algumas semanas**; acompanhar em Search Console → Páginas.
- O `vercel.app` continua existindo com `noindex`, o que evita conteúdo duplicado.
- O que mais faz as páginas de curso subirem: preencher descrição, módulos e "para quem é".

---

## 7. Se mudar de hospedagem: o que muda no projeto

O `vercel.json` só vale na Vercel. Em outra hospedagem é preciso refazer:

| O quê | Cloudflare Pages / Netlify | Hostinger (Apache/LiteSpeed) |
|---|---|---|
| Cabeçalhos de segurança e cache | arquivo `public/_headers` | `.htaccess` |
| `noindex` do endereço de testes | regra no arquivo de cabeçalhos | `.htaccess` no subdomínio de teste |
| URLs sem barra final (`/cursos/cristologia`) | em geral funciona | regra no `.htaccess` (o servidor tende a redirecionar para a versão com barra, o que desencontra do canonical) |
| Página 404 | automática | `ErrorDocument` no `.htaccess` |
| Endereço do site no build | variável `SITE_URL` | variável `SITE_URL` no build |
| Publicação automática | conectar o repositório (como na Vercel) | **GitHub Actions**: a cada push, o GitHub roda o build e envia a `dist/` por FTP |

Na Hostinger, algumas opções de "deploy por Git" do painel só **copiam** os arquivos do repositório
e **não rodam o build** do Astro; por isso o caminho seguro é o GitHub Actions. Os dados de acesso
(FTP ou conta) ficam guardados nos *secrets* do GitHub, não no código.

---

## Fontes

- [Vercel — Fair Use Guidelines, "Commercial usage"](https://vercel.com/docs/limits/fair-use-guidelines)
- [Vercel — System environment variables (`VERCEL_PROJECT_PRODUCTION_URL`)](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Netlify — Introducing credit-based plans (changelog oficial)](https://www.netlify.com/changelog/netlify-pricing-update-introducing-credit-based-plans/)
- [Netlify — Pro vs Free](https://www.netlify.com/pricing/pro-vs-free.md)
- [Netlify Free Plan Limits in 2026 (netli.fyi)](https://netli.fyi/blog/netlify-free-plan-limits-2026)
- [Netlify Pricing and Limits in 2026 (netli.fyi)](https://netli.fyi/blog/netlify-pricing-and-limits)
- [Fórum da Netlify: uso comercial no plano gratuito](https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545/2)
- [Comparação Vercel × Netlify (agentdeals.dev)](https://agentdeals.dev/vercel-vs-netlify)
- [Cloudflare Pages — Limits (documentação oficial)](https://developers.cloudflare.com/pages/platform/limits)
- [Comparação de planos gratuitos de hospedagem 2026 (agentdeals.dev)](https://agentdeals.dev/hosting-free-tier-comparison-2026)
- [Alternativas ao Cloudflare Pages em 2026 (bootstrap.build)](https://bootstrap.build/articles/cloudflare-pages-alternatives/)
