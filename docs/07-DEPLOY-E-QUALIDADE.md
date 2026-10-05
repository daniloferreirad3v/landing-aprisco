# 07 — Deploy, domínio e checklist de lançamento

## Aviso sobre o plano da Vercel

O plano gratuito (Hobby) da Vercel é restrito a uso pessoal e não comercial. Um site que vende cursos é uso comercial e precisa do plano **Pro**. Use o Hobby apenas para desenvolvimento e testes. Confirme as regras vigentes em vercel.com/docs/limits/fair-use-guidelines.

## Configuração do projeto

1. Repositório no GitHub (privado ou público, à escolha do cliente).
2. Na Vercel: **Add New → Project → importar o repositório**. A Vercel reconhece o Astro automaticamente. Confirme as configurações sugeridas (comando de build e pasta de saída) na tela de importação.
3. Cada `git push` na branch principal publica em produção; cada branch/PR gera uma URL de pré-visualização.
4. Teste tudo no endereço `*.vercel.app` antes de ligar o domínio.

## Domínio

- O domínio é comprado e registrado **no nome do cliente** (CPF/CNPJ dele no Registro.br).
- Na Vercel: **Settings → Domains → Add**. Use exatamente os registros DNS que a Vercel mostrar (eles podem mudar com o tempo).
- No Registro.br, crie os registros no DNS do domínio (normalmente um para o domínio raiz e um CNAME para `www`).
- Defina o endereço oficial (com ou sem `www`) e configure o outro para **redirecionar 301** para ele.
- O HTTPS é emitido automaticamente. A propagação pode levar de minutos a horas.
- Atualize `site` em `astro.config.mjs` com o domínio final **antes** do build de produção, para canonical, Open Graph e sitemap saírem corretos.

## `vercel.json` (opcional, Fase 5)

Redirecionamentos e cabeçalhos de segurança. Exemplo mínimo de cabeçalhos:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" }
      ]
    }
  ]
}
```

Cache longo para arquivos com hash de nome (o Astro já gera `/_astro/*`) e para `/fonts/*`.

## E-mail com o domínio

Criar `contato@[dominio]` e usar no rodapé e na política de privacidade. Opções: hospedagem de e-mail simples ou Google Workspace. O DNS do e-mail (MX, SPF, DKIM, DMARC) deve ser adicionado no Registro.br sem apagar os registros do site.

## Pós-publicação (primeiro dia)

- [ ] Google Search Console: verificar o domínio (TXT no DNS) e enviar `sitemap-index.xml`.
- [ ] Solicitar a indexação da home e das principais páginas de curso.
- [ ] Testar o compartilhamento do link no WhatsApp e no Instagram (a imagem Open Graph aparece?).
- [ ] Conferir **cada** botão de compra: abre o checkout certo da Kiwify?
- [ ] Rich Results Test nas páginas com JSON-LD.
- [ ] PageSpeed Insights (celular) na home e em um curso.
- [ ] Configurar analytics e o evento de clique nos botões de compra.
- [ ] Criar o perfil da escola no Google Meu Negócio **somente se** houver endereço/atendimento local (provavelmente não se aplica).

## Checklist de lançamento (tudo marcado antes de divulgar)

**Conteúdo**
- [ ] Nenhum `[PREENCHER]` visível no site publicado.
- [ ] Textos revisados doutrinariamente pelo cliente.
- [ ] Preços, garantia e condições batem com a Kiwify.
- [ ] Depoimentos reais e autorizados (ou seção removida).
- [ ] Política de privacidade e termos publicados e linkados no rodapé.

**SEO**
- [ ] Checklist por página (`03-SEO.md`) concluído em todas as páginas.
- [ ] Sitemap acessível, robots.txt correto, nenhuma página de produção com `noindex`.
- [ ] Domínio canônico único com redirecionamento 301.
- [ ] 404 personalizada.

**Qualidade técnica**
- [ ] `npm run build` sem erros e sem avisos.
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
- Publicar artigos do blog de forma regular (a constância pesa mais que o volume).
- Acompanhar o Search Console mensalmente: quais buscas trazem gente, quais páginas não indexam.
- Revisar datas e conteúdo dos artigos a cada 6–12 meses.
