interface ImportMetaEnv {
  readonly VITE_TWITCH_KEY?: string
  readonly VITE_GOOGLE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
