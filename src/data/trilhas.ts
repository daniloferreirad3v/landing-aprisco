// Trilhas (categorias) do catálogo, na ordem da área de membros.
// A ordem dos cursos dentro de cada trilha é definida aqui. Um curso pode aparecer
// em mais de uma trilha (ex.: "Como ler a sua Bíblia"), mas tem uma única página.

export type TrilhaId =
  | 'crescimento-espiritual'
  | 'teologia-sistematica'
  | 'teologia-para-o-dia-a-dia'
  | 'conheca-sua-biblia'
  | 'familia-e-relacionamentos'
  | 'treinamento-e-capacitacao';

export interface Trilha {
  id: TrilhaId;
  nome: string;
  cursos: string[]; // slugs, na ordem de exibição
}

export const trilhas: Trilha[] = [
  {
    id: 'crescimento-espiritual',
    nome: 'Crescimento espiritual',
    cursos: ['fundamentos-da-fe', 'escola-de-oracao', 'como-ler-a-sua-biblia', 'carater-cristao', 'dons-espirituais'],
  },
  {
    id: 'teologia-sistematica',
    nome: 'Teologia sistemática: introdução',
    cursos: ['teontologia', 'cristologia', 'escatologia', 'antropologia-biblica', 'pneumatologia'],
  },
  {
    id: 'teologia-para-o-dia-a-dia',
    nome: 'Teologia para o dia a dia',
    cursos: ['cosmovisao-crista', 'teologia-digital', 'teologia-do-corpo', 'fe-e-trabalho', 'escola-de-sexualidade-biblica'],
  },
  {
    id: 'conheca-sua-biblia',
    nome: 'Conheça sua Bíblia',
    cursos: ['como-ler-a-sua-biblia', 'panorama-novo-testamento', 'panorama-antigo-testamento'],
  },
  {
    id: 'familia-e-relacionamentos',
    nome: 'Família e relacionamentos',
    cursos: ['salve-a-sua-familia', 'namoro-cristao', 'encontre-a-pessoa-certa'],
  },
  {
    id: 'treinamento-e-capacitacao',
    nome: 'Treinamento e capacitação',
    cursos: ['flm'],
  },
];

export function getTrilha(id: TrilhaId): Trilha {
  const trilha = trilhas.find((t) => t.id === id);
  if (!trilha) throw new Error(`Trilha desconhecida: ${id}`);
  return trilha;
}
