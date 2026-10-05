// Montagem de <title> e meta description (regras em docs/03-SEO.md).
import { ofertaDestaque, type Curso } from '../data/cursos';
import { site } from '../data/site';

const LIMITE_TITULO = 65;

/** "Base | Seminário Teológico APRISCO"; se passar do limite, usa só "APRISCO". */
export function montarTitulo(base: string): string {
  const completo = `${base} | ${site.nome}`;
  return completo.length <= LIMITE_TITULO ? completo : `${base} | ${site.nomeCurto}`;
}

export function tituloDoCurso(curso: Curso): string {
  return montarTitulo(curso.tituloSeo);
}

const DESCRICAO_MIN = 120;
const DESCRICAO_MAX = 160;

/**
 * Description única por curso: a chamada (texto da capa) + como acessar.
 * As chamadas variam de ~35 a ~115 caracteres, então o complemento é escolhido
 * para o total ficar entre 120 e 160 (ou o mais perto disso).
 */
export function descricaoDoCurso(curso: Curso): string {
  const parcela = ofertaDestaque.texto;
  const complementos =
    curso.status === 'em-breve'
      ? [
          `Curso em preparação no Seminário Teológico APRISCO, já incluído na assinatura anual em ${parcela}.`,
          'Em preparação e já incluído na assinatura do Seminário Teológico APRISCO.',
          'Em preparação no APRISCO, já incluído na assinatura.',
        ]
      : [
          `Curso online do Seminário Teológico APRISCO, incluído na assinatura anual em ${parcela}.`,
          'Curso online incluído na assinatura do Seminário Teológico APRISCO.',
          'Curso online do APRISCO, incluído na assinatura.',
        ];
  const opcoes = complementos.map((c) => `${curso.chamada} ${c}`);
  const distancia = (t: string) => {
    const n = [...t].length;
    return n < DESCRICAO_MIN ? DESCRICAO_MIN - n : n > DESCRICAO_MAX ? n - DESCRICAO_MAX : 0;
  };
  return opcoes.reduce((melhor, atual) => (distancia(atual) < distancia(melhor) ? atual : melhor));
}
