import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({
    include: "**/*.svg?react"
  })],
  css: {
    postcss: './src/postcss.config.js',
  },
  server: {
    open: true, // 서버가 시작될 때 브라우저 자동 열기 옵션
  },
  define: {
    'process.env': process.env
  }
});
