# Especificação da Funcionalidade: Modo escuro

**Branch da funcionalidade**: Não criada (nenhum hook de branch configurado)

**Criada**: 2026-11-01

**Status**: Rascunho

**Entrada**: Permitir que o usuário selecione o modo escuro na tela inicial.

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 — Alternar o tema da interface (Prioridade: P1)

Como Product Manager, quero ativar ou desativar o modo escuro na tela inicial, para escolher
a aparência mais confortável ao revisar feedbacks.

**Por que esta prioridade**: A escolha do tema torna a demonstração mais confortável e
personalizável para quem usa o produto.

**Teste independente**: Abrir a tela inicial, ativar o modo escuro, navegar pelo fluxo de
análise e verificar que o tema escuro permanece nas telas de carregamento e resultados;
voltar à tela inicial, desativá-lo e verificar que a interface retorna ao tema claro.

**Cenários de aceitação**:

1. **Dado** que o usuário está na tela inicial e o tema claro está ativo, **Quando** ativa
   “Modo escuro”, **Então** as áreas principais da interface adotam o tema escuro e o
   controle informa que o modo está ativo.
2. **Dado** que o modo escuro está ativo, **Quando** o usuário gera insights, **Então** a
   tela de carregamento e os resultados também aparecem no tema escuro.
3. **Dado** que o modo escuro está ativo nos resultados, **Quando** o usuário volta à tela
   inicial, **Então** o tema permanece escuro e pode ser desativado pelo mesmo controle.
4. **Dado** que o usuário desativa “Modo escuro” na tela inicial, **Quando** observa o
   aplicativo, **Então** as telas voltam ao tema claro.

### Casos extremos

- Alternar o controle repetidamente não cria temas intermediários ou inconsistentes.
- O estado do tema não altera o texto digitado, as classificações nem os resultados da
  análise atual.
- Ao recarregar ou abrir uma nova sessão, o aplicativo começa no tema claro.
- O controle pode ser operado por teclado e seu nome e estado são compreensíveis por
  tecnologias assistivas.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: A tela inicial DEVE disponibilizar um controle identificável como “Modo
  escuro” para alternar entre tema claro e tema escuro.
- **RF-002**: O tema escuro DEVE ser aplicado de forma consistente ao layout global, à
  entrada de feedback, ao carregamento, aos cartões, ao gráfico e à tabela de resultados.
- **RF-003**: O usuário DEVE poder voltar ao tema claro usando o mesmo controle na tela
  inicial.
- **RF-004**: A alteração do tema DEVE preservar o conteúdo da entrada e os resultados da
  análise atual.
- **RF-005**: O controle DEVE expor seu nome acessível e estado atual e DEVE ser operável
  por teclado.
- **RF-006**: O tema DEVE iniciar no modo claro quando a aplicação for recarregada ou uma
  nova sessão começar.
- **RF-007**: Todo texto autoral do controle e das orientações visíveis DEVE estar em
  português brasileiro.

### Entidades Principais

- **Preferência de tema**: Estado visual atual, claro ou escuro, mantido durante a sessão
  ativa do aplicativo e independente dos dados de feedback.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Em 100% das telas do fluxo — inicial, carregamento e resultados — o tema
  selecionado é aplicado sem elementos de interface esquecidos no tema anterior.
- **CS-002**: Em 100% das alternâncias, o conteúdo da entrada e os resultados permanecem
  inalterados.
- **CS-003**: Em 100% dos testes do controle, usuários conseguem ativar e desativar o tema
  pela tela inicial usando apenas o teclado e identificar seu estado sem depender somente
  da cor.

## Premissas

- O tema claro continua sendo o padrão de uma nova sessão; a preferência não precisa
  persistir após recarregar ou fechar o aplicativo.
- O tema escolhido é global para as telas da aplicação enquanto a sessão SPA estiver ativa,
  embora o controle seja apresentado na tela inicial.
- O tema altera a apresentação visual, não o conteúdo ou as regras de análise.
- Contraste, legibilidade, estados de foco e rótulos existentes devem continuar adequados
  nos dois temas.
