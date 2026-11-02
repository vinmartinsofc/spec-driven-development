export const SENTIMENTOS = ['positivo', 'neutro', 'negativo'] as const;
export const CATEGORIAS = [
  'bug',
  'funcionalidade',
  'usabilidade',
  'outros',
] as const;

export type Sentimento = (typeof SENTIMENTOS)[number];
export type Categoria = (typeof CATEGORIAS)[number];
export type EstadoFluxo = 'entrada' | 'carregando' | 'resultados';

export interface Feedback {
  texto: string;
  sentimento: Sentimento;
  categoria: Categoria;
  ordem: number;
}

export interface Analise {
  feedbacks: Feedback[];
  total: number;
  contagensSentimento: Record<Sentimento, number>;
  contagensCategoria: Record<Categoria, number>;
}
