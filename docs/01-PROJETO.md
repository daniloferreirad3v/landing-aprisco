# 01 — Projeto, público e objetivos

## Resumo

| Item | Valor |
|---|---|
| Marca | Seminário Teológico APRISCO (símbolo: cordeiro) |
| Domínio | `[PREENCHER: domínio]` (registrado no nome do cliente) |
| Idioma | Português do Brasil |
| Tipo | Site estático (Astro) |
| Checkout e área de membros | Kiwify (externo, não muda) |
| Hospedagem | Vercel (plano Pro, uso comercial) |

## Como o ecossistema se divide

```
Instagram / WhatsApp / Google
            │
            ▼
   Site APRISCO (este projeto)      ← apresenta, convence, ranqueia
            │  botão "Quero me inscrever"
            ▼
   Checkout Kiwify                  ← pagamento, e-mail, nota, reembolso
            │
            ▼
   Área de membros Kiwify           ← aulas, materiais, progresso do aluno
```

O arquivo de referência `design/referencias/area-de-membros-kiwify.png` (se presente) mostra a **área de membros**, que continua na Kiwify. Ela serve de **referência de catálogo e de clima visual**, não de layout a copiar. O site público é outra coisa: precisa vender e ser encontrado no Google.

## Público

Cristãos brasileiros que querem estudar teologia com profundidade e aplicação prática: membros de igreja, líderes de célula/mesa, pastores e jovens. Vêm principalmente do **celular**, por Instagram, WhatsApp e indicação. Muitos nunca ouviram falar da escola, então a confiança vem antes da venda: quem ensina, o que será estudado, como funciona, o que fazer em caso de dúvida.

## Objetivos, em ordem de prioridade

1. Transmitir seriedade e acolhimento nos primeiros segundos (identidade forte, texto claro).
2. Levar o visitante ao checkout certo da Kiwify com o menor atrito possível.
3. Ser encontrado no Google por buscas de nicho (cursos e temas específicos), não por termos genéricos disputados.
4. Servir de base para um blog que atraia tráfego orgânico e alimente os cursos.
5. Ser rápido e leve (a maior parte do tráfego é celular).

## Fora de escopo

Login, área do aluno, carrinho próprio, processamento de pagamento, painel administrativo, comentários. Se alguma dessas coisas for pedida, avise que muda a arquitetura antes de fazer.

## Perguntas em aberto (perguntar ao cliente antes de fechar o conteúdo)

Registre as respostas aqui conforme chegarem.

1. **Modelo de venda:** os cursos são vendidos separadamente, existe um plano/assinatura que libera tudo, ou os dois? (Define se há um CTA principal ou um por curso.)
2. Na área de membros alguns cursos aparecem com cadeado. Isso significa que há cursos ainda não lançados, vendidos à parte ou liberados por plano? Quais devem ter página pública agora?
3. Preço, parcelamento e garantia: quais valores e prazos devem aparecer no site? (A Kiwify é a fonte da verdade; o site não deve divergir dela.)
4. Há certificado? Com qual carga horária e quais regras?
5. Quem são os professores/o fundador? Foto, minibiografia, formação e ministério para a página "Quem somos".
6. Existem depoimentos reais de alunos, com autorização para publicar?
7. A escola tem linha doutrinária ou confissão que deve aparecer (por exemplo, uma declaração de fé)? Isso gera confiança e boas buscas.
8. Canais oficiais: Instagram, YouTube, WhatsApp de atendimento, e-mail de contato.
9. Há CNPJ/razão social e endereço para o rodapé e a política de privacidade?
10. Existe material (aulas gratuitas, aula experimental, PDF) que possa servir de isca para quem ainda não está pronto para comprar?

### Respostas recebidas

- **2026-10-05, pergunta 1:** venda **por assinatura**. Há um único checkout na Kiwify, e todos os botões de compra levam a ele.
- **2026-10-05, pergunta 2:** o cadeado indica **curso ainda não liberado** (Escatologia, Antropologia Bíblica e Pneumatologia). No site, eles recebem o status "em-breve".
- **2026-10-05, fontes:** usar as fontes das peças do Canva (identificadas como Anton e Montserrat).
- **2026-10-05, fotos:** não existem versões das peças sem texto. O hero será tipográfico sobre fundo preto até haver foto.
- **2026-10-05, promessa:** usar por enquanto as frases das peças ("Estude teologia de maneira profunda e descomplicada." e "Uma fé rasa, uma vida rasa."). O CTA definitivo será revisto depois.
- **2026-10-05, assinatura:** dois planos, já publicados na Kiwify:
  - **Mensal:** R$ 37,00 por mês.
  - **Anual:** R$ 192,00 à vista ou 12x de R$ 19,86.
  - Checkout do **mensal**: `https://pay.kiwify.com.br/226Zzxj` (oficial; se mudar, o cliente avisa).
  - Checkout do **anual**: `https://pay.kiwify.com.br/Rcvmvex` (oficial; se mudar, o cliente avisa).
- **2026-10-05, acesso:** a assinatura dá acesso a **todos** os cursos, inclusive aos que ainda não foram liberados (estão em preparação).
- **2026-10-05, FAQ:** usar um FAQ provisório até o cliente enviar o definitivo. Ele fica marcado como rascunho no código e em `PENDENCIAS.md`, e as respostas sem fonte aparecem com [PREENCHER].
- **2026-10-05, blog:** fora do escopo. A Fase 4 (blog) não será feita, e o link saiu do menu.
- **2026-10-05, home:** reforçar a cara de página de vendas de alta conversão (ver docs/design-plan.md, seção 9).
- **2026-10-05, arquitetura:** **single page**. A home concentra tudo, e o menu rola até as seções #cursos, #sobre, #planos, #duvidas e #contato. As 21 páginas de curso continuam existindo só como porta de entrada pelo Google e por anúncios: ficam no sitemap, mas não recebem link da home. Os cards de curso na home são só vitrine, sem clique. Catálogo, Sobre e Contato deixaram de ser páginas. Política de privacidade, termos e 404 continuam separadas.
- **2026-10-05, catálogo:** o curso FLM e a trilha "Treinamento e capacitação" foram retirados do site. Agora são 20 cursos em 5 trilhas.

## Tom de voz

Acolhedor, claro e firme. Fala com o aluno como um professor que respeita a Palavra e a pessoa. Evita jargão acadêmico sem explicar, evita promessas exageradas ("transforme sua vida em 7 dias") e evita pressão artificial. Frases curtas. Verbos de ação nos botões.
