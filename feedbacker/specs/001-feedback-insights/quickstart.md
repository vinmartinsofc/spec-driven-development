# Guia de Validação: Insights de feedback

## Pré-requisitos

- Node.js e npm compatíveis com as versões selecionadas ao configurar a aplicação.
- Dependências instaladas após a implementação da estrutura descrita em `plan.md`.
- Servidor gráfico ou navegador moderno para validar visualmente a interface.

> O repositório ainda não tem manifesto npm. Os comandos abaixo são os scripts planejados
> para a implementação e só serão executáveis após a configuração do projeto.

## Inicializar a Aplicação

```bash
npm install
npm run dev
```

Abra no navegador o endereço local informado pelo Vite. Confirme que a tela inicial mostra
“Feedbacker”, a barra lateral, os três exemplos editáveis e “Gerar insights”.

## Executar Testes Automatizados

```bash
npm test -- --run
npm run build
```

Resultados esperados:

- Testes unitários verificam linhas vazias, duplicatas, ordem, normalização de acentos,
  prioridade de categorias e conflitos de sentimento.
- Testes da interface verificam botão desabilitado para entrada vazia, transições do fluxo,
  botão “Voltar” e correspondência entre entrada, tabela e contagens.
- Com temporizadores controlados, resultados não aparecem antes de 2.000 ms e aparecem
  quando o temporizador de 2.000 ms é concluído.
- O build termina sem erros.

## Cenário Manual de Demonstração

1. Na entrada padrão, confirme três linhas editáveis.
2. Substitua-as por:

   ```text
   O app trava ao exportar.
   Gostaria de um PDF.
   O botão está difícil de encontrar.
   Adorei o novo painel.
   feedback sem regra conhecida
   feedback sem regra conhecida
   ```

3. Selecione “Gerar insights”. Confirme que a tela de carregamento aparece durante
   2.000 ms e, depois, os resultados substituem o estado transitório.
4. Confira seis linhas na tabela, na mesma ordem, incluindo a repetição:
   - primeira linha: negativo / bug (a prioridade de categoria escolhe bug);
   - segunda linha: neutro / funcionalidade;
   - terceira linha: neutro / usabilidade;
   - quarta linha: positivo / outros;
   - quinta e sexta linhas: neutro / outros.
5. Confira o total 6, sentimentos 1 positivo, 4 neutros e 1 negativo, e categorias
   1 bug, 1 funcionalidade, 1 usabilidade e 3 outros.
6. Selecione “Voltar”. Confirme que a análise desaparece e os três exemplos padrão retornam.
7. Apague o conteúdo ou deixe apenas espaços/quebras de linha; confirme que não é possível
   iniciar uma análise.
8. Repita a inspeção em teclado e em uma tela menor; confirme nomes acessíveis, foco visível
   e leitura das métricas sem depender apenas de cor.
