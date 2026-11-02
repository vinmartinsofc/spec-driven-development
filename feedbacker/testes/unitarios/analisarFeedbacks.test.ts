import { describe, expect, it } from 'vitest';
import { analisarFeedbacks } from '../../src/dominio/analisarFeedbacks';

describe('analisarFeedbacks', () => {
  it('preserva a ordem e as duplicatas e ignora linhas vazias', () => {
    const analise = analisarFeedbacks(
      '\n O app trava ao salvar. \r\n\r\nO app trava ao salvar.\n  ',
    );

    expect(analise.feedbacks.map(({ texto, ordem }) => [texto, ordem])).toEqual([
      ['O app trava ao salvar.', 2],
      ['O app trava ao salvar.', 4],
    ]);
    expect(analise.total).toBe(2);
  });

  it('mantém contagens de sentimentos e categorias iguais ao total', () => {
    const analise = analisarFeedbacks(
      'O app trava.\nGostaria de exportar em PDF.\nAdorei o novo painel.',
    );

    expect(analise.contagensSentimento).toEqual({
      positivo: 1,
      neutro: 1,
      negativo: 1,
    });
    expect(analise.contagensCategoria).toEqual({
      bug: 1,
      funcionalidade: 1,
      usabilidade: 0,
      outros: 1,
    });
    expect(analise.total).toBe(3);
  });

  it('retorna contagens zeradas quando não há linhas válidas', () => {
    expect(analisarFeedbacks(' \n\r\n\t')).toEqual({
      feedbacks: [],
      total: 0,
      contagensSentimento: { positivo: 0, neutro: 0, negativo: 0 },
      contagensCategoria: {
        bug: 0,
        funcionalidade: 0,
        usabilidade: 0,
        outros: 0,
      },
    });
  });
});
