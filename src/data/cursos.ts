// FONTE ÚNICA dos cursos, da assinatura e dos links de checkout da Kiwify.
// Páginas, cards, sitemap e dados estruturados leem daqui.
// Nenhum outro arquivo pode conter URL de checkout (ver CLAUDE.md, regra 4).
//
// Conteúdo: as chamadas foram transcritas das capas (design/Capas Cursos e prints da
// área de membros). Campos vazios ou ausentes viram [PREENCHER] nas páginas e estão em
// PENDENCIAS.md. Não completar com texto inventado.

import type { ImageMetadata } from 'astro';
import { trilhas, type TrilhaId } from './trilhas';

// ---------------------------------------------------------------------------
// Assinatura (modelo de venda confirmado em 2026-10-05)
// ---------------------------------------------------------------------------

export type PlanoId = 'mensal' | 'anual';

export interface Plano {
  id: PlanoId;
  nome: string;
  valor: number; // em reais
  periodo: string; // como aparece ao lado do valor
  parcelas?: { quantidade: number; valor: number }; // parcelamento, igual ao da página da Kiwify
  linkKiwify: string; // "" = indisponível (o CtaButton mostra a alternativa)
}

export const assinatura = {
  // A assinatura dá acesso a todos os cursos, inclusive os em preparação (confirmado).
  incluiCursosEmPreparacao: true,
  planos: [
    {
      id: 'mensal',
      nome: 'Plano mensal',
      valor: 37,
      periodo: 'por mês',
      linkKiwify: 'https://pay.kiwify.com.br/226Zzxj',
    },
    {
      id: 'anual',
      nome: 'Plano anual',
      valor: 192,
      periodo: 'à vista, por ano',
      parcelas: { quantidade: 12, valor: 19.86 },
      linkKiwify: 'https://pay.kiwify.com.br/Rcvmvex',
    },
  ] satisfies Plano[],
} as const;

export function getPlano(id: PlanoId): Plano {
  const plano = assinatura.planos.find((p) => p.id === id);
  if (!plano) throw new Error(`Plano desconhecido: ${id}`);
  return plano;
}

export function formatarReais(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: Number.isInteger(valor) ? 0 : 2,
  });
}

/** Valor só com centavos, sem "R$" (ex.: "19,86"), para destacar o número. */
export function formatarNumero(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: Number.isInteger(valor) ? 0 : 2 });
}

/**
 * Oferta de destaque do site (pedido do cliente, 2026-10-05): o plano anual parcelado,
 * com ênfase no valor da parcela. O preço à vista e o total a prazo são CALCULADOS.
 * O card do plano mostra a parcela e o à vista; o total a prazo saiu do card por decisão
 * do cliente e aparece só no FAQ (pendência jurídica em PENDENCIAS.md).
 */
const anual = getPlano('anual');
if (!anual.parcelas) throw new Error('O plano anual precisa de `parcelas` para a oferta de destaque.');
export const ofertaDestaque = {
  plano: anual,
  quantidade: anual.parcelas.quantidade,
  parcela: anual.parcelas.valor,
  aVista: anual.valor,
  totalAPrazo: Math.round(anual.parcelas.quantidade * anual.parcelas.valor * 100) / 100,
  /** "12x de R$ 19,86" */
  texto: `${anual.parcelas.quantidade}x de ${formatarReais(anual.parcelas.valor)}`,
};

// ---------------------------------------------------------------------------
// Cursos
// ---------------------------------------------------------------------------

export type StatusCurso = 'disponivel' | 'em-breve';

export interface Curso {
  slug: string; // vira /cursos/<slug>
  nome: string;
  tituloSeo: string; // início do <title> (a marca é acrescentada pelo layout)
  trilha: TrilhaId; // trilha principal (breadcrumbs e "Teologia sistemática" acima do h1)
  chamada: string; // frase curta, transcrita da capa
  descricao: string; // 2–4 frases; "" = [PREENCHER]
  paraQuem: string[]; // [] = [PREENCHER]
  aprendizados: string[]; // módulos/temas; [] = [PREENCHER]
  formato?: string;
  cargaHoraria?: string;
  professor?: string;
  palavraChave: string; // proposta; validar com o cliente (PENDENCIAS.md)
  status: StatusCurso;
  revisaoSensivel?: boolean; // tema que exige revisão doutrinária cuidadosa
  capa?: ImageMetadata; // preenchida automaticamente por slug
}

type CursoBase = Omit<Curso, 'capa' | 'descricao' | 'paraQuem' | 'aprendizados'> &
  Partial<Pick<Curso, 'descricao' | 'paraQuem' | 'aprendizados'>>;

const base: CursoBase[] = [
  // Crescimento espiritual
  {
    slug: 'fundamentos-da-fe',
    nome: 'Fundamentos da Fé',
    tituloSeo: 'Curso Fundamentos da Fé Cristã',
    trilha: 'crescimento-espiritual',
    chamada: 'Introdução ao evangelho e à vida cristã.',
    palavraChave: 'curso fundamentos da fé cristã',
    status: 'disponivel',
  },
  {
    slug: 'escola-de-oracao',
    nome: 'Escola de Oração',
    tituloSeo: 'Escola de Oração: curso de oração online',
    trilha: 'crescimento-espiritual',
    chamada: 'Aprenda a orar como Jesus e os apóstolos.',
    palavraChave: 'curso de oração',
    status: 'disponivel',
  },
  {
    slug: 'como-ler-a-sua-biblia',
    nome: 'Como ler a sua Bíblia',
    tituloSeo: 'Como ler a Bíblia: curso online',
    trilha: 'crescimento-espiritual',
    chamada: 'Aprendendo a ouvir a voz de Deus e construindo uma relação de amor com as Escrituras.',
    palavraChave: 'como ler a Bíblia',
    status: 'disponivel',
  },
  {
    slug: 'carater-cristao',
    nome: 'Caráter Cristão',
    tituloSeo: 'Curso Caráter Cristão',
    trilha: 'crescimento-espiritual',
    chamada: 'Desenvolvendo o caráter cristão por meio da obra do Espírito Santo.',
    palavraChave: 'caráter cristão',
    status: 'disponivel',
  },
  {
    slug: 'dons-espirituais',
    nome: 'Dons Espirituais',
    tituloSeo: 'Curso de Dons Espirituais',
    trilha: 'crescimento-espiritual',
    chamada: 'Descubra como servir a Deus através dos dons do Espírito disponíveis para você.',
    palavraChave: 'curso de dons espirituais',
    status: 'disponivel',
  },

  // Teologia sistemática: introdução
  {
    slug: 'teontologia',
    nome: 'Teontologia',
    tituloSeo: 'Teontologia: curso sobre o ser de Deus',
    trilha: 'teologia-sistematica',
    chamada: 'Aprenda sobre o ser de Deus: seus atributos, sua natureza, seu caráter e seu poder.',
    palavraChave: 'teontologia',
    status: 'disponivel',
  },
  {
    slug: 'cristologia',
    nome: 'Cristologia',
    tituloSeo: 'Curso de Cristologia',
    trilha: 'teologia-sistematica',
    chamada: 'Aprenda sobre os mistérios de Cristo na Palavra de Deus.',
    palavraChave: 'curso de cristologia',
    status: 'disponivel',
  },
  {
    slug: 'escatologia',
    nome: 'Escatologia',
    tituloSeo: 'Curso de Escatologia',
    trilha: 'teologia-sistematica',
    chamada: 'Estude a doutrina do fim dos tempos.',
    palavraChave: 'curso de escatologia',
    status: 'em-breve',
    revisaoSensivel: true,
  },
  {
    slug: 'antropologia-biblica',
    nome: 'Antropologia Bíblica',
    tituloSeo: 'Curso de Antropologia Bíblica',
    trilha: 'teologia-sistematica',
    chamada: 'Aprenda sobre a criação, a natureza e o propósito final da humanidade.',
    palavraChave: 'antropologia bíblica',
    status: 'em-breve',
  },
  {
    slug: 'pneumatologia',
    nome: 'Pneumatologia',
    tituloSeo: 'Curso de Pneumatologia',
    trilha: 'teologia-sistematica',
    chamada: 'Aprenda sobre a natureza e o ministério do Espírito Santo.',
    palavraChave: 'curso de pneumatologia',
    status: 'em-breve',
  },

  // Teologia para o dia a dia
  {
    slug: 'cosmovisao-crista',
    nome: 'Cosmovisão Cristã',
    tituloSeo: 'Curso de Cosmovisão Cristã',
    trilha: 'teologia-para-o-dia-a-dia',
    chamada: 'Interpretando o mundo à luz da Palavra de Deus.',
    palavraChave: 'curso de cosmovisão cristã',
    status: 'disponivel',
  },
  {
    slug: 'teologia-digital',
    nome: 'Teologia Digital',
    tituloSeo: 'Teologia Digital: fé na era da internet',
    trilha: 'teologia-para-o-dia-a-dia',
    chamada: 'Vivendo para a glória de Deus na era da internet.',
    palavraChave: 'teologia digital',
    status: 'disponivel',
  },
  {
    slug: 'teologia-do-corpo',
    nome: 'Teologia do Corpo',
    tituloSeo: 'Curso Teologia do Corpo',
    trilha: 'teologia-para-o-dia-a-dia',
    chamada: 'Restaurando uma visão bíblica de corpo num mundo caído.',
    palavraChave: 'teologia do corpo',
    status: 'disponivel',
    revisaoSensivel: true,
  },
  {
    slug: 'fe-e-trabalho',
    nome: 'Fé e Trabalho',
    tituloSeo: 'Curso Fé e Trabalho',
    trilha: 'teologia-para-o-dia-a-dia',
    chamada: 'Glorificando a Deus num mundo caído.',
    palavraChave: 'fé e trabalho',
    status: 'disponivel',
  },
  {
    slug: 'escola-de-sexualidade-biblica',
    nome: 'Escola de Sexualidade Bíblica',
    tituloSeo: 'Escola de Sexualidade Bíblica',
    trilha: 'teologia-para-o-dia-a-dia',
    chamada: 'Colocando em ordem identidade, desejos e emoções fora do lugar.',
    palavraChave: 'sexualidade bíblica',
    status: 'disponivel',
    revisaoSensivel: true,
  },

  // Conheça sua Bíblia ("Como ler a sua Bíblia" também aparece aqui, ver trilhas.ts)
  {
    slug: 'panorama-novo-testamento',
    nome: 'Panorama do Novo Testamento',
    tituloSeo: 'Panorama do Novo Testamento: curso online',
    trilha: 'conheca-sua-biblia',
    chamada: 'Mergulhe numa jornada entre os Evangelhos, Atos, Cartas e Apocalipse.',
    palavraChave: 'panorama do Novo Testamento',
    status: 'disponivel',
  },
  {
    slug: 'panorama-antigo-testamento',
    nome: 'Panorama do Antigo Testamento',
    tituloSeo: 'Panorama do Antigo Testamento: curso online',
    trilha: 'conheca-sua-biblia',
    chamada:
      'Descubra a beleza da revelação de Deus nas páginas do Antigo Testamento e compreenda toda a sua estrutura bíblica.',
    palavraChave: 'panorama do Antigo Testamento',
    status: 'disponivel',
  },

  // Família e relacionamentos
  {
    slug: 'salve-a-sua-familia',
    nome: 'Salve a sua Família',
    tituloSeo: 'Salve a sua Família: curso sobre casamento',
    trilha: 'familia-e-relacionamentos',
    chamada: 'Vivendo a restauração e os propósitos de Deus para o casamento.',
    palavraChave: 'curso para casais cristãos',
    status: 'disponivel',
    revisaoSensivel: true,
  },
  {
    slug: 'namoro-cristao',
    nome: 'Namoro Cristão',
    tituloSeo: 'Curso de Namoro Cristão',
    trilha: 'familia-e-relacionamentos',
    // Transcrita da capa; expressão informal pendente de confirmação (PENDENCIAS.md).
    chamada:
      'Vivendo um relacionamento para a glória de Deus e aprendendo a controlar o fogo no parquinho enquanto esperam.',
    palavraChave: 'curso de namoro cristão',
    status: 'disponivel',
    revisaoSensivel: true,
  },
  {
    slug: 'encontre-a-pessoa-certa',
    nome: 'Encontre a Pessoa Certa',
    tituloSeo: 'Encontre a Pessoa Certa: curso cristão',
    trilha: 'familia-e-relacionamentos',
    chamada: 'Escolha de maneira bíblica e viva um casamento abençoado.',
    palavraChave: 'como encontrar a pessoa certa',
    status: 'disponivel',
    revisaoSensivel: true,
  },
  // FLM e a trilha "Treinamento e capacitação" foram retirados do site a pedido do cliente (2026-10-05).
];

// Capas: src/assets/cursos/<slug>.png (cópias de design/Capas Cursos).
const capas = import.meta.glob<{ default: ImageMetadata }>('../assets/cursos/*.png', { eager: true });

function capaDoCurso(slug: string): ImageMetadata | undefined {
  return capas[`../assets/cursos/${slug}.png`]?.default;
}

export const cursos: Curso[] = base.map((c) => ({
  descricao: '',
  paraQuem: [],
  aprendizados: [],
  ...c,
  capa: capaDoCurso(c.slug),
}));

// ---------------------------------------------------------------------------
// Consultas
// ---------------------------------------------------------------------------

export function getCurso(slug: string): Curso {
  const curso = cursos.find((c) => c.slug === slug);
  if (!curso) throw new Error(`Curso desconhecido: ${slug}`);
  return curso;
}

export function cursosDaTrilha(id: TrilhaId): Curso[] {
  const trilha = trilhas.find((t) => t.id === id);
  return trilha ? trilha.cursos.map(getCurso) : [];
}

/** Trilhas em que o curso aparece (a principal primeiro). */
export function trilhasDoCurso(curso: Curso): TrilhaId[] {
  const outras = trilhas.filter((t) => t.id !== curso.trilha && t.cursos.includes(curso.slug)).map((t) => t.id);
  return [curso.trilha, ...outras];
}

/** Cursos relacionados: mesma trilha primeiro, sem repetir o próprio curso. */
export function cursosRelacionados(curso: Curso, limite = 3): Curso[] {
  const ids = trilhasDoCurso(curso);
  const vistos = new Set<string>([curso.slug]);
  const lista: Curso[] = [];
  for (const id of ids) {
    for (const c of cursosDaTrilha(id)) {
      if (!vistos.has(c.slug)) {
        vistos.add(c.slug);
        lista.push(c);
      }
    }
  }
  return lista.slice(0, limite);
}

export function urlDoCurso(curso: Curso): string {
  return `/cursos/${curso.slug}`;
}

// ---------------------------------------------------------------------------
// Verificação de integridade (roda no build)
// ---------------------------------------------------------------------------

(function verificar() {
  const slugs = new Set<string>();
  for (const c of cursos) {
    if (slugs.has(c.slug)) throw new Error(`Slug duplicado em cursos.ts: ${c.slug}`);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.slug)) throw new Error(`Slug inválido: ${c.slug}`);
    slugs.add(c.slug);
  }
  for (const t of trilhas) {
    for (const s of t.cursos) {
      if (!slugs.has(s)) throw new Error(`Trilha "${t.id}" referencia curso inexistente: ${s}`);
    }
  }
  for (const c of cursos) {
    if (!trilhas.some((t) => t.cursos.includes(c.slug))) {
      throw new Error(`Curso fora de qualquer trilha: ${c.slug}`);
    }
  }
  const palavras = new Map<string, string>();
  for (const c of cursos) {
    const chave = c.palavraChave.toLowerCase();
    const outro = palavras.get(chave);
    if (outro) throw new Error(`Canibalização: "${c.palavraChave}" usada por ${outro} e ${c.slug}`);
    palavras.set(chave, c.slug);
  }
})();
