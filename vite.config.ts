import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react(), tailwindcss()],
    base: '/',
  };

  if (command !== 'serve') {
    config.base = '/MusicQuiz/';
  }

  return config;
});
