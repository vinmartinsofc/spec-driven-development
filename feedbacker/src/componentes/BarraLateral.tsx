import {
  ChartNoAxesCombined,
  CircleHelp,
  LayoutDashboard,
  MessageSquareText,
  Settings,
} from 'lucide-react';

const ITENS_NAVEGACAO = [
  { rotulo: 'Visão geral', icone: LayoutDashboard, ativo: true },
  { rotulo: 'Feedbacks', icone: MessageSquareText, ativo: false },
  { rotulo: 'Insights', icone: ChartNoAxesCombined, ativo: false },
];

export function BarraLateral() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-slate-800 bg-slate-950 text-slate-300 dark:border-slate-700 dark:bg-slate-900 md:sticky md:top-0 md:h-screen md:w-64 md:border-r md:border-b-0">
      <div className="flex items-center gap-3 px-5 py-5 md:px-6 md:py-7">
        <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-950/30">
          <MessageSquareText aria-hidden="true" size={20} strokeWidth={2.2} />
        </div>
        <div>
          <p className="text-[17px] font-semibold tracking-tight text-white">
            Feedbacker
          </p>
          <p className="text-xs text-slate-400">Insights do produto</p>
        </div>
      </div>

      <div className="hidden px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 md:block">
        Espaço de trabalho
      </div>
      <nav
        aria-label="Navegação principal"
        className="flex items-center gap-1 overflow-x-auto px-3 pb-3 md:flex-1 md:flex-col md:items-stretch md:px-3"
      >
        {ITENS_NAVEGACAO.map(({ rotulo, icone: Icone, ativo }) => (
          <div
            key={rotulo}
            aria-current={ativo ? 'page' : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              ativo
                ? 'bg-slate-800 font-medium text-white shadow-sm dark:bg-slate-700'
                : 'text-slate-400'
            }`}
          >
            <Icone aria-hidden="true" size={18} strokeWidth={1.8} />
            <span>{rotulo}</span>
          </div>
        ))}
      </nav>

      <div className="hidden border-t border-slate-800 p-3 dark:border-slate-700 md:block">
        <div className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400">
          <CircleHelp aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>Central de ajuda</span>
        </div>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400">
          <Settings aria-hidden="true" size={18} strokeWidth={1.8} />
          <span>Configurações</span>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-900 p-3 dark:bg-slate-950">
          <div className="flex size-9 items-center justify-center rounded-full bg-indigo-400/15 text-xs font-semibold text-indigo-200">
            PM
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-200">
              Espaço do produto
            </p>
            <p className="text-[11px] text-slate-500">Plano de demonstração</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
