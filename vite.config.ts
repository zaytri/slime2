import { type PluginOption, defineConfig, createLogger } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { version } from './package.json'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fileSystem from 'fs/promises'
import { resolve } from 'path'

const logger = createLogger()
const originalWarning = logger.warn

logger.warn = (message, options) => {
  const uselessWarningMessage =
    'files in the public directory are served at the root path.'

  if (message.includes(uselessWarningMessage)) return

  originalWarning(message, options)
}

const assetFileNames = 'slime2[extname]'
const entryFileNames = 'slime2.js'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let publicRoot = 'client'
  let publicDir = publicRoot
  let theme = 'base'
  let entry = `${publicDir}/${theme}.html`
  let outDir = 'release'

  theme = mode.startsWith('theme.') ? mode.split('.')[1] : theme

  if (theme !== 'base') {
    publicRoot = 'themes'
    publicDir = `${publicRoot}/${theme}`
    entry = `${publicDir}/${theme}.html`
    outDir = `themes/release-${theme}`
  }

  const transformIndexPlugin: PluginOption = {
    name: 'slime2-transform-index',
    transformIndexHtml: html => {
      return html.replaceAll('{version}', version).replaceAll('{theme}', theme)
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
      await fileSystem.rm(resolve(__dirname, `${outDir}/${publicRoot}`), {
        recursive: true,
      })

      if (theme !== 'base') {
        await fileSystem.rm(resolve(__dirname, `${outDir}/slime2.css`))
        await fileSystem.rm(resolve(__dirname, `${outDir}/slime2.js`))
      }
    },
  }

  const removeBuildInDevPlugin: PluginOption = {
    name: 'slime2-remove-build-in-dev',
    apply: 'serve',
    configureServer: async () => {
      const buildFolder = resolve(__dirname, outDir)
      const buildFolderExists = await fileSystem
        .access(buildFolder)
        .then(_ => true)
        .catch(_ => false)

      if (buildFolderExists) {
        await fileSystem.rm(buildFolder, { recursive: true })
      }
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
