# 01 — Visão geral

## O que é

Site do **Seminário Teológico APRISCO**, uma escola de cursos online de teologia bíblica. A
proposta, nas palavras do cliente: "Estude teologia de maneira profunda e descomplicada para
conhecer a Deus, fortalecer sua fé e servir com excelência à Igreja de Cristo."

Público: cristãos leigos, líderes de igreja e pregadores que querem estudar teologia sem um
bacharelado formal. O tom é acolhedor, sério e direto.

## O que o site faz

1. **Vende a assinatura** numa home de página única (landing de vendas).
2. **Atrai busca orgânica** com uma página por curso (`/cursos/<slug>`), pensada para o Google.

## O que o site não faz

A **Kiwify** cuida de tudo que envolve o aluno: checkout, pagamento (cartão e Pix Automático),
e-mail de acesso, área de membros (com app), nota fiscal e reembolso. O site:

- não processa pagamento nem guarda dados de pagamento;
- não tem login, cadastro, formulário nem banco de dados;
- não tem blog (foi retirado do escopo pelo cliente);
- não tem seção ou página de contato (retirada pelo cliente).

## Modelo de venda

Assinatura única que dá acesso a **todos os cursos**, inclusive os que ainda estão em preparação e
os que forem acrescentados depois, sem custo adicional.

| Plano | Preço | Checkout |
|---|---|---|
| **Anual** (oferta principal) | 12x de R$ 19,86 ou R$ 192 à vista | `pay.kiwify.com.br/Rcvmvex` |
| Mensal (segundo plano) | R$ 37 por mês | `pay.kiwify.com.br/226Zzxj` |

Valores e links ficam só em `src/data/cursos.ts`. Garantia de 7 dias e cancelamento livre
(textos do FAQ, enviados pelo cliente). Certificado de conclusão, que **não** conta como carga
horária de bacharelado.

## Fluxo de compra

1. A pessoa clica em qualquer botão de compra do site ("QUERO COMEÇAR AGORA", "ASSINAR AGORA").
2. Vai **direto ao checkout anual** da Kiwify. Só o botão "ASSINAR" do card mensal leva ao mensal.
3. Paga na Kiwify (cartão ou Pix).
4. Recebe por e-mail o acesso à área de membros; pode usar o app da Kiwify com o mesmo e-mail.

## Catálogo

20 cursos em 5 trilhas (ordem da área de membros). Um curso pode aparecer em mais de uma trilha,
mas tem uma única página.

| Trilha | Cursos |
|---|---|
| Crescimento espiritual | Fundamentos da Fé, Escola de Oração, Como ler a sua Bíblia, Caráter Cristão, Dons Espirituais |
| Teologia sistemática: introdução | Teontologia, Cristologia, Escatologia*, Antropologia Bíblica*, Pneumatologia* |
| Teologia para o dia a dia | Cosmovisão Cristã, Teologia Digital, Teologia do Corpo, Fé e Trabalho, Escola de Sexualidade Bíblica |
| Conheça sua Bíblia | Como ler a sua Bíblia, Panorama do Novo Testamento, Panorama do Antigo Testamento |
| Família e relacionamentos | Salve a sua Família, Namoro Cristão, Encontre a Pessoa Certa |

\* Em preparação (`status: 'em-breve'`). Na vitrine aparecem iguais aos outros; a página do curso
avisa que ele está em preparação e já está incluído na assinatura.

## Situação atual

- Preparado para ficar online **só para demonstração** na Vercel (plano gratuito): em qualquer
  endereço `*.vercel.app` o `vercel.json` envia `noindex`, então a demonstração fica fora do
  Google. A importação do repositório na Vercel é feita pelo cliente.
- Repositório: `github.com/daniloferreirad3v/landing-aprisco`, branch `main`.
- Antes de vender de verdade há pendências legais e de conteúdo: ver [PENDENCIAS.md](../../PENDENCIAS.md),
  grupo 1.
