# Plano de Implementação: Insights de feedback

**Ramo planejado**: `001-feedback-insights` | **Data**: 2026-11-01 | **Especificação**: [spec.md](./spec.md)

**Entrada**: Especificação da funcionalidade em `specs/001-feedback-insights/spec.md`

## Resumo

Construir uma aplicação de página única para PMs que recebe feedbacks em texto, classifica
cada linha localmente com regras determinísticas e apresenta métricas, categorias e os
textos originais. A arquitetura separa componentes de interface e funções puras de domínio
sob `src/`. O fluxo tem duas telas principais — entrada e resultados — e um estado
transitório de carregamento de 2.000 ms entre elas; não há rotas, backend nem IA real.

## Contexto Técnico

**Linguagem/Versão**: TypeScript com React; versões serão selecionadas ao configurar o
projeto, pois ainda não há manifesto de dependências.

**Dependências Principais**: React, Tailwind CSS, CSS e Lucide React são obrigatórios pela
constituição. Vite é proposto para desenvolvimento e build; Vitest e React Testing Library
são propostos para testes automatizados. Nenhuma dependência está instalada ou configurada
no repositório atual.

**Armazenamento**: Estado exclusivamente em memória no navegador; sem persistência local,
backend ou envio de dados a serviços externos.

**Testes**: Vitest para testes unitários de domínio e testes de componentes; React Testing
Library para fluxos da interface. Usar temporizadores controlados para verificar a transição
em 2.000 ms.

**Plataforma Alvo**: Navegadores modernos em computador e telas menores, sem instalação ou
conta.

**Tipo de Projeto**: Aplicação web de página única, exclusivamente front-end.

**Metas de Desempenho**: Apresentar resultados após o intervalo de carregamento de 2.000 ms
definido pelo produto; classificar todas as linhas não vazias sem chamadas de rede. Preservar
uma linha de tabela para cada linha não vazia da entrada.

**Restrições**: Sem rotas, backend, persistência, IA real ou biblioteca de gráficos. Barras
do gráfico devem ser construídas com elementos HTML e utilitários Tailwind. Toda interface,
documentação, comentários e logs autorais devem estar em português brasileiro; nomes
oficiais de tecnologias, APIs e sintaxe seguem sua forma técnica.

**Escopo**: Uma barra lateral ilustrativa e dois destinos principais (entrada e resultados),
um estado transitório de carregamento, quatro categorias, três sentimentos e uma tabela que
preserva ordem, conteúdo e duplicatas das linhas válidas.

## Verificação da Constituição

*Portão: verificar antes da pesquisa e novamente após o desenho.*

| Princípio | Verificação do plano |
|---|---|
| Foco em Product Managers | O fluxo e os resultados tratam da triagem demonstrativa de feedbacks por PMs. |
| Stack obrigatória | React, Tailwind CSS, CSS e Lucide React são mantidos; nenhuma biblioteca de gráficos é introduzida. |
| Português brasileiro | Diretórios, componentes, documentação e conteúdo autoral são nomeados em português; termos técnicos oficiais permanecem inalterados. |
| Protótipo enxuto | Estado local, regras locais e ausência de backend, persistência e rotas mantêm a solução pequena. |
| Qualidade verificável | Testes de domínio, temporização, fluxo de interface, acessibilidade por teclado e tamanhos de tela cobrem os requisitos. |

**Resultado inicial**: Aprovado. Nenhuma exceção constitucional é necessária.

## Estrutura do Projeto

### Documentação da Funcionalidade

```text
specs/001-feedback-insights/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── interface-usuario.md
└── tasks.md
```

### Código-fonte

```text
src/
├── main.tsx
├── Aplicativo.tsx
├── estilos.css
├── componentes/
│   ├── BarraLateral.tsx
│   ├── TelaEntrada.tsx
│   ├── EstadoCarregamento.tsx
│   ├── PainelResultados.tsx
│   ├── CartaoMetrica.tsx
│   ├── GraficoCategorias.tsx
│   └── TabelaFeedbacks.tsx
├── dominio/
│   ├── tipos.ts
│   ├── analisarFeedbacks.ts
│   └── classificarFeedback.ts
└── dados/
    └── exemplosFeedback.ts

testes/
├── unitarios/
│   ├── analisarFeedbacks.test.ts
│   └── classificarFeedback.test.ts
└── integracao/
    └── fluxoFeedback.test.tsx
```

**Decisão de estrutura**: Aplicação React de projeto único. `Aplicativo.tsx` é o dono do
estado do fluxo e compõe a barra lateral com a tela ativa. `componentes/` contém componentes
de apresentação; `dominio/` contém tipos e transformações puras sem dependência de React;
`dados/` contém os exemplos iniciais. Os testes ficam fora de `src/`, agrupados por escopo.
`main.tsx` é o ponto de entrada convencional da ferramenta de build.

## Arquitetura e Fluxo de Estado

`Aplicativo.tsx` controla um estado discriminado de três valores: `entrada`, `carregando` e
`resultados`. Entrada e resultados são as duas telas navegáveis. `carregando` é transitório,
sem rota ou controle de navegação separado, e renderiza `EstadoCarregamento`.

O texto editável e a análise atual também pertencem ao estado local do componente raiz.
“Gerar insights” fica desabilitado quando não há linha não vazia. No clique válido, a
aplicação captura o texto atual, muda para `carregando` e inicia um único temporizador de
2.000 ms no próprio manipulador da ação. Ao terminar o intervalo, divide o texto capturado
em linhas, ignora linhas vazias, classifica cada linha uma vez, guarda a lista resultante e
muda para `resultados`. Uma referência local mantém o identificador do temporizador; a
limpeza do componente o cancela para impedir transições após desmontagem. Não iniciar outro
temporizador por renderização.

Ao retornar, a aplicação cancela qualquer temporizador pendente, descarta a análise,
restaura os três exemplos e muda para `entrada`. Cartões e barras derivam suas contagens da
lista classificada, evitando manter contagens duplicadas no estado. A classificação e o
resumo são funções determinísticas em `dominio/`; o dashboard recebe os dados já calculados.

`GraficoCategorias` recebe as quatro categorias sempre, inclusive as de contagem zero, e
calcula a largura relativa a partir da maior contagem (com tratamento para total zero).
Cada barra é uma composição de elementos HTML estilizados com Tailwind; não se adiciona uma
biblioteca de gráficos.

## Decisões de Arquitetura

- **Ferramentas de build**: Vite com React e TypeScript, recomendado para iniciar a aplicação
  sem introduzir um framework de rotas ou backend.
- **Estilização e ícones**: Tailwind CSS e CSS para estilos; Lucide React para ícones,
  incluindo o indicador animado de carregamento.
- **Classificação**: funções puras no navegador; normalizar caixa e acentos, depois aplicar
  palavras-chave e prioridades documentadas em [data-model.md](./data-model.md).
- **Estado**: `useState` e `useEffect` no componente raiz; sem gerenciador global para um
  fluxo restrito a uma única página.
- **Validação**: testes unitários para entrada/classificação/contagens, testes de interface
  com temporizadores controlados e verificação manual da apresentação responsiva e teclado.

## Portão Constitucional após o Desenho

| Princípio | Resultado após o desenho |
|---|---|
| Foco em Product Managers | Mantido: as telas servem à triagem e leitura dos feedbacks por PMs. |
| Stack obrigatória | Mantida: React, Tailwind CSS, CSS e Lucide React; Vite/Vitest complementam sem substituí-las. |
| Português brasileiro | Mantido em código autoral, documentação e interface; `main.tsx`, nomes de APIs e bibliotecas são convenções técnicas oficiais. |
| Protótipo enxuto | Mantido: um único fluxo, estado local e processamento simulado sem serviços externos. |
| Qualidade verificável | Mantido: regras puras e transições terão cobertura automatizada e verificação de acessibilidade/responsividade. |

**Resultado final**: Aprovado. Não há violações nem itens pendentes de esclarecimento.

## Rastreamento de Complexidade

Nenhuma exceção aos princípios da constituição ou camada arquitetural adicional foi
introduzida. O diretório `dominio/` mantém a lógica de classificação testável sem acrescentar
backend, persistência ou abstração de estado global.
