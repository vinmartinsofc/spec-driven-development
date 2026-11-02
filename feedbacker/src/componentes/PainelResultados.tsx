import {
  ArrowLeft,
  ClipboardList,
  Minus,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import type { Analise } from '../dominio/tipos';
import { CartaoMetrica } from './CartaoMetrica';
import { GraficoCategorias } from './GraficoCategorias';
import { TabelaFeedbacks } from './TabelaFeedbacks';

interface PainelResultadosProps {
  analise: Analise;
  aoVoltar: () => void;
}

export function PainelResultados({
  analise,
  aoVoltar,
}: PainelResultadosProps) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.12em] text-indigo-600 dark:text-indigo-300">
            Resumo da análise
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Seus insights
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Veja os principais sinais presentes nos feedbacks.
          </p>
        </div>
        <button
          type="button"
          onClick={aoVoltar}
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 sm:self-center"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Voltar
        </button>
      </header>

      <section
        aria-label="Métricas de sentimento"
        className="mb-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-4"
      >
        <CartaoMetrica
          cor="indigo"
          descricao="Comentários incluídos nesta análise"
          icone={<ClipboardList aria-hidden="true" size={19} />}
          rotulo="Total de feedbacks"
          valor={analise.total}
        />
        <CartaoMetrica
          cor="emerald"
          descricao="Sinais de satisfação identificados"
          icone={<ThumbsUp aria-hidden="true" size={19} />}
          rotulo="Positivos"
          valor={analise.contagensSentimento.positivo}
        />
        <CartaoMetrica
          cor="amber"
          descricao="Comentários sem sentimento explícito"
          icone={<Minus aria-hidden="true" size={19} />}
          rotulo="Neutros"
          valor={analise.contagensSentimento.neutro}
        />
        <CartaoMetrica
          cor="rose"
          descricao="Problemas ou frustrações sinalizados"
          icone={<ThumbsDown aria-hidden="true" size={19} />}
          rotulo="Negativos"
          valor={analise.contagensSentimento.negativo}
        />
      </section>

      <div className="mb-6">
        <GraficoCategorias contagens={analise.contagensCategoria} />
      </div>

      <TabelaFeedbacks feedbacks={analise.feedbacks} />

      <p       className="mt-4 text-center text-xs leading-5 text-slate-400 dark:text-slate-500">
        Classificação demonstrativa baseada em palavras-chave; valide os sinais
        com o contexto dos seus usuários.
      </p>
    </div>
  );
}
