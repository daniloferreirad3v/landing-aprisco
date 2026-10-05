// Dados institucionais do site. Fonte única para nome, contato e redes.
// Itens [PREENCHER] estão listados em PENDENCIAS.md.

export const site = {
  nome: 'Seminário Teológico APRISCO',
  nomeCurto: 'APRISCO',
  descricaoPadrao:
    'Cursos online de teologia bíblica do Seminário Teológico APRISCO: estude a Palavra de Deus de maneira profunda e descomplicada, no seu ritmo.',
  locale: 'pt_BR',
  corTema: '#000000',
  ogImagemPadrao: '/og/default.jpg',
  ogImagemAlt: 'Seminário Teológico APRISCO, com o símbolo do cordeiro',
  contato: {
    email: '', // [PREENCHER: e-mail de contato]
    whatsapp: '', // [PREENCHER: WhatsApp de atendimento, só dígitos com DDI, ex.: 5511999999999]
    horario: '', // [PREENCHER: horário de atendimento]
  },
  redes: {
    instagram: '', // [PREENCHER: URL do Instagram]
    youtube: '', // [PREENCHER: URL do YouTube, se houver]
  },
  empresa: {
    razaoSocial: '', // [PREENCHER: razão social]
    cnpj: '', // [PREENCHER: CNPJ]
  },
} as const;

export const navegacao = [
  { href: '/cursos', rotulo: 'Cursos' },
  { href: '/sobre', rotulo: 'Quem somos' },
  { href: '/contato', rotulo: 'Contato' },
] as const;
