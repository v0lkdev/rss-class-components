/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.css', 'src/main.tsx'],
    },
  },
});
