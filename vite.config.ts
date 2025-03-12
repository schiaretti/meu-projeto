import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default defineConfig({
  plugins: [
    react(), // Plugin do React
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss(), // Plugin do Tailwind CSS
        autoprefixer(), // Plugin do Autoprefixer
      ],
    },
  },
  build: {
    outDir: 'dist', // Define o diretório de saída do build
    emptyOutDir: true, // Limpa o diretório de saída antes de cada build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para a pasta src
    },
  },
});