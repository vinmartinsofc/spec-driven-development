# Contrato da Interface de Usuário: Modo escuro

## Escopo

Contrato visual e de interação da preferência de tema no aplicativo SPA existente. Não há
API externa, navegação nova ou persistência.

## Controle na Tela Inicial

- Apresentar um botão identificável como “Modo escuro”.
- Mostrar explicitamente se o modo está ativo, por texto, estado acessível ou ambos; não
  depender somente da cor ou do ícone.
- Expor `aria-pressed="true"` quando escuro e `"false"` quando claro.
- Permitir alternância por clique, Enter e Espaço com foco visível.
- Manter controles de navegação ilustrativos existentes sem alterar sua função.

## Aplicação do Tema

- O tema selecionado é aplicado ao layout global, sidebar e todo o conteúdo de entrada,
  carregamento e resultados.
- Fundos, texto, campos, cartões, bordas, badges, barras, tabela e foco permanecem legíveis.
- Alternar o tema não reinicia o carregamento, a entrada nem os resultados e não altera a URL.
- O tema é preservado em `entrada` → `carregando` → `resultados` e ao voltar.
- Uma recarga inicia no tema claro.

## Textos

- Controle: “Modo escuro”.
- Estado ativo informado às tecnologias assistivas por `aria-pressed` e, se presente, por
  texto em português brasileiro.
- Ícones de sol ou lua são decorativos quando o nome do botão já identifica a ação.
