# 01 — Projeto, público e objetivos

## Resumo

| Item | Valor |
|---|---|
| Marca | Seminário Teológico APRISCO (símbolo: cordeiro) |
| Domínio | `[PREENCHER: domínio]` (registrado no nome do cliente) |
| Idioma | Português do Brasil |
| Tipo | Site estático (Astro), home em página única + uma página por curso |
| Venda | Assinatura (anual em destaque, mensal em segundo plano) |
| Checkout e área de membros | Kiwify (externo, não muda) |
| Hospedagem | Vercel: demonstração no plano gratuito; plano Pro ao começar a vender (uso comercial) |

## Como o ecossistema se divide

```
Instagram / WhatsApp / Google
            │
            ▼
   Site APRISCO (este projeto)      ← apresenta, convence, ranqueia
            │  botões "ASSINAR AGORA" / "QUERO COMEÇAR AGORA"
            ▼
   Checkout Kiwify                  ← pagamento (cartão e Pix), e-mail, nota, reembolso
            │                          todo botão leva ao plano ANUAL; o card mensal, ao mensal
            ▼
   Área de membros Kiwify           ← aulas, materiais, progresso do aluno (também no app)
```

O arquivo de referência `design/referencias/area-de-membros-kiwify.png` mostra a **área de membros**, que continua na Kiwify. Ela serve de **referência de catálogo e de clima visual**, não de layout a copiar. O site público é outra coisa: precisa vender e ser encontrado no Google.

## Público

Cristãos brasileiros que querem estudar teologia com profundidade e aplicação prática: membros de igreja, líderes de célula/mesa, pregadores, pastores e jovens. Vêm principalmente do **celular**, por Instagram, WhatsApp e indicação. Muitos nunca ouviram falar da escola, então a confiança vem antes da venda: o que será estudado, como funciona, o que fazer em caso de dúvida e, quando houver material, quem ensina e o que dizem os alunos.

## Objetivos, em ordem de prioridade

1. Transmitir seriedade e acolhimento nos primeiros segundos (identidade forte, texto claro).
2. Levar o visitante ao checkout da Kiwify com o menor atrito possível.
3. Ser encontrado no Google por buscas de nicho (cursos e temas específicos), não por termos genéricos disputados. É o papel das páginas de curso.
4. Ser rápido e leve (a maior parte do tráfego é celular).

## Fora de escopo

Login, área do aluno, carrinho próprio, processamento de pagamento, painel administrativo, comentários, formulários. **Blog** (retirado pelo cliente em 2026-10-05). **Seção ou página de contato** (retirada pelo cliente em 2026-10-06). Se alguma dessas coisas for pedida, avise que muda a arquitetura antes de fazer.

## Perguntas ao cliente

| # | Pergunta | Situação |
|---|---|---|
| 1 | Modelo de venda | Respondida: assinatura (ver abaixo) |
| 2 | O que significa o cadeado na área de membros | Respondida: curso em preparação |
| 3 | Preço, parcelamento e garantia | Respondida: preços da Kiwify; garantia de 7 dias |
| 4 | Certificado | Respondida: certificado de conclusão, sem carga horária de bacharelado |
| 5 | Professores/fundador (foto, minibiografia) | **Aberta** — sem isso, a home não tem seção "Quem ensina" |
| 6 | Depoimentos reais com autorização | **Aberta** — sem isso, não há seção de depoimentos |
| 7 | Linha doutrinária / declaração de fé | **Aberta** |
| 8 | Canais oficiais (Instagram, WhatsApp, e-mail) | Parcial: o contato saiu do site; o e-mail ainda é pedido na Política de Privacidade |
| 9 | CNPJ, razão social e endereço | **Aberta** — bloqueia o lançamento (ver `PENDENCIAS.md`) |
| 10 | Material gratuito (aula, PDF) para quem ainda não vai comprar | Aberta, sem urgência (não há lugar para ele no site hoje) |

### Respostas recebidas

**2026-10-05**

- **Venda por assinatura**, com dois planos publicados na Kiwify:
  - **Mensal:** R$ 37 por mês — `https://pay.kiwify.com.br/226Zzxj`.
  - **Anual:** R$ 192 à vista ou 12x de R$ 19,86 — `https://pay.kiwify.com.br/Rcvmvex`.
  - Os links ficam só em `src/data/cursos.ts`.
- O cadeado indica **curso ainda não liberado** (Escatologia, Antropologia Bíblica e Pneumatologia): status `em-breve`. A assinatura já dá acesso a eles.
- **Fontes** das peças do Canva: Anton e Montserrat.
- Não existem fotos sem texto: o topo é **tipográfico**, com um mural das capas reais.
- **Blog fora do escopo.**
- **Página única (single page):** a home concentra tudo e o menu rola até as seções. As páginas de curso continuam existindo só como porta de entrada pelo Google e por anúncios: ficam no sitemap, mas não recebem link da home (os cards da home são só vitrine). Catálogo, Sobre e Contato deixaram de ser páginas. Política de privacidade, termos e 404 continuam separadas.
- O curso FLM e a trilha "Treinamento e capacitação" saíram do site: **20 cursos em 5 trilhas**.

**2026-10-06**

- **FAQ definitivo** enviado pelo cliente (`src/data/faq.ts`): pagamento na Kiwify, acesso por e-mail e app, **cancelamento livre**, **garantia de 7 dias** com reembolso, **certificado de conclusão** (não conta como carga horária de bacharelado), estudo pelo celular, sem pré-requisito.
- Textos definitivos do topo, de "Por que escolher a APRISCO?", de "Uma fé rasa", de "O que a assinatura inclui" e de "Como funciona".
- **Todo botão de compra leva ao checkout anual**; só o card mensal leva ao mensal.
- **Seção de contato removida.** O menu ficou: Cursos, Sobre, Dúvidas.
- Cor primária: **roxo `#4C059E`** (no lugar do coral das peças).

A lista completa de decisões está em `docs/projeto/07-decisoes.md`.

## Tom de voz

Acolhedor, claro e firme. Fala com o aluno como um professor que respeita a Palavra e a pessoa. Evita jargão acadêmico sem explicar, evita promessas exageradas ("transforme sua vida em 7 dias") e evita pressão artificial. Frases curtas. Verbos de ação nos botões.
