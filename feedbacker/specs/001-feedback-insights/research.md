# Pesquisa e Decisões Técnicas: Insights de feedback

## Estado do Repositório

- **Decisão**: Tratar o repositório como um protótipo sem aplicação existente; não há
  manifesto de dependências, código em `src/` ou configuração de testes.
- **Justificativa**: A inspeção do diretório do projeto encontrou apenas artefatos Spec Kit
  e documentação da funcionalidade.
- **Alternativas consideradas**: Integrar a arquitetura a uma aplicação preexistente;
  descartada porque não há código de aplicação a preservar.

## Estrutura de Interface

- **Decisão**: Usar duas telas principais, entrada e resultados, com carregamento como
  estado transitório representado por componente próprio, sem rota.
- **Justificativa**: Atende ao pedido de alternância entre duas telas e preserva a tela de
  carregamento de dois segundos especificada no fluxo do produto.
- **Alternativas consideradas**: Criar três destinos navegáveis; descartada porque
  carregamento não é um destino nem deve ter navegação própria.

## Gerenciamento de Estado e Temporização

- **Decisão**: Manter texto, estado do fluxo e análise no estado local React do componente
  raiz. Usar um efeito dependente do estado `carregando` para agendar 2.000 ms e cancelar o
  temporizador na limpeza do efeito.
- **Justificativa**: O fluxo é pequeno e local; o efeito evita criar temporizadores novos a
  cada renderização e a limpeza evita transições atrasadas após cancelamento/desmontagem.
- **Alternativas consideradas**: Biblioteca de estado global ou temporizador criado
  diretamente durante renderização; ambas foram descartadas por complexidade ou risco de
  múltiplos temporizadores.

## Ferramentas de Aplicação e Teste

- **Decisão**: Adotar Vite com React e TypeScript para servir e compilar a SPA; Vitest e
  React Testing Library para testes unitários e de interação.
- **Justificativa**: O repositório não determina ferramentas e a aplicação precisa apenas de
  build front-end, testes de lógica pura e validação de estados da interface.
- **Alternativas consideradas**: Framework full-stack, roteador e gerenciador de estado
  global; descartados por não haver backend, rotas ou estado compartilhado entre páginas.
- **Observação**: São recomendações de implementação e não dependências já configuradas.

## Visualização de Categorias

- **Decisão**: Construir barras horizontais com elementos HTML e classes Tailwind, com
  contagens derivadas dos feedbacks.
- **Justificativa**: A especificação proíbe biblioteca de gráficos e requer visualização
  simples com as quatro categorias.
- **Alternativas consideradas**: Biblioteca de gráficos; descartada por contrariar o
  requisito e adicionar dependências desnecessárias.

## Classificação e Privacidade

- **Decisão**: Implementar a normalização, classificação e agregação como funções puras
  executadas no navegador; não persistir nem transmitir a entrada.
- **Justificativa**: A especificação exige heurísticas determinísticas, sem IA real e sem
  serviço externo.
- **Alternativas consideradas**: Serviço remoto, modelo de linguagem ou classificação
  aleatória; todos descartados por contrariarem escopo e reprodutibilidade.

## Idioma e Convenções

- **Decisão**: Nomear tipos, funções, componentes e documentação autorais em português
  brasileiro; manter nomes oficiais de ferramentas, bibliotecas e APIs conforme a
  convenção técnica.
- **Justificativa**: Exigência da constituição do Feedbacker.
- **Alternativas consideradas**: Identificadores autorais em inglês; descartados por
  conflito com a constituição.
