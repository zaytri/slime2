import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'slime2-custom-index-transform',
      transformIndexHtml: html => {
        return html
          .replaceAll('{version}', version)
          .replaceAll(
            '="/slime2',
            `="https://cdn.jsdelivr.net/gh/zaytri/slime2@${version}/release/slime2`,
          )
      },
    },
  ],
  build: {
    outDir: 'release',
    assetsDir: '.',
    rollupOptions: {
      input: {
        app: './base.html',
      },
      output: {
        assetFileNames: 'slime2[extname]',
        entryFileNames: 'slime2.js',
      },
    },
  },
})
