# Pesquisa e Decisões Técnicas: Modo escuro

## Estado da Aplicação

- **Decisão**: Estender o componente raiz, a entrada e os componentes visuais existentes;
  não criar rota, dependência ou serviço para tema.
- **Justificativa**: O tema precisa persistir somente pelas três telas de uma SPA já
  implementada com React e Tailwind.
- **Alternativas consideradas**: Novo provider de contexto ou biblioteca de temas; rejeitadas
  por desnecessárias para um booleano pertencente ao único fluxo da aplicação.

## Ativação Condicional do Tailwind

- **Decisão**: Associar a variante `dark` do Tailwind CSS 4 a um atributo `data-tema="escuro"`
  aplicado no contêiner raiz.
- **Justificativa**: O tema é controlado pela interação do usuário e não deve depender da
  preferência de sistema operacional; as variantes `dark:` podem estilizar toda a árvore de
  componentes sem passar propriedades de tema por cada nível.
- **Alternativas consideradas**: Usar `prefers-color-scheme`; rejeitada porque o requisito
  exige um controle explícito e selecionável na interface. Definir classe manualmente em
  cada tela; rejeitada por duplicar o estado e permitir telas inconsistentes.

## Gerenciamento e Persistência do Estado

- **Decisão**: Inicializar o estado de tema como claro (`false`) com estado local React no
  componente raiz; manter o valor durante a sessão SPA e não usar `localStorage` ou cookies.
- **Justificativa**: Corresponde à premissa de retorno ao tema claro em recargas e preserva
  a seleção durante as transições internas.
- **Alternativas consideradas**: Persistir a preferência após recarga; rejeitada por
  exceder o escopo.

## Acessibilidade do Controle

- **Decisão**: Usar botão nativo com rótulo “Modo escuro”, `aria-pressed` refletindo o estado,
  texto indicativo e ícones Lucide decorativos.
- **Justificativa**: Botões nativos suportam foco e acionamento por Enter/Espaço; o atributo
  anuncia a alternância a tecnologias assistivas sem depender da cor ou do ícone.
- **Alternativas consideradas**: Ícone isolado ou controle visual sem semântica; rejeitados
  por não tornar o nome e o estado acessíveis.

## Estilos da Aplicação

- **Decisão**: Acrescentar variantes `dark:` aos componentes com cores claras atuais e
  ajustar estilos base de CSS onde aplicável.
- **Justificativa**: Os fundos, textos, bordas, badges e superfícies estão definidos em
  classes de cada componente e precisam mudar em conjunto.
- **Alternativas consideradas**: Aplicar apenas um fundo escuro no contêiner raiz; rejeitada
  porque não atualiza cartões brancos, campos, tabelas, bordas e textos, deixando baixo
  contraste e superfícies inconsistentes.
