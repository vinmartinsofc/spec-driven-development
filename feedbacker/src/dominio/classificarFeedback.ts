import type { Categoria, Sentimento } from './tipos';

interface Classificacao {
  sentimento: Sentimento;
  categoria: Categoria;
}

const PALAVRAS_BUG = [
  'trava',
  'travar',
  'travamento',
  'erro',
  'erros',
  'lento',
  'lenta',
  'lentidão',
];

const PALAVRAS_FUNCIONALIDADE = [
  'exportar',
  'exportação',
  'gostaria',
  'seria bom',
];

const PALAVRAS_USABILIDADE = [
  'confuso',
  'confusa',
  'escondido',
  'escondida',
  'difícil',
];

const PALAVRAS_POSITIVAS = [
  'adorei',
  'ótimo',
  'ótima',
  'muito bom',
  'muito boa',
];

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLocaleLowerCase('pt-BR');
}

function contemPalavra(texto: string, palavra: string): boolean {
  const termo = normalizar(palavra).replace(/\s+/g, '\\s+');
  const limitePalavra = new RegExp(
    `(?:^|[^\\p{L}\\p{N}])${termo}(?=$|[^\\p{L}\\p{N}])`,
    'u',
  );

  return limitePalavra.test(texto);
}

function contemAlguma(texto: string, palavras: string[]): boolean {
  return palavras.some((palavra) => contemPalavra(texto, palavra));
}

export function classificarFeedback(texto: string): Classificacao {
  const textoNormalizado = normalizar(texto);
  const temBug = contemAlguma(textoNormalizado, PALAVRAS_BUG);
  const temPositivo = contemAlguma(textoNormalizado, PALAVRAS_POSITIVAS);
  const temCategoriaFuncionalidade = contemAlguma(
    textoNormalizado,
    PALAVRAS_FUNCIONALIDADE,
  );
  const temCategoriaUsabilidade = contemAlguma(
    textoNormalizado,
    PALAVRAS_USABILIDADE,
  );

  const categoria: Categoria = temBug
    ? 'bug'
    : temCategoriaFuncionalidade
      ? 'funcionalidade'
      : temCategoriaUsabilidade
        ? 'usabilidade'
        : 'outros';

  const sentimento: Sentimento = temBug
    ? 'negativo'
    : temPositivo
      ? 'positivo'
      : 'neutro';

  return { sentimento, categoria };
}
