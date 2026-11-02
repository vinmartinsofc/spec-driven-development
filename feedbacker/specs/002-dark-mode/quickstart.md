# Guia de Validação: Modo escuro

## Pré-requisitos

- Node.js e dependências do Feedbacker instalados.
- Aplicação React e servidor Vite disponíveis no repositório.

## Testes automatizados

```bash
npm test -- --run
npm run build
```

Resultados esperados:

- Testes validam estado inicial claro, alternância com mouse e teclado e estado acessível.
- Testes confirmam que o tema aplicado continua ativo durante carregamento, resultados e
  retorno à entrada.
- Testes verificam que alternar o tema não altera texto, análise, métricas ou URL.
- O build termina sem erros.

## Validação manual

1. Inicie o projeto com `npm run dev` e abra a tela inicial.
2. Confirme que o tema claro está ativo e que “Modo escuro” tem estado desativado.
3. Use Tab até o botão e pressione Enter; confirme que o estado anunciado muda para ativo e
   as superfícies, textos e bordas da interface mudam para o tema escuro.
4. Pressione Tab e Espaço quando o foco retornar ao controle, ou clique novamente para
   desativá-lo; confirme o retorno ao tema claro.
5. Ative novamente o modo escuro, gere insights e confirme que carregamento, cartões,
   gráfico e tabela permanecem no tema escuro.
6. Volte à entrada e confirme que a seleção escura continua ativa; desligue-a.
7. Recarregue o aplicativo e confirme que o tema inicial volta a ser claro.
8. Repita em viewport estreito e verifique legibilidade e foco visível.
