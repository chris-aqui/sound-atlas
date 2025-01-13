/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from 'vite';
import { ConfigEnv, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const proxyTarget =
    command === 'serve'
      ? 'http://localhost:5000' // Development target
      : 'https://sound-atlas.onrender.com'; // Production target

  return {
    root: path.resolve(__dirname), // Points to the client directory
    envDir: path.resolve(__dirname, '..'), // Points to the root directory where .env is
    server: {
      open: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true, // Use global APIs like `describe`, `it`, `expect`
      environment: 'jsdom', // Simulate a browser environment
      setupFiles: './src/setupTests.ts', // Path to setup file for global configurations
      coverage: {
        provider: 'c8', // Use `c8` for code coverage
        reporter: ['text', 'lcov'], // Output coverage in text and lcov formats
      },
    },
  }as UserConfig & { test: any };
});
