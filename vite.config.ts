import { type PluginOption, defineConfig, createLogger } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { version } from './package.json'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { rm } from 'fs/promises'
import { resolve } from 'path'

const logger = createLogger()
const originalWarning = logger.warn

logger.warn = (message, options) => {
  const uselessWarningMessage =
    'files in the public directory are served at the root path.'

  if (message.includes(uselessWarningMessage)) return

  originalWarning(message, options)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let publicRoot = 'client'
  let publicDir = publicRoot
  let entry = `${publicDir}/base.html`
  let outDir = 'release'
  let assetFileNames = 'slime2[extname]'
  let entryFileNames = 'slime2.js'

  const theme = mode.startsWith('theme.') ? mode.split('.')[1] : undefined

  if (theme) {
    publicRoot = 'themes'
    publicDir = `${publicRoot}/${theme}`
    entry = `${publicDir}/${theme}.html`
    outDir = `release-theme-${theme}`
    assetFileNames = `${publicDir}/discard[extname]`
    entryFileNames = `${publicDir}/discard.js`
  }

  const transformIndexPlugin: PluginOption = {
    name: 'slime2-transform-index',
    transformIndexHtml: html => {
      return html.replaceAll('{version}', version)
    },
  }

  const staticCopyPlugin: PluginOption = viteStaticCopy({
    targets: [
      {
        src: `${outDir}/${entry}`,
        dest: '.',
      },
    ],
  })

  const cleanBuildPlugin: PluginOption = {
    name: 'slime2-clean-build',
    closeBundle: async () => {
      await rm(resolve(__dirname, `${outDir}/${publicRoot}`), {
        recursive: true,
      })
    },
  }

  const removeBuildInDevPlugin: PluginOption = {
    name: 'slime2-remove-build-in-dev',
    apply: 'serve',
    configureServer: async () => {
      await rm(resolve(__dirname, outDir), { recursive: true })
    },
  }

  return {
    plugins: [
      react(),
      transformIndexPlugin,
      staticCopyPlugin,
      cleanBuildPlugin,
      removeBuildInDevPlugin,
    ],
    publicDir,
    base:
      command === 'build'
        ? `https://cdn.jsdelivr.net/gh/zaytri/slime2@${version}/release/`
        : '/',
    build: {
      outDir,
      rollupOptions: {
        input: {
          app: entry,
        },
        output: {
          assetFileNames,
          entryFileNames,
        },
      },
    },
    customLogger: logger,
    server: {
      open: entry,
    },
  }
})
