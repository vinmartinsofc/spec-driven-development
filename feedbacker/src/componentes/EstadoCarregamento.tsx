import { LoaderCircle, Sparkles } from 'lucide-react';

export function EstadoCarregamento() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[65vh] flex-col items-center justify-center text-center"
      role="status"
    >
      <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
        <LoaderCircle
          aria-hidden="true"
          className="animate-spin"
          size={42}
          strokeWidth={1.8}
        />
        <Sparkles
          aria-hidden="true"
          className="absolute -right-2 -top-2 rounded-full bg-white p-1 text-amber-500 shadow-sm dark:bg-slate-800 dark:text-amber-300"
          size={25}
        />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Analisando seus feedbacks
      </h1>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
        Estamos organizando os sinais para você. Isso leva só um instante.
      </p>
    </section>
  );
}
