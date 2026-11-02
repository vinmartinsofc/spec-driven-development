# Modelo de Estado: Modo escuro

## Preferência de tema

| Campo | Tipo | Valor inicial | Regra |
|---|---|---|---|
| `temaEscuro` | Booleano | `false` | `true` representa tema escuro; `false` representa tema claro. |

A preferência é efêmera e pertence ao estado da aplicação durante uma sessão SPA. Não é
persistida nem associada aos feedbacks ou à análise.

## Estado do fluxo e transições

O estado atual das telas continua `entrada`, `carregando` ou `resultados`. Alternar o tema
não é uma transição de tela e não modifica o estado desse fluxo:

- Inicialização/recarregamento: `temaEscuro = false`.
- Ação “Modo escuro”: alterna `false` ↔ `true`.
- Ação “Gerar insights”: preserva `temaEscuro` em `entrada` → `carregando` → `resultados`.
- Ação “Voltar”: limpa a análise e restaura a entrada, mas preserva `temaEscuro`.
- Recarregar a página: o estado volta a `false`.

## Invariantes

- O atributo visual global representa exatamente o booleano atual: `data-tema="escuro"` para
  `true` e `data-tema="claro"` para `false`.
- Alternar tema não altera texto de entrada, feedbacks classificados, contagens ou URL.
- Apenas um tema está ativo por vez.
- Elementos das três telas respeitam o mesmo valor global.
- O botão expõe seu valor pelo atributo acessível `aria-pressed`.
