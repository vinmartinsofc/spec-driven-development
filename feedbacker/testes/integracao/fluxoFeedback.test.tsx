import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Aplicativo from '../../src/Aplicativo';

describe('fluxo de feedback', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('inicia com os exemplos e bloqueia análise sem feedback válido', () => {
    render(<Aplicativo />);

    const campo = screen.getByRole('textbox', { name: 'Feedbacks dos usuários' });
    expect(campo).toHaveValue(
      'O aplicativo trava quando tento salvar um feedback.\nGostaria de exportar o relatório de feedbacks em PDF.\nO botão Salvar está difícil de encontrar na tela.',
    );
    expect(
      screen.getByRole('button', { name: 'Gerar insights' }),
    ).toBeEnabled();

    fireEvent.change(campo, { target: { value: ' \n  \n' } });

    expect(screen.getByRole('button', { name: 'Gerar insights' })).toBeDisabled();
  });

  it('exibe resultados somente após dois segundos de carregamento', () => {
    vi.useFakeTimers();
    render(<Aplicativo />);

    fireEvent.click(screen.getByRole('button', { name: 'Gerar insights' }));

    expect(screen.getByRole('status')).toHaveTextContent(
      'Analisando seus feedbacks',
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1999);
    });
    expect(screen.queryByRole('table')).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('mostra métricas e uma linha por feedback, inclusive duplicatas', () => {
    vi.useFakeTimers();
    render(<Aplicativo />);
    const campo = screen.getByRole('textbox', { name: 'Feedbacks dos usuários' });
    fireEvent.change(campo, {
      target: {
        value:
          'O app trava ao exportar.\nGostaria de um PDF.\nO botão está difícil de encontrar.\nAdorei o novo painel.\nSem regra\nSem regra',
      },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gerar insights' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const tabela = screen.getByRole('table');
    expect(within(tabela).getAllByRole('row')).toHaveLength(7);
    expect(within(tabela).getAllByText('Sem regra')).toHaveLength(2);
    expect(screen.getByText('Total de feedbacks')).toBeInTheDocument();
    expect(screen.getByText('6', { selector: 'p' })).toBeInTheDocument();
    expect(screen.getAllByText('Funcionalidade').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Usabilidade').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Outros').length).toBeGreaterThan(0);
    expect(
      screen.getByRole('progressbar', { name: 'Bug: 1 feedback' }),
    ).toHaveAttribute('aria-valuenow', '1');
    expect(
      screen.getByRole('progressbar', {
        name: 'Funcionalidade: 1 feedback',
      }),
    ).toHaveAttribute('aria-valuenow', '1');
    expect(
      screen.getByRole('progressbar', {
        name: 'Usabilidade: 1 feedback',
      }),
    ).toHaveAttribute('aria-valuenow', '1');
    expect(
      screen.getByRole('progressbar', { name: 'Outros: 3 feedbacks' }),
    ).toHaveAttribute('aria-valuenow', '3');
  });

  it('classifica os três exemplos iniciais de forma correspondente aos cartões', () => {
    vi.useFakeTimers();
    render(<Aplicativo />);
    fireEvent.click(screen.getByRole('button', { name: 'Gerar insights' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    const linhas = within(screen.getByRole('table')).getAllByRole('row');
    expect(linhas).toHaveLength(4);
    expect(within(linhas[1]).getByText('Negativo')).toBeInTheDocument();
    expect(within(linhas[1]).getByText('Bug')).toBeInTheDocument();
    expect(within(linhas[2]).getByText('Neutro')).toBeInTheDocument();
    expect(within(linhas[2]).getByText('Funcionalidade')).toBeInTheDocument();
    expect(within(linhas[3]).getByText('Neutro')).toBeInTheDocument();
    expect(within(linhas[3]).getByText('Usabilidade')).toBeInTheDocument();
  });

  it('volta à entrada, limpa os resultados e restaura os exemplos padrão', () => {
    vi.useFakeTimers();
    render(<Aplicativo />);
    const campo = screen.getByRole('textbox', { name: 'Feedbacks dos usuários' });
    fireEvent.change(campo, { target: { value: 'O app trava.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Gerar insights' }));
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(screen.getByRole('textbox', { name: 'Feedbacks dos usuários' })).toHaveValue(
      'O aplicativo trava quando tento salvar um feedback.\nGostaria de exportar o relatório de feedbacks em PDF.\nO botão Salvar está difícil de encontrar na tela.',
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
