import type { ReactNode } from 'react';

interface CartaoMetricaProps {
  rotulo: string;
  valor: number;
  icone: ReactNode;
  cor: 'indigo' | 'emerald' | 'amber' | 'rose';
  descricao: string;
}

const CORES = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300',
};

export function CartaoMetrica({
  rotulo,
  valor,
  icone,
  cor,
  descricao,
}: CartaoMetricaProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_-22px_rgba(15,23,42,0.3)] dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{rotulo}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {valor}
          </p>
        </div>
        <div
          className={`flex size-10 items-center justify-center rounded-xl ${CORES[cor]}`}
        >
          {icone}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{descricao}</p>
    </article>
  );
}
