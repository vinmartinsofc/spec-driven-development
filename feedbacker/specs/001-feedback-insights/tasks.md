# Tarefas: Insights de feedback

**Entrada**: Documentos de desenho em `/specs/001-feedback-insights/`

**Pré-requisitos**: `plan.md` e `spec.md`; consultar também `research.md`, `data-model.md`,
`contracts/interface-usuario.md` e `quickstart.md`.

**Testes**: Incluídos porque a constituição exige testes automatizados para mudanças de
comportamento.

**Organização**: Tarefas agrupadas por história de usuário para permitir implementação e
validação incremental.

## Formato das tarefas

Cada tarefa usa checkbox, identificador sequencial, marcador `[P]` apenas quando pode ser
executada em paralelo, história quando pertence a uma fase de história e caminho(s) exato(s)
dos arquivos envolvidos.

## Fase 1: Preparação do projeto

**Objetivo**: Inicializar a aplicação React com a stack aprovada.

- [x] T001 Criar `package.json` com scripts de desenvolvimento, build e teste e dependências React, Vite, TypeScript, Tailwind CSS, Lucide React, Vitest e React Testing Library.
- [x] T002 Configurar `vite.config.ts`, `tsconfig.json` e `index.html` para compilar a SPA TypeScript a partir de `src/main.tsx`.
- [x] T003 Criar `src/main.tsx` como ponto de entrada e `src/estilos.css` como entrada de CSS/Tailwind, importada pela aplicação.

---

## Fase 2: Fundação compartilhada

**Objetivo**: Definir os tipos de domínio usados pelas telas, regras e agregações.

- [x] T004 Definir `src/dominio/tipos.ts` com os tipos Sentimento, Categoria, EstadoFluxo, Feedback e Analise, incluindo texto, ordem, sentimento e categoria para cada feedback.

**Ponto de controle**: A inicialização da aplicação e os tipos compartilhados estão prontos
antes de iniciar as histórias.

---

## Fase 3: História de Usuário 1 — Preparar e analisar feedbacks (Prioridade: P1)

**Objetivo**: Permitir colar ou editar feedbacks, iniciar uma análise local e ver a tela de
resultados após o carregamento.

**Teste independente**: Abrir a tela inicial, editar o campo, confirmar que a entrada vazia
desabilita “Gerar insights”, iniciar com linhas válidas e observar o carregamento até a tela
de resultados aparecer após 2.000 ms.

### Implementação

- [x] T005 [P] [US1] Criar `src/dados/exemplosFeedback.ts` com os três exemplos editáveis da especificação, um por linha: bug de travamento, solicitação de exportação em PDF e dificuldade para encontrar o botão Salvar.
- [x] T006 [P] [US1] Criar `src/componentes/BarraLateral.tsx` com o título “Feedbacker”, navegação meramente ilustrativa e ícones Lucide, usando tons Slate/Zinc do Tailwind.
- [x] T007 [P] [US1] Criar `src/componentes/TelaEntrada.tsx` com campo de texto amplo editável, ação “Gerar insights” e botão desabilitado quando todas as linhas forem vazias ou contiverem apenas espaços.
- [x] T008 [P] [US1] Criar `src/componentes/EstadoCarregamento.tsx` com ícone Lucide giratório, animação e texto acessível em português brasileiro.
- [x] T009 [US1] Implementar `src/dominio/classificarFeedback.ts` com as palavras-chave, normalização de maiúsculas/minúsculas e acentos, classificação de sentimento e prioridade de categorias definidas em `data-model.md`.
- [x] T010 [US1] Implementar `src/dominio/analisarFeedbacks.ts` para dividir entradas LF/CRLF, remover apenas espaços das extremidades, ignorar linhas vazias, preservar ordem e duplicatas, classificar cada linha uma vez e derivar as contagens.
- [x] T011 [US1] Criar `testes/unitarios/classificarFeedback.test.ts` e `testes/unitarios/analisarFeedbacks.test.ts` para verificar palavras-chave, acentos, prioridades, linhas vazias, repetidas e invariantes das contagens.
- [x] T012 [US1] Implementar `src/Aplicativo.tsx` com estado local `entrada`/`carregando`/`resultados`, exemplos iniciais, barra lateral e integração do campo; no clique válido, capturar a entrada e iniciar um único temporizador de 2.000 ms, cancelá-lo na limpeza e exibir uma tela de resultados mínima com os dados analisados.
- [x] T013 [US1] Criar `testes/integracao/fluxoFeedback.test.tsx` para verificar os exemplos iniciais, botão desabilitado para entrada vazia, ação de análise, estado de carregamento e transição controlada aos 2.000 ms.

**Ponto de controle**: É possível começar com os exemplos, editar a entrada e chegar a
resultados mínimos por meio do fluxo de duas telas e do carregamento transitório.

---

## Fase 4: História de Usuário 2 — Examinar métricas e classificações (Prioridade: P1)

**Objetivo**: Exibir a análise completa em cartões de métricas, barras por categoria e tabela.

**Teste independente**: Renderizar o painel com uma lista conhecida de feedbacks e verificar
as classificações, métricas e contagens, incluindo categorias sem ocorrências. Os exemplos
iniciais ilustram bug de travamento, solicitação de exportação em PDF e ajuste de usabilidade
do botão Salvar.

### Implementação

- [x] T014 [P] [US2] Criar `src/componentes/CartaoMetrica.tsx` para apresentar rótulo e contagem de uma métrica, com texto em português e estados legíveis sem depender apenas de cor.
- [x] T015 [P] [US2] Criar `src/componentes/GraficoCategorias.tsx` com barras horizontais feitas de elementos HTML e classes Tailwind, exibindo sempre bug, funcionalidade, usabilidade e outros, inclusive contagens zero, sem biblioteca de gráficos.
- [x] T016 [P] [US2] Criar `src/componentes/TabelaFeedbacks.tsx` com colunas Texto, Sentimento e Categoria, preservando a ordem, o conteúdo e todas as linhas não vazias, inclusive duplicatas.
- [x] T017 [US2] Criar `src/componentes/PainelResultados.tsx` compondo cartões para total e os três sentimentos, gráfico e tabela a partir da mesma lista de feedbacks analisados; não codificar os resultados como uma tabela fixa de três linhas.
- [x] T018 [US2] Substituir a tela de resultados mínima em `src/Aplicativo.tsx` pelo `PainelResultados`, passando a análise produzida pela entrada atual.
- [x] T019 [US2] Adicionar a `testes/integracao/fluxoFeedback.test.tsx` verificações dos três exemplos iniciais classificados como bug/negativo, funcionalidade/neutro e usabilidade/neutro, somas das métricas, quatro categorias e correspondência de 100% entre linhas válidas e linhas da tabela.

**Ponto de controle**: Os resultados são derivados da entrada analisada; os três exemplos
iniciais são dados de demonstração, não conteúdo fixo do dashboard.

---

## Fase 5: História de Usuário 3 — Reiniciar a demonstração (Prioridade: P2)

**Objetivo**: Descartar a análise e voltar à entrada padrão para uma nova demonstração.

**Teste independente**: Alterar os exemplos, gerar resultados e acionar “Voltar”; confirmar
que a tela de entrada reaparece com os três exemplos padrão e que a análise anterior não é
reutilizada.

### Implementação

- [x] T020 [US3] Implementar em `src/Aplicativo.tsx` a ação “Voltar” que cancela temporizadores pendentes, descarta a análise e restaura os exemplos de `src/dados/exemplosFeedback.ts`.
- [x] T021 [US3] Adicionar a `testes/integracao/fluxoFeedback.test.tsx` um cenário que edita os exemplos, navega aos resultados, seleciona “Voltar” e confirma o reset completo.

**Ponto de controle**: Uma nova demonstração começa sem resultados ou texto editado da sessão
anterior.

---

## Fase 6: Acabamento e validação transversal

**Objetivo**: Validar acessibilidade, responsividade, build e os fluxos completos.

- [x] T022 Revisar `src/Aplicativo.tsx`, `src/componentes/BarraLateral.tsx`, `src/componentes/TelaEntrada.tsx`, `src/componentes/EstadoCarregamento.tsx` e `src/componentes/PainelResultados.tsx` para uso por teclado, nomes acessíveis em português e apresentação em telas pequenas.
- [x] T023 Executar os cenários de `specs/001-feedback-insights/quickstart.md`, ajustar os arquivos de `src/`, `testes/` e `package.json` quando necessário e confirmar build sem erros.

---

## Dependências e ordem de execução

### Dependências das fases

- Preparação (Fase 1) não depende de outras fases.
- Fundação (Fase 2) depende da preparação e bloqueia as histórias.
- US1 depende da Fundação.
- US2 depende da Fundação; componentes independentes podem ser construídos em paralelo com US1. A integração do painel (T018) depende também da tela e do fluxo implementados em US1.
- US3 depende de US1 e US2, pois o reset retorna do dashboard à entrada.
- Acabamento depende das histórias que serão entregues.

### Dependências dentro das histórias

- T005–T008 podem ser paralelas após T004, pois criam arquivos distintos.
- T009 precede T010; T011 valida as funções de domínio.
- T012 depende de T005–T010; T013 valida o fluxo implementado em T012.
- T014–T016 podem ser paralelas após T004; T017 depende dos três componentes e T018 depende de T017 e T012.
- T019 valida o painel integrado; T020 depende de T018 e T021 verifica o reset.

### Oportunidades de paralelismo

- **Preparação**: T001 primeiro; em seguida T002 e T003 na ordem definida por suas configurações.
- **US1**: após T004, paralelizar T005, T006, T007 e T008; desenvolver T009/T010 em paralelo à interface e integrar em T012.
- **US2**: paralelizar T014, T015 e T016; integrar no painel em T017.
- **US3 e acabamento**: T020/T021 são sequenciais; concluir T022 antes da validação final T023.

## Estratégia de implementação

### MVP

1. Concluir preparação e tipos compartilhados (T001–T004).
2. Entregar a História 1 (T005–T013): layout de entrada, exemplos editáveis, regras locais,
   carregamento de 2.000 ms e chegada a resultados mínimos.
3. Validar o fluxo da História 1 de forma independente.

### Entrega incremental

1. Concluir US1 e verificar o fluxo de entrada.
2. Adicionar US2 com cartões, gráfico dinâmico e tabela completa; validar cada linha e todas
   as contagens.
3. Adicionar US3 para resetar a demonstração.
4. Executar acessibilidade, responsividade, testes e build na fase de acabamento.

## Observações

- `[P]` indica tarefas em arquivos distintos sem dependência de tarefas incompletas.
- `[US1]`, `[US2]` e `[US3]` correspondem às histórias da especificação.
- Exemplos de demonstração são frases ilustrativas especificadas no requisito RF-003; não
  representam feedbacks reais coletados de usuários.
- O dashboard deve apresentar todas as linhas fornecidas, não uma lista rigidamente
  codificada de três feedbacks.
