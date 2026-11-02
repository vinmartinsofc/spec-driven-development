import { describe, expect, it } from 'vitest';
import { classificarFeedback } from '../../src/dominio/classificarFeedback';

describe('classificarFeedback', () => {
  it('classifica palavras de erro como sentimento negativo e categoria de bug', () => {
    expect(classificarFeedback('O sistema está lento')).toEqual({
      sentimento: 'negativo',
      categoria: 'bug',
    });
  });

  it('reconhece pedidos de funcionalidade sem inferir sentimento', () => {
    expect(classificarFeedback('Gostaria de exportar em PDF')).toEqual({
      sentimento: 'neutro',
      categoria: 'funcionalidade',
    });
  });

  it('reconhece usabilidade ignorando acentos e capitalização', () => {
    expect(classificarFeedback('É DIFÍCIL encontrar o botão')).toEqual({
      sentimento: 'neutro',
      categoria: 'usabilidade',
    });
  });

  it('classifica elogios sem categoria como positivos e outros', () => {
    expect(classificarFeedback('Adorei o novo painel, muito bom')).toEqual({
      sentimento: 'positivo',
      categoria: 'outros',
    });
  });

  it('prioriza bug quando mais de uma categoria aparece', () => {
    expect(classificarFeedback('O app trava ao exportar')).toEqual({
      sentimento: 'negativo',
      categoria: 'bug',
    });
  });

  it('prioriza sentimento negativo quando os sinais entram em conflito', () => {
    expect(classificarFeedback('Adorei, mas ocorreu um erro')).toEqual({
      sentimento: 'negativo',
      categoria: 'bug',
    });
  });

  it('usa sentimento neutro e categoria outros sem palavras reconhecidas', () => {
    expect(classificarFeedback('Uma observação sem regra conhecida')).toEqual({
      sentimento: 'neutro',
      categoria: 'outros',
    });
  });
});
