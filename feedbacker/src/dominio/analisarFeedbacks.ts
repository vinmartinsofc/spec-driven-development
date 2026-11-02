import { CATEGORIAS, SENTIMENTOS, type Analise } from './tipos';
import { classificarFeedback } from './classificarFeedback';

export function analisarFeedbacks(texto: string): Analise {
  const feedbacks = texto
    .split(/\r\n|\n|\r/)
    .map((linha, indice) => ({ texto: linha.trim(), ordem: indice + 1 }))
    .filter(({ texto }) => Boolean(texto))
    .map(({ texto: linha, ordem }) => ({
      texto: linha,
      ordem,
      ...classificarFeedback(linha),
    }));

  const contagensSentimento = Object.fromEntries(
    SENTIMENTOS.map((sentimento) => [sentimento, 0]),
  ) as Analise['contagensSentimento'];
  const contagensCategoria = Object.fromEntries(
    CATEGORIAS.map((categoria) => [categoria, 0]),
  ) as Analise['contagensCategoria'];

  for (const feedback of feedbacks) {
    contagensSentimento[feedback.sentimento] += 1;
    contagensCategoria[feedback.categoria] += 1;
  }

  return {
    feedbacks,
    total: feedbacks.length,
    contagensSentimento,
    contagensCategoria,
  };
}
