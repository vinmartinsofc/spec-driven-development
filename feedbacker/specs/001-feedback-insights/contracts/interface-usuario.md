# Contrato da Interface de Usuário: Insights de feedback

## Escopo

Contrato para a interface visível do protótipo SPA. Não há API pública, integração externa
ou contrato de rede.

## Regiões Persistentes

- Uma barra lateral fixa exibe o nome “Feedbacker” e itens ilustrativos com ícones Lucide.
- A área de conteúdo mostra a entrada, o estado transitório de carregamento ou os resultados.
- Os itens ilustrativos da barra lateral não navegam para páginas inexistentes.

## Tela Principal: Entrada

- Campo amplo e editável contém inicialmente os três exemplos definidos em RF-003.
- “Gerar insights” permanece desabilitado quando não existe linha não vazia.
- Com uma ou mais linhas válidas, ativar o botão inicia uma única análise.
- A ativação não muda a URL.

## Estado Transitório: Carregamento

- Exibe indicador giratório Lucide com animação e texto acessível em português brasileiro.
- Não oferece controles de navegação ou permite iniciar análise duplicada.
- Após 2.000 ms, substitui o indicador pelos resultados da análise iniciada.
- O temporizador é limpo se o fluxo for resetado ou o componente desmontado.

## Tela Principal: Resultados

- Cartões apresentam o total e as três contagens de sentimento.
- Gráfico apresenta as quatro categorias e suas contagens; categorias sem feedback têm
  contagem zero.
- Tabela apresenta “Texto”, “Sentimento” e “Categoria”; cada linha válida é exibida em
  ordem, inclusive duplicatas.
- “Voltar” limpa os resultados, restaura os três exemplos e exibe a tela de entrada.

## Acessibilidade e Conteúdo

- Todos os controles interativos são acessíveis por teclado e têm nome acessível em
  português brasileiro.
- Indicadores de estado não dependem somente de cor; sentimentos e categorias têm rótulos
  textuais.
- O indicador de carregamento informa o estado a tecnologias assistivas.
- A interface permanece legível em tamanhos de tela relevantes para a demonstração.
- Classes visuais usam a paleta Slate/Zinc do Tailwind; ícones vêm de Lucide React.
