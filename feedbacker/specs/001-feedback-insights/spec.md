# Especificação da Funcionalidade: Insights de feedback

**Branch da funcionalidade**: Não criada (nenhum hook de branch configurado)

**Criada**: 2026-11-01

**Status**: Rascunho

**Entrada**: Criar um protótipo de página única para PMs que simule a análise de feedbacks
colados pelo usuário. O fluxo apresenta uma tela inicial, uma tela de carregamento de dois
segundos e uma tela de resultados, com classificação determinística em português brasileiro,
métricas, gráfico por categoria e tabela que preserva todos os feedbacks não vazios.

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 — Preparar e analisar feedbacks (Prioridade: P1)

Como Product Manager, quero colar ou editar feedbacks de usuários e gerar uma análise
demonstrativa, para visualizar rapidamente os temas e sentimentos presentes no texto.

**Por que esta prioridade**: A entrada e a análise dos feedbacks constituem o fluxo principal
do protótipo e permitem demonstrar seu valor central.

**Teste independente**: Abrir a tela inicial, editar o texto de exemplo, iniciar a análise e
verificar que a tela de resultados é exibida após a tela de carregamento.

**Cenários de aceitação**:

1. **Dado** que o PM abriu o aplicativo, **Quando** a tela inicial é exibida, **Então** o
   campo de texto contém três feedbacks de exemplo editáveis e o botão “Gerar insights”
   está disponível.
2. **Dado** que o campo contém um ou mais feedbacks não vazios, **Quando** o PM seleciona
   “Gerar insights”, **Então** é exibida uma tela de carregamento por exatamente dois
   segundos antes dos resultados.
3. **Dado** que o campo contém apenas espaços ou quebras de linha, **Quando** o PM observa
   a tela inicial, **Então** “Gerar insights” está desabilitado e nenhuma análise pode ser
   iniciada.

---

### História de Usuário 2 — Examinar métricas e classificações (Prioridade: P1)

Como Product Manager, quero comparar os sentimentos e categorias dos feedbacks e consultar
cada texto original, para identificar tendências sem perder o contexto individual.

**Por que esta prioridade**: A análise só é útil quando agrega os dados e permite conferir
como cada feedback foi classificado.

**Teste independente**: Analisar um conjunto conhecido de linhas e comparar os resultados
da tabela, os cartões de métricas e as contagens do gráfico com as regras e os dados de
entrada.

**Cenários de aceitação**:

1. **Dado** um feedback que contém “trava”, **Quando** os resultados são exibidos,
   **Então** sua linha aparece como sentimento “negativo” e categoria “bug”.
2. **Dado** um pedido que contém “exportar” ou “gostaria”, **Quando** os resultados são
   exibidos, **Então** sua linha aparece na categoria “funcionalidade” e seu sentimento é
   “neutro”, salvo se também houver uma palavra-chave de sentimento.
3. **Dado** um feedback que contém “confuso”, “escondido” ou “difícil”, **Quando** os
   resultados são exibidos, **Então** sua linha aparece na categoria “usabilidade”.
4. **Dado** um feedback que contém “adorei”, “ótimo” ou “muito bom” sem palavra-chave de
   categoria, **Quando** os resultados são exibidos, **Então** sua linha aparece como
   sentimento “positivo” e categoria “outros”.
5. **Dado** um feedback sem palavra-chave reconhecida, **Quando** os resultados são
   exibidos, **Então** sua linha aparece como sentimento “neutro” e categoria “outros”.
6. **Dado** um texto com linhas vazias, linhas repetidas ou diferentes tipos de quebra de
   linha, **Quando** os resultados são exibidos, **Então** cada linha não vazia, inclusive
   cada repetição, aparece uma vez na tabela, na ordem original, e linhas vazias são
   ignoradas.
7. **Dado** um conjunto de feedbacks analisados, **Quando** o PM consulta o painel,
   **Então** os cartões mostram o total e as contagens de sentimentos, o gráfico mostra as
   contagens por categoria e a tabela apresenta as colunas “Texto”, “Sentimento” e
   “Categoria”.

---

### História de Usuário 3 — Reiniciar a demonstração (Prioridade: P2)

Como Product Manager, quero voltar dos resultados para a entrada limpa de demonstração,
para iniciar uma nova análise sem confundir os dados anteriores com os próximos.

**Por que esta prioridade**: Reiniciar o fluxo facilita demonstrações sucessivas e evita
que resultados antigos sejam confundidos com uma nova entrada.

**Teste independente**: Alterar os exemplos, gerar resultados e selecionar “Voltar”;
verificar que a entrada e o estado de análise retornam ao padrão inicial.

**Cenários de aceitação**:

1. **Dado** que a tela de resultados está aberta, **Quando** o PM seleciona “Voltar”,
   **Então** retorna à tela inicial, os resultados anteriores são descartados e o campo
   volta a conter os três feedbacks de exemplo padrão.

### Casos extremos

- Linhas vazias ou compostas apenas por espaços não geram linhas na tabela; quebras de
  linha no início, no fim ou entre feedbacks não criam itens adicionais.
- Linhas repetidas continuam sendo feedbacks individuais e não são deduplicadas.
- Uma entrada com palavras-chave de mais de uma categoria usa a prioridade definida nas
  premissas; palavras-chave de categorias não determinam, por si só, o sentimento.
- Se um feedback contiver palavras-chave de sentimento positivo e negativo, prevalece
  “negativo”.
- Um conjunto em que todas as categorias não residuais têm contagem zero ainda exibe as
  quatro categorias no gráfico, incluindo “outros”.
- O aplicativo não inicia a análise para uma entrada vazia ou composta somente por espaços.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: O aplicativo DEVE apresentar o fluxo em uma única página, sem navegação para
  outra URL, com as três telas: inicial, carregamento e resultados.
- **RF-002**: A tela inicial DEVE apresentar o título “Feedbacker”, uma barra lateral fixa
  em tons de cinza-ardósia e cinza-zinco, itens de navegação ilustrativos com ícones e uma
  área principal com um cartão de entrada, campo amplo de texto e o botão destacado
  “Gerar insights”.
- **RF-003**: O campo de texto DEVE iniciar preenchido com estes três exemplos, um por
  linha, e permitir que o usuário os edite ou apague:
  - “O aplicativo trava quando tento salvar um feedback.”
  - “Gostaria de exportar o relatório de feedbacks em PDF.”
  - “O botão Salvar está difícil de encontrar na tela.”
- **RF-004**: O botão “Gerar insights” DEVE permanecer desabilitado quando o texto não
  contiver nenhuma linha não vazia. A análise DEVE começar somente após uma ação explícita
  do usuário com entrada válida.
- **RF-005**: Após a ação de análise, o aplicativo DEVE exibir uma tela de carregamento com
  indicador giratório e mantê-la por exatamente dois segundos antes de exibir os resultados.
- **RF-006**: O aplicativo DEVE criar um feedback individual para cada linha não vazia do
  texto, preservar sua ordem e conteúdo e manter linhas repetidas como itens distintos.
  Linhas vazias ou compostas somente por espaços DEVEM ser ignoradas.
- **RF-007**: A classificação DEVE ser simulada, determinística, local e baseada nas
  palavras-chave abaixo; não DEVE usar IA real nem enviar os feedbacks a um serviço externo.
  A comparação DEVE ignorar diferenças entre maiúsculas e minúsculas e acentos:
  - Sentimento negativo e categoria “bug”: “trava”, “travar”, “travamento”, “erro”,
    “erros”, “lento”, “lenta” e “lentidão”.
  - Categoria “funcionalidade”: “exportar”, “exportação”, “gostaria” e a expressão
    “seria bom”.
  - Categoria “usabilidade”: “confuso”, “confusa”, “escondido”, “escondida” e “difícil”.
  - Sentimento positivo: “adorei”, “ótimo”, “ótima”, “muito bom” e “muito boa”.
- **RF-008**: O aplicativo DEVE classificar sentimento e categoria de forma independente.
  Sem palavra-chave de sentimento, o sentimento DEVE ser “neutro”; sem palavra-chave de
  categoria, a categoria DEVE ser “outros”. Assim, um elogio sem palavra-chave de categoria
  DEVE ser positivo e pertencer a “outros”.
- **RF-009**: Quando houver mais de uma categoria correspondente, o aplicativo DEVE
  selecionar uma única categoria usando a prioridade “bug”, “funcionalidade”, “usabilidade”
  e, por fim, “outros”. Quando houver palavras-chave de sentimentos conflitantes, DEVE
  prevalecer o sentimento “negativo” sobre “positivo”.
- **RF-010**: A tela de resultados DEVE apresentar cartões com o total de feedbacks e as
  contagens dos sentimentos “positivo”, “neutro” e “negativo”. A soma das contagens de
  sentimento DEVE ser igual ao total.
- **RF-011**: A tela de resultados DEVE apresentar um gráfico de barras horizontais com a
  contagem de feedbacks para cada categoria “bug”, “funcionalidade”, “usabilidade” e
  “outros”, inclusive para categorias com contagem zero.
- **RF-012**: A tela de resultados DEVE apresentar uma tabela com as colunas “Texto”,
  “Sentimento” e “Categoria”. Cada linha não vazia da entrada DEVE corresponder a
  exatamente uma linha da tabela.
- **RF-013**: A tela de resultados DEVE oferecer o botão “Voltar”. Ao selecioná-lo, o
  aplicativo DEVE descartar a análise anterior, retornar à tela inicial e restaurar os três
  exemplos padrão.
- **RF-014**: Todo texto autoral visível na interface DEVE estar em português brasileiro.

### Entidades Principais

- **Feedback**: Uma linha não vazia fornecida pelo usuário, preservada como texto original
  e associada a um sentimento e uma categoria simulados.
- **Sentimento**: Uma das classificações “positivo”, “neutro” ou “negativo”, atribuída pelas
  palavras-chave da entrada.
- **Categoria**: Uma das classificações “bug”, “funcionalidade”, “usabilidade” ou
  “outros”, atribuída pelas palavras-chave da entrada.
- **Análise**: O conjunto temporário de feedbacks classificados e das contagens exibidas
  nos resultados.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Em 100% das análises, o número de linhas da tabela é igual ao número de linhas
  não vazias da entrada, incluindo repetições.
- **CS-002**: Em 100% das análises, a soma das três contagens de sentimento e a soma das
  quatro contagens de categoria são, cada uma, iguais ao total exibido.
- **CS-003**: Em 100% das análises válidas, os resultados aparecem após exatamente dois
  segundos de carregamento.
- **CS-004**: Em um teste de aceitação com cinco PMs, os cinco conseguem identificar, sem
  orientação, o total de feedbacks, o sentimento mais frequente e a categoria mais
  frequente no painel de resultados.

## Premissas

- Cada linha separada por uma quebra de linha é considerada um feedback; espaços nas
  extremidades são ignorados ao determinar se a linha está vazia, e o texto restante da
  linha é preservado. Linhas separadas por diferentes formatos de quebra de linha seguem a
  mesma regra.
- A correspondência de palavras-chave ignora acentos e capitalização. As expressões
  indicadas, como “seria bom” e “muito bom”, são correspondências de frase.
- Se houver indicadores de categorias diferentes na mesma linha, prevalece a prioridade
  “bug”, “funcionalidade” e “usabilidade”. Os indicadores de sentimento são avaliados
  separadamente.
- A classificação é uma simulação demonstrativa, não uma avaliação real de qualidade,
  sentimento ou intenção. A entrada não é persistida nem enviada para processamento externo.
- O protótipo não inclui autenticação, integração com serviços externos, persistência de
  dados nem navegação entre páginas ou URLs diferentes.
- A barra lateral e os itens ilustrativos de navegação compõem o layout da demonstração;
  os itens não representam destinos ou funcionalidades adicionais.
