// FAQ PROVISÓRIO (rascunho autorizado pelo cliente em 2026-10-05).
// Substituir pelo FAQ definitivo antes do lançamento (PENDENCIAS.md).
//
// Regra: só afirma o que está confirmado (preço, planos, acesso a todos os cursos,
// compra pela Kiwify). O que não se sabe vai em `pendente` e aparece como [PREENCHER].

import { formatarReais, getPlano } from './cursos';

export interface ItemFaq {
  pergunta: string;
  resposta: string; // texto confirmado; pode ser "" quando tudo está pendente
  pendente?: string; // o que falta confirmar (renderizado como [PREENCHER])
}

export const faqRascunho = true;

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
    resposta: `Há dois planos. O mensal custa ${formatarReais(mensal.valor)} por mês. O anual custa ${formatarReais(anual.valor)} à vista${anual.parcelamento ? ` ${anual.parcelamento}` : ''}.`,
  },
  {
    pergunta: 'Onde eu faço o pagamento?',
    resposta:
      'O pagamento é feito na Kiwify, plataforma que processa a compra e hospeda a área de membros. O site do APRISCO não recebe nem guarda seus dados de pagamento.',
    pendente: 'formas de pagamento aceitas (cartão, Pix, boleto)',
  },
  {
    pergunta: 'Como recebo o acesso depois de assinar?',
    resposta: '',
    pendente: 'como e quando o aluno recebe o acesso à área de membros',
  },
  {
    pergunta: 'Posso cancelar quando quiser?',
    resposta: '',
    pendente: 'regras de cancelamento da assinatura',
  },
  {
    pergunta: 'Existe garantia?',
    resposta: '',
    pendente: 'prazo e condições de garantia/reembolso oferecidos na Kiwify',
  },
  {
    pergunta: 'Os cursos têm certificado?',
    resposta: '',
    pendente: 'se há certificado, carga horária e regras',
  },
  {
    pergunta: 'Consigo estudar pelo celular?',
    resposta: '',
    pendente: 'em quais dispositivos a área de membros funciona',
  },
  {
    pergunta: 'Preciso ter estudado teologia antes?',
    resposta: '',
    pendente: 'pré-requisitos e nível dos cursos',
  },
];
