import { useEffect, useRef, useState } from 'react';
import { BarraLateral } from './componentes/BarraLateral';
import { EstadoCarregamento } from './componentes/EstadoCarregamento';
import { PainelResultados } from './componentes/PainelResultados';
import { TelaEntrada } from './componentes/TelaEntrada';
import { analisarFeedbacks } from './dominio/analisarFeedbacks';
import type { Analise, EstadoFluxo } from './dominio/tipos';
import { EXEMPLOS_FEEDBACK } from './dados/exemplosFeedback';

export default function Aplicativo() {
  const [tela, definirTela] = useState<EstadoFluxo>('entrada');
  const [texto, definirTexto] = useState(EXEMPLOS_FEEDBACK);
  const [analise, definirAnalise] = useState<Analise | null>(null);
  const [temaEscuro, definirTemaEscuro] = useState(false);
  const temporizadorRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (temporizadorRef.current !== null) {
        window.clearTimeout(temporizadorRef.current);
      }
    },
    [],
  );

  function iniciarAnalise() {
    if (!texto.split(/\r\n|\n|\r/).some((linha) => linha.trim())) {
      return;
    }

    if (temporizadorRef.current !== null) {
      window.clearTimeout(temporizadorRef.current);
    }

    const textoCapturado = texto;
    definirTela('carregando');
    temporizadorRef.current = window.setTimeout(() => {
      temporizadorRef.current = null;
      definirAnalise(analisarFeedbacks(textoCapturado));
      definirTela('resultados');
    }, 2000);
  }

  function voltarParaEntrada() {
    if (temporizadorRef.current !== null) {
      window.clearTimeout(temporizadorRef.current);
      temporizadorRef.current = null;
    }

    definirAnalise(null);
    definirTexto(EXEMPLOS_FEEDBACK);
    definirTela('entrada');
  }

  return (
    <div
      data-tema={temaEscuro ? 'escuro' : 'claro'}
      className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:flex"
    >
      <BarraLateral />
      <main className="min-w-0 flex-1 px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
        {tela === 'entrada' && (
          <TelaEntrada
            aoAlterarTexto={definirTexto}
            aoGerarInsights={iniciarAnalise}
            aoAlternarTema={() => definirTemaEscuro((atual) => !atual)}
            temaEscuro={temaEscuro}
            texto={texto}
          />
        )}
        {tela === 'carregando' && <EstadoCarregamento />}
        {tela === 'resultados' && analise !== null && (
          <PainelResultados
            analise={analise}
            aoVoltar={voltarParaEntrada}
          />
        )}
      </main>
    </div>
  );
}
