import { ArrowRight, Lightbulb, Moon, Sparkles, Sun } from 'lucide-react';

interface TelaEntradaProps {
  texto: string;
  temaEscuro: boolean;
  aoAlterarTexto: (texto: string) => void;
  aoGerarInsights: () => void;
  aoAlternarTema: () => void;
}

export function TelaEntrada({
  texto,
  temaEscuro,
  aoAlterarTexto,
  aoGerarInsights,
  aoAlternarTema,
}: TelaEntradaProps) {
  const temFeedbackValido = texto.split(/\r\n|\n|\r/).some((linha) => linha.trim());

  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300">
            <Sparkles aria-hidden="true" size={14} />
            Insights para decisões melhores
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-[38px]">
            Dê voz aos seus usuários.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
            Transforme feedbacks em sinais claros para priorizar o que realmente
            importa no seu produto.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-pressed={temaEscuro}
            onClick={aoAlternarTema}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {temaEscuro ? (
              <Sun aria-hidden="true" size={16} />
            ) : (
              <Moon aria-hidden="true" size={16} />
            )}
            Modo escuro
          </button>
          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 sm:flex">
            <span className="size-2 rounded-full bg-emerald-500" />
            Análise demonstrativa
          </div>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_-28px_rgba(15,23,42,0.28)] dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-400/10 dark:text-amber-300">
              <Lightbulb aria-hidden="true" size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Comece pelos feedbacks
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Cole um comentário por linha. Você pode editar os exemplos.
              </p>
            </div>
          </div>
          <span className="w-fit rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Um feedback por linha
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <label
            htmlFor="campo-feedbacks"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Feedbacks dos usuários
          </label>
          <textarea
            id="campo-feedbacks"
            aria-label="Feedbacks dos usuários"
            value={texto}
            onChange={(evento) => aoAlterarTexto(evento.target.value)}
            placeholder="Ex.: O aplicativo está lento ao carregar meus projetos."
            rows={8}
            spellCheck
            className="min-h-52 w-full resize-y rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 text-sm leading-7 text-slate-700 transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500 dark:hover:border-slate-600 dark:focus:border-indigo-400 dark:focus:bg-slate-950 dark:focus:ring-indigo-400/20"
          />
          <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
            <span>Seus dados ficam apenas nesta demonstração.</span>
            <span>{texto.split(/\r\n|\n|\r/).filter((linha) => linha.trim()).length} linhas</span>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-slate-400 dark:text-slate-500">
              A classificação é simulada e baseada em palavras-chave.
            </p>
            <button
              type="button"
              onClick={aoGerarInsights}
              disabled={!temFeedbackValido}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:shadow-indigo-950/40 dark:disabled:bg-slate-700"
            >
              <Sparkles aria-hidden="true" size={17} />
              Gerar insights
              <ArrowRight aria-hidden="true" size={16} />
            </button>
          </div>
        </div>
      </section>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3.5 text-xs leading-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-400">
        <Lightbulb
          aria-hidden="true"
          className="mt-0.5 shrink-0 text-amber-500"
          size={16}
        />
        <p>
          Dica: feedbacks específicos ajudam a enxergar melhor problemas,
          pedidos de funcionalidade e pontos de usabilidade.
        </p>
      </div>
    </div>
  );
}
