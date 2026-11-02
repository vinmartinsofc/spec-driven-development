import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Aplicativo from '../../src/Aplicativo';

describe('tema escuro', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('inicia no tema claro e permite alternar o controle acessível pelo teclado', async () => {
    const usuario = userEvent.setup();
    const { container, unmount } = render(<Aplicativo />);
    const raiz = container.firstElementChild;
    const botaoTema = screen.getByRole('button', { name: 'Modo escuro' });

    expect(raiz).toHaveAttribute('data-tema', 'claro');
    expect(botaoTema).toHaveAttribute('aria-pressed', 'false');

    await usuario.tab();
    expect(botaoTema).toHaveFocus();
    await usuario.keyboard('{Enter}');

    expect(raiz).toHaveAttribute('data-tema', 'escuro');
    expect(botaoTema).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('textbox', { name: 'Feedbacks dos usuários' }),
    ).toHaveValue(
      'O aplicativo trava quando tento salvar um feedback.\nGostaria de exportar o relatório de feedbacks em PDF.\nO botão Salvar está difícil de encontrar na tela.',
    );

    await usuario.keyboard(' ');

    expect(raiz).toHaveAttribute('data-tema', 'claro');
    expect(botaoTema).toHaveAttribute('aria-pressed', 'false');

    unmount();
    const novaSessao = render(<Aplicativo />);
    expect(novaSessao.container.firstElementChild).toHaveAttribute(
      'data-tema',
      'claro',
    );
  });

  it('preserva o tema durante a análise e ao voltar à entrada', () => {
    vi.useFakeTimers();
    const { container } = render(<Aplicativo />);
    const raiz = container.firstElementChild;
    const campo = screen.getByRole('textbox', {
      name: 'Feedbacks dos usuários',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Modo escuro' }));
    fireEvent.change(campo, {
      target: { value: 'O aplicativo trava ao salvar o relatório.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Gerar insights' }));

    expect(raiz).toHaveAttribute('data-tema', 'escuro');
    expect(screen.getByRole('status')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(raiz).toHaveAttribute('data-tema', 'escuro');
    const tabela = screen.getByRole('table');
    const linhas = within(tabela).getAllByRole('row');
    expect(linhas).toHaveLength(2);
    expect(within(linhas[1]).getByText('O aplicativo trava ao salvar o relatório.')).toBeInTheDocument();
    expect(within(linhas[1]).getByText('Negativo')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(raiz).toHaveAttribute('data-tema', 'escuro');
    expect(
      screen.getByRole('textbox', { name: 'Feedbacks dos usuários' }),
    ).toHaveValue(
      'O aplicativo trava quando tento salvar um feedback.\nGostaria de exportar o relatório de feedbacks em PDF.\nO botão Salvar está difícil de encontrar na tela.',
    );

    fireEvent.click(screen.getByRole('button', { name: 'Modo escuro' }));
    expect(raiz).toHaveAttribute('data-tema', 'claro');
    expect(
      screen.getByRole('button', { name: 'Modo escuro' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });
});
