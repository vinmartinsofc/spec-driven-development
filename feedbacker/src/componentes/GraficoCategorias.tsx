import { CATEGORIAS, type Categoria } from '../dominio/tipos';

interface GraficoCategoriasProps {
  contagens: Record<Categoria, number>;
}

const ROTULOS: Record<Categoria, string> = {
  bug: 'Bug',
  funcionalidade: 'Funcionalidade',
  usabilidade: 'Usabilidade',
  outros: 'Outros',
};

const CORES: Record<Categoria, string> = {
  bug: 'bg-rose-500',
  funcionalidade: 'bg-indigo-500',
  usabilidade: 'bg-amber-500',
  outros: 'bg-slate-400',
};

export function GraficoCategorias({ contagens }: GraficoCategoriasProps) {
  const maiorContagem = Math.max(...CATEGORIAS.map((categoria) => contagens[categoria]));

  return (
    <section
      aria-labelledby="titulo-categorias"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-22px_rgba(15,23,42,0.3)] dark:border-slate-800 dark:bg-slate-900 sm:p-6"
    >
      <div className="mb-6">
        <h2
          id="titulo-categorias"
          className="font-semibold text-slate-900 dark:text-slate-100"
        >
          Feedbacks por categoria
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Distribuição dos temas identificados
        </p>
      </div>
      <ul className="space-y-5">
        {CATEGORIAS.map((categoria) => {
          const contagem = contagens[categoria];
          const largura =
            maiorContagem === 0 ? 0 : (contagem / maiorContagem) * 100;

          return (
            <li key={categoria}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {ROTULOS[categoria]}
                </span>
                <span className="tabular-nums text-slate-500 dark:text-slate-400">{contagem}</span>
              </div>
              <div
                aria-label={`${ROTULOS[categoria]}: ${contagem} ${contagem === 1 ? 'feedback' : 'feedbacks'}`}
                aria-valuemax={Math.max(maiorContagem, 1)}
                aria-valuemin={0}
                aria-valuenow={contagem}
                className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
                role="progressbar"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-500 ${CORES[categoria]}`}
                  style={{ width: `${largura}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
