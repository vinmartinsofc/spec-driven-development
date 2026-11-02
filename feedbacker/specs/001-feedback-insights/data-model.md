# Modelo de Dados: Insights de feedback

Todos os dados existem apenas na memória durante a sessão do navegador. Não há persistência
nem relacionamento com serviços externos.

## Entidades

### Feedback

Representa uma linha não vazia da entrada do PM.

| Campo | Tipo conceitual | Regra |
|---|---|---|
| Texto | Texto | Preserva o conteúdo original da linha, removendo espaços apenas das extremidades. |
| Sentimento | Sentimento | Exatamente um entre positivo, neutro ou negativo. |
| Categoria | Categoria | Exatamente uma entre bug, funcionalidade, usabilidade ou outros. |
| Ordem | Número inteiro positivo | Reflete a posição da linha na entrada; linhas repetidas têm ordens distintas. |

### Análise

Representa o resultado temporário exibido no dashboard.

| Campo | Tipo conceitual | Regra |
|---|---|---|
| Feedbacks | Lista de Feedback | Um elemento por linha não vazia, em ordem de entrada. |
| Total | Número inteiro não negativo | Igual ao tamanho da lista de feedbacks. |
| Contagens por sentimento | Mapa de Sentimento para número inteiro | Cada feedback conta uma vez; soma igual ao total. |
| Contagens por categoria | Mapa de Categoria para número inteiro | Cada feedback conta uma vez; soma igual ao total. |

As contagens são derivadas da lista de feedbacks e não são uma fonte de estado independente.
O gráfico sempre contém todas as quatro categorias; sentimento contém sempre as três
classificações, mesmo quando uma contagem é zero.

## Enumerações

- **Sentimento**: `positivo`, `neutro`, `negativo`.
- **Categoria**: `bug`, `funcionalidade`, `usabilidade`, `outros`.
- **Estado do fluxo**: `entrada`, `carregando`, `resultados`.

O estado `carregando` é transitório; não representa uma análise persistida ou um quarto
destino de navegação. O fluxo normal é `entrada` → `carregando` → `resultados`. Voltar dos
resultados limpa a análise e restaura a entrada de demonstração.

## Regras de Entrada e Classificação

1. Dividir a entrada por quebras de linha, incluindo LF e CRLF.
2. Remover espaços apenas nas extremidades de cada linha; ignorar linhas vazias após essa
   remoção. Não deduplicar linhas.
3. Preservar a ordem e o texto das linhas válidas.
4. Normalizar caixa e acentos para comparar palavras-chave; preservar o texto original
   apresentado na tabela.
5. Se houver chaves de várias categorias na mesma linha, aplicar a prioridade `bug`,
   `funcionalidade`, `usabilidade`, `outros`.
6. Categorias não inferem sentimento. Sem chave de sentimento, usar `neutro`; sem chave de
   categoria, usar `outros`.
7. Se sinais de sentimento positivos e negativos coexistirem, prevalece `negativo`.

### Chaves de Classificação da Especificação

| Resultado | Palavras ou expressões |
|---|---|
| Sentimento negativo e categoria `bug` | `trava`, `travar`, `travamento`, `erro`, `erros`, `lento`, `lenta`, `lentidão` |
| Categoria `funcionalidade` | `exportar`, `exportação`, `gostaria`, `seria bom` |
| Categoria `usabilidade` | `confuso`, `confusa`, `escondido`, `escondida`, `difícil` |
| Sentimento positivo | `adorei`, `ótimo`, `ótima`, `muito bom`, `muito boa` |

## Invariantes

- Para qualquer análise válida, `Total = quantidade de Feedbacks`.
- A soma das contagens de sentimentos e a soma das contagens de categorias são iguais ao
  total, independentemente.
- Cada linha não vazia da entrada corresponde a exatamente um Feedback, mesmo quando o
  texto se repete.
- Todo Feedback tem um sentimento e uma categoria.
- Resetar o fluxo descarta a Análise e restaura os exemplos iniciais.
