import react from '@vitejs/plugin-react-swc'
import fileSystem from 'fs/promises'
import { resolve } from 'path'
import { createLogger, defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import tsconfigPaths from 'vite-tsconfig-paths'
import { version } from './package.json'

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
  let publicRoot = 'widgets'
  let widget = 'simple-chat'
  let outDir = 'release'

  const widgetMode = ['debug', 'production', 'development'].every(
    devMode => devMode !== mode,
  )

  if (widgetMode) {
    if (mode.endsWith('/private')) {
      widget = mode.split('/')[0]
      publicRoot = 'widgets-private'
    } else {
      widget = mode
    }

    outDir = `${publicRoot}/release-${widget}`
  }

  const publicDir = `${publicRoot}/${widget}`
  const entry = `${publicDir}/${widget}.html`

  const plugins = [react(), tsconfigPaths()]

  plugins.push({
    name: 'slime2-transform-index',
    transformIndexHtml: html => {
      return html
        .replaceAll('{version}', version)
        .replaceAll('{widget}', widget)
    },
  })

  // widget build
  if (command === 'build' && widgetMode) {
    // copy and replace html file
    plugins.push(
      viteStaticCopy({
        targets: [
          {
            src: `${outDir}/${entry}`,
            dest: '.',
          },
        ],
      }),
    )
  }

  plugins.push({
    name: 'slime2-clean-build',

    closeBundle: async () => {
      // delete unnecessary folder
      await fileSystem.rm(buildPath(outDir, publicRoot), {
        recursive: true,
      })

      if (!widgetMode) return

      // remove slime2 files and keys from widget build
      await Promise.all([
        ...['slime2.css', 'slime2.js'].map(file => {
          return fileSystem.unlink(buildPath(outDir, file))
        }),
        ...['twitch', 'google'].map(provider => {
          return fileSystem
            .unlink(buildPath(outDir, `slime2key_${provider}.js`))
            .catch(() => {}) // ignore error if file doesn't exist
        }),
      ])
    },
  })

  return {
    plugins,
    publicDir,
    base:
      command === 'build'
        ? `https://cdn.jsdelivr.net/gh/zaytri/slime2@${version}/release/`
        : '/',
    build: {
      outDir,
      copyPublicDir: widgetMode, // only copy when building widget
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

function buildPath(...paths: string[]): string {
  return resolve(__dirname, ...paths)
}
