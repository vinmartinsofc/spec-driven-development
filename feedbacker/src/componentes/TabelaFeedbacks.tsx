import type { Feedback } from '../dominio/tipos';

interface TabelaFeedbacksProps {
  feedbacks: Feedback[];
}

const CORES_SENTIMENTO = {
  positivo:
    'bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20',
  neutro:
    'bg-slate-100 text-slate-600 ring-slate-500/10 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-400/20',
  negativo:
    'bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20',
};

const ROTULOS_SENTIMENTO = {
  positivo: 'Positivo',
  neutro: 'Neutro',
  negativo: 'Negativo',
};

const ROTULOS_CATEGORIA = {
  bug: 'Bug',
  funcionalidade: 'Funcionalidade',
  usabilidade: 'Usabilidade',
  outros: 'Outros',
};

export function TabelaFeedbacks({ feedbacks }: TabelaFeedbacksProps) {
  return (
    <section
      aria-labelledby="titulo-tabela"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_-22px_rgba(15,23,42,0.3)] dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <h2 id="titulo-tabela" className="font-semibold text-slate-900 dark:text-slate-100">
            Feedbacks analisados
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Confira a classificação de cada comentário.
          </p>
        </div>
        <span className="mt-2 text-xs text-slate-400 dark:text-slate-500 sm:mt-0">
          {feedbacks.length} {feedbacks.length === 1 ? 'feedback' : 'feedbacks'}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500 dark:bg-slate-800/80 dark:text-slate-400">
            <tr>
              <th className="px-5 py-3.5 sm:px-6" scope="col">
                Texto
              </th>
              <th className="w-36 px-4 py-3.5" scope="col">
                Sentimento
              </th>
              <th className="w-44 px-5 py-3.5 sm:px-6" scope="col">
                Categoria
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {feedbacks.map((feedback) => (
              <tr
                key={`${feedback.ordem}-${feedback.texto}`}
                className="align-top transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
              >
                <td className="max-w-2xl whitespace-normal break-words px-5 py-4 leading-6 text-slate-700 dark:text-slate-300 sm:px-6">
                  {feedback.texto}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${CORES_SENTIMENTO[feedback.sentimento]}`}
                  >
                    {ROTULOS_SENTIMENTO[feedback.sentimento]}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-400 sm:px-6">
                  {ROTULOS_CATEGORIA[feedback.categoria]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
