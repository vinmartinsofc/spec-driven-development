# Plano de Implementação: Modo escuro

**Ramo planejado**: `002-dark-mode` | **Data**: 2026-11-01 | **Especificação**: [spec.md](./spec.md)

**Entrada**: Especificação em `specs/002-dark-mode/spec.md`

## Resumo

Adicionar à tela inicial um controle acessível que alterna entre tema claro e escuro.
O estado do tema fica no componente raiz React, começa sempre claro e permanece ativo
durante as transições para carregamento e resultados. Tailwind aplica variantes de tema a
todas as superfícies relevantes; a alteração visual não modifica texto, classificação ou
análise. Nenhuma preferência será gravada entre recargas.

## Contexto Técnico

**Linguagem/Versão**: TypeScript e React 19, conforme a aplicação existente.

**Dependências Principais**: Tailwind CSS 4.1 com plugin Vite já configurado; Lucide React
já fornece ícones de sol/lua. Não adicionar dependências.

**Armazenamento**: Estado local React em memória durante a sessão. Sem `localStorage`,
cookies ou persistência.

**Testes**: Vitest 5, React Testing Library e `@testing-library/user-event`, já configurados.
Adicionar cobertura para controle, preservação do fluxo, aparência nas três telas e teclado.

**Plataforma Alvo**: Mesmos navegadores desktop e móveis já atendidos pela aplicação SPA.

**Tipo de Projeto**: Aplicação web de página única.

**Metas de Desempenho**: Aplicar a mudança visual na mesma interação, sem recarga ou
alteração de URL; preservar a temporização atual do carregamento.

**Restrições**: Modo claro por padrão em toda inicialização; estado do tema não persiste e
não altera dados; controle disponível na tela inicial; tema se mantém nas telas transitórias
e de resultados; conteúdo autoral em português brasileiro; manter React, Tailwind, CSS e
Lucide React sem novas dependências.

**Escopo**: Controle de tema, aplicação visual global em sidebar, entrada, carregamento,
cartões de métricas, gráfico e tabela, mais testes de comportamento e acessibilidade.

## Verificação da Constituição

*Portão: verificar antes da pesquisa e novamente após o desenho.*

| Princípio | Verificação |
|---|---|
| Foco em Product Managers | A personalização melhora a leitura dos feedbacks e métricas durante a demonstração para PMs. |
| Stack obrigatória | A implementação usa React, Tailwind CSS, CSS e ícones Lucide React já instalados. |
| Português brasileiro | O rótulo, a descrição acessível, os testes e a documentação serão escritos em português brasileiro. |
| Protótipo enxuto | Um booleano local e variantes de tema existentes evitam bibliotecas, persistência ou configuração extra. |
| Qualidade verificável | Testes cobrem alternância, teclado, preservação da análise e consistência nas telas. |

**Resultado inicial**: Aprovado. Nenhuma exceção constitucional é necessária.

## Estrutura do Projeto

### Documentação da Funcionalidade

```text
specs/002-dark-mode/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── interface-usuario.md
└── tasks.md
```

### Código-fonte e Testes

```text
src/
├── Aplicativo.tsx
├── estilos.css
└── componentes/
    ├── BarraLateral.tsx
    ├── TelaEntrada.tsx
    ├── EstadoCarregamento.tsx
    ├── PainelResultados.tsx
    ├── CartaoMetrica.tsx
    ├── GraficoCategorias.tsx
    └── TabelaFeedbacks.tsx

testes/
└── integracao/
    └── temaEscuro.test.tsx
```

**Decisão de estrutura**: Manter o estado do tema e o atributo de tema em `Aplicativo.tsx`,
que já controla a sessão SPA. O seletor fica em `TelaEntrada.tsx`. `estilos.css` configura a
variante `dark` do Tailwind para responder ao atributo no contêiner raiz. Componentes
existentes recebem estilos escuros por meio de variantes Tailwind; o teste de integração
valida que o atributo global cobre cada estado de tela. Não criar um provider ou componente
de tema separado para uma preferência booleana.

## Decisões de Arquitetura

- **Ativação de tema**: Estado booleano local, inicializado como falso, no componente raiz.
  O seletor da entrada recebe o valor e a ação para alterná-lo.
- **Propagação**: O contêiner raiz expõe o valor atual por atributo `data-tema`. A variante
  `dark` do Tailwind CSS 4 é configurada em `estilos.css` para corresponder a
  `[data-tema="escuro"]` e seus descendentes.
- **Cobertura visual**: Revisar fundos, bordas, textos, campos, botões, sidebar, indicador de
  carregamento, cartões, barras e tabela; estados de foco e rótulos continuam legíveis nos
  dois temas.
- **Controle acessível**: Botão de alternância com rótulo visível “Modo escuro”, ícone Sol/Lua
  decorativo e `aria-pressed` ligado ao estado. Clique, Enter e Espaço usam o comportamento
  nativo de botão.
- **Ciclo de vida**: A navegação para carregamento/resultados não reinicializa o tema.
  “Voltar” também preserva o tema; recarregar a página volta ao tema claro.
- **Dados**: Nenhuma análise é recalculada ao alternar; somente os estilos e o estado visual
  mudam.

## Portão Constitucional após o Desenho

| Princípio | Resultado após o desenho |
|---|---|
| Foco em Product Managers | Mantido: o usuário ajusta a leitura da interface de feedbacks. |
| Stack obrigatória | Mantida: tecnologias existentes, sem biblioteca adicional. |
| Português brasileiro | Mantido em textos, nomes autorais e testes; atributos e APIs seguem as convenções técnicas oficiais. |
| Protótipo enxuto | Mantido: uma preferência em memória sem persistência nem arquitetura global adicional. |
| Qualidade verificável | Mantido: testes de interface, navegação e uso por teclado. |

**Resultado final**: Aprovado. Não há violações ou esclarecimentos pendentes.

## Rastreamento de Complexidade

Não há violações nem camadas adicionais; a personalização usa o estado e os estilos globais
que já existem na aplicação.
