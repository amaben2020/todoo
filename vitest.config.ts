import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // gives us access to the browser api
    environment: 'jsdom',
    globals: true,
    setupFiles: 'tests/setup.ts',
  },
});
