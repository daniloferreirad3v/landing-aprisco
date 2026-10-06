// FAQ da seção "Dúvidas antes de assinar".
// Textos enviados pelo cliente em 2026-10-06 (substituem o rascunho provisório da Fase 2).
//
// Regra: preço e parcelamento NUNCA são digitados aqui — vêm de cursos.ts, para o site
// não divergir da Kiwify. O que ainda não foi confirmado vai em `pendente` ([PREENCHER]).

import { formatarReais, getPlano, ofertaDestaque } from './cursos';

export interface ItemFaq {
  pergunta: string;
  resposta: string; // texto confirmado; pode ser "" quando tudo está pendente
  lista?: string[]; // itens em lista, quando a resposta enumera (ex.: os planos)
  pendente?: string; // o que falta confirmar (renderizado como [PREENCHER])
}

const mensal = getPlano('mensal');
const anual = getPlano('anual');

export const faqGeral: ItemFaq[] = [
  {
    pergunta: 'Como funciona a assinatura?',
    resposta:
      'Você assina o APRISCO e tem acesso a todos os cursos do catálogo. Os cursos que ainda estão em preparação também fazem parte da assinatura e ficam disponíveis assim que forem liberados.',
  },
  {
    pergunta: 'Quanto custa?',
    resposta:
      'O APRISCO tem dois planos de assinatura, para você escolher o que se adequa melhor à sua realidade:',
    lista: [
      `Plano mensal: por apenas ${formatarReais(mensal.valor)} ${mensal.periodo} (sem ocupar espaço no seu cartão).`,
      `Plano anual: por apenas ${ofertaDestaque.texto} (total de ${formatarReais(ofertaDestaque.totalAPrazo)}) ou ${formatarReais(anual.valor)} à vista.`,
    ],
  },
  {
    pergunta: 'Onde eu faço meu pagamento?',
    resposta:
      'Basta clicar em "ASSINAR AGORA". O pagamento é feito na Kiwify, plataforma que processa a compra e hospeda a área de membros. O site do APRISCO não recebe nem guarda seus dados de pagamento. Você pode pagar com cartão, Pix ou boleto.',
  },
  {
    pergunta: 'Como recebo o acesso depois de assinar?',
    resposta:
      'É muito simples! Você receberá diretamente no seu e-mail o acesso à nossa área de membros. Basta seguir o passo a passo. Se quiser melhorar a sua experiência, baixe o app da Kiwify e cadastre-se com o mesmo e-mail da compra. O Seminário Teológico APRISCO estará lá dentro!',
  },
  {
    pergunta: 'Posso cancelar quando quiser?',
    resposta: 'Sim, você pode cancelar quando quiser.',
  },
  {
    pergunta: 'Existe garantia?',
    resposta:
      'Todos os nossos cursos têm a garantia do consumidor de 7 dias, para cancelamento com reembolso.',
  },
  {
    pergunta: 'Os cursos têm certificado?',
    resposta:
      'Todos os nossos cursos têm certificado de reconhecimento de conclusão. Porém, por ser um seminário teológico e não um bacharelado em Teologia, o certificado não conta como carga horária para um bacharelado em Teologia.',
  },
  {
    pergunta: 'Consigo estudar pelo celular?',
    resposta:
      'Sim, com certeza! O APRISCO foi pensado para facilitar os seus estudos teológicos, levando em conta a sua mobilidade e a correria do dia a dia.',
  },
  {
    pergunta: 'Preciso ter estudado teologia antes?',
    resposta:
      'Não. O APRISCO é uma jornada de crescimento espiritual e teológico. Nosso caminho pedagógico faz com que todos consigam estudar e aprender teologia de maneira profunda e descomplicada, tornando-se capazes, ao longo da jornada, de falar, pregar, ensinar e conversar sobre teologia, mesmo que nunca tenham estudado o assunto.',
  },
];
