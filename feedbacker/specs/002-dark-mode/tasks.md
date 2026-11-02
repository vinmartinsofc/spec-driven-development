# Tarefas: Modo escuro

**Entrada**: Documentos de desenho em `specs/002-dark-mode/`

**Pré-requisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md` e `contracts/`

**Organização**: Tarefas agrupadas por história de usuário para permitir implementação e
validação independentes.

## Fase 1: Preparação

**Objetivo**: Inicialização do projeto e estrutura básica.

Nenhuma tarefa necessária: React, Tailwind CSS, Lucide React, Vitest e a estrutura da SPA
já estão configurados.

---

## Fase 2: Fundamentos

**Objetivo**: Preparar o Tailwind para ativar as variantes de tema pela raiz da aplicação.

- [X] T001 Configurar a variante `dark` do Tailwind CSS 4 para responder a `[data-tema="escuro"]` em `src/estilos.css`

**Ponto de verificação**: As classes `dark:` podem ser usadas nos componentes e respondem ao
atributo definido no plano.

---

## Fase 3: História de Usuário 1 — Alternar o tema da interface (Prioridade: P1) — MVP

**Objetivo**: Permitir que a pessoa usuária alterne entre tema claro e escuro na entrada,
mantendo a escolha e os dados durante o fluxo de análise.

**Teste independente**: Na tela inicial, confirmar que o tema começa claro; alternar o
controle com teclado e verificar nome acessível e `aria-pressed`; gerar insights e confirmar
que carregamento e resultados mantêm o tema; voltar, desativar o tema e confirmar que os
dados e a análise não foram alterados pela alternância. Uma nova montagem deve começar no
tema claro.

### Testes da História de Usuário 1

- [X] T002 [US1] Criar testes de integração em `testes/integracao/temaEscuro.test.tsx` para tema inicial claro, alternância por teclado, `aria-pressed`, atributo global `data-tema`, persistência durante carregamento/resultados/retorno e preservação dos dados; executar os testes e confirmar falha antes da implementação

### Implementação da História de Usuário 1

- [X] T003 [P] [US1] Adicionar estado `temaEscuro` inicializado como `false` em `src/Aplicativo.tsx`, definir `data-tema="escuro"` ou `data-tema="claro"` na raiz e passar `temaEscuro` e `aoAlternarTema` para `TelaEntrada`, mantendo o estado durante as transições e ao voltar
- [X] T004 [P] [US1] Adicionar em `src/componentes/TelaEntrada.tsx` o botão visível “Modo escuro”, com `aria-pressed`, ícones Lucide decorativos e variantes `dark:` para fundo, texto, bordas, campo, cartão e foco; preservar texto e ação de gerar insights
- [X] T005 [P] [US1] Ajustar em `src/componentes/BarraLateral.tsx` as variantes `dark:` da navegação e das superfícies para manter contraste e integração visual nos dois temas
- [X] T006 [P] [US1] Adicionar variantes `dark:` para superfícies e textos do indicador de carregamento em `src/componentes/EstadoCarregamento.tsx`, sem alterar sua semântica ou duração
- [X] T007 [P] [US1] Adicionar variantes `dark:` aos títulos, textos, superfícies e botão “Voltar” do painel em `src/componentes/PainelResultados.tsx`, mantendo o fluxo e os dados da análise
- [X] T008 [P] [US1] Adicionar variantes `dark:` ao cartão e aos indicadores de cor das métricas em `src/componentes/CartaoMetrica.tsx`, preservando seus valores e rótulos
- [X] T009 [P] [US1] Adicionar variantes `dark:` ao cartão, aos textos e ao fundo das barras do gráfico em `src/componentes/GraficoCategorias.tsx`, preservando contagens e rótulos
- [X] T010 [P] [US1] Adicionar variantes `dark:` ao cabeçalho, linhas, textos e superfícies da tabela em `src/componentes/TabelaFeedbacks.tsx`, preservando todas as linhas e classificações

**Ponto de verificação**: A história funciona independentemente em entrada, carregamento e
resultados; a preferência não altera a análise e não persiste após recarregar.

---

## Fase 4: Acabamento e preocupações transversais

**Objetivo**: Validar o fluxo completo, a acessibilidade e a apresentação responsiva.

- [X] T011 Executar os cenários automatizados e manuais descritos em `specs/002-dark-mode/quickstart.md`, rodar `npm test -- --run` e `npm run build`, e corrigir falhas nos arquivos da funcionalidade

---

## Dependências e ordem de execução

### Dependências das fases

- **Preparação (Fase 1)**: sem tarefas; o projeto já está inicializado.
- **Fundamentos (Fase 2)**: concluir T001 antes das tarefas de interface para habilitar a
  variante de tema.
- **História de Usuário 1 (Fase 3)**: depende de T001. T002 deve ser escrito e executado
  antes da implementação; T003 e T004 conectam o estado e o controle.
- **Acabamento (Fase 4)**: depende de todas as tarefas da história.

### Dependências da história de usuário

- **História de Usuário 1 (P1)**: pode começar após T001; não depende de outra história.

### Oportunidades de paralelização

- Escrever e executar T002 primeiro; depois que os testes estiverem escritos e falhando,
  T003–T010 podem ser divididas por arquivo.
- T005–T010 são independentes entre si e podem ser implementadas em paralelo após T001 e
  T002.
- T003 e T004 também podem ser desenvolvidas em paralelo se mantiverem o contrato explícito
  `temaEscuro` e `aoAlternarTema`; integrar e validar ambas antes de T011.

## Exemplo de execução paralela: História de Usuário 1

```text
Primeiro: T002 — criar e executar os testes de integração até falharem.

Em paralelo após T002:
T003 — estado global e atributo de tema em src/Aplicativo.tsx
T004 — controle e estilos da entrada em src/componentes/TelaEntrada.tsx
T005 — estilos da barra lateral em src/componentes/BarraLateral.tsx
T006 — estilos do carregamento em src/componentes/EstadoCarregamento.tsx
T007 — estilos do painel em src/componentes/PainelResultados.tsx
T008 — estilos das métricas em src/componentes/CartaoMetrica.tsx
T009 — estilos do gráfico em src/componentes/GraficoCategorias.tsx
T010 — estilos da tabela em src/componentes/TabelaFeedbacks.tsx
```

## Estratégia de implementação

### MVP primeiro

1. Concluir T001 e T002.
2. Implementar T003 e T004 para entregar a alternância acessível na entrada.
3. Implementar T005–T010 para cobrir todas as superfícies do fluxo.
4. Executar T011 e validar a História de Usuário 1 independentemente.

O MVP é a única história P1: alternar o tema na entrada e preservá-lo durante o fluxo de
análise.

### Entrega incremental

1. Preparar a variante `dark` e escrever os testes que falham.
2. Conectar o estado global e o controle na tela inicial.
3. Aplicar os estilos por componente, sem modificar dados, classificações ou temporização.
4. Validar build, testes, teclado e viewport estreito pelo guia quickstart.
