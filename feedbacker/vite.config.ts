import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./testes/configurarTestes.ts'],
    include: ['testes/**/*.test.{ts,tsx}'],
    restoreMocks: true,
    clearMocks: true,
  },
});
