import { type PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { version } from './package.json'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { rm } from 'fs/promises'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let entry = 'base.html'
  let publicDir = 'client'
  let outDir = 'release'

  const plugins: PluginOption[] = [
    react(),
    {
      name: 'slime2-index-transform',
      transformIndexHtml: html => {
        return html.replaceAll('{version}', version)
      },
    },
  ]

  const theme = mode.startsWith('theme.') ? mode.split('.')[1] : undefined
  if (theme) {
    entry = `./themes/${theme}/${theme}.html`
    publicDir = `themes/${theme}`
    outDir = 'release-theme'

    plugins.push(
      viteStaticCopy({
        targets: [
          {
            src: `release-theme/themes/${theme}/${theme}.html`,
            dest: '.',
          },
        ],
      }),
    )

    plugins.push({
      name: 'slime2-clean-theme-build',
      closeBundle: async () => {
        await rm(resolve(__dirname, 'release-theme/themes'), {
          recursive: true,
        })
      },
    })
  }

  return {
    plugins,
    publicDir,
    base:
      command === 'build'
        ? `https://cdn.jsdelivr.net/gh/zaytri/slime2@${version}/release/`
        : '/',
    build: {
      outDir,
      assetsDir: '.',
      rollupOptions: {
        input: {
          app: entry,
        },
        output: {
          assetFileNames: 'slime2[extname]',
          entryFileNames: 'slime2.js',
        },
      },
    },
    server: {
      open: entry,
    },
  }
})
