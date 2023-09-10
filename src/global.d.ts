import type JQuery from 'jquery'

import type { TwitchMessage } from './Twitch/types'

declare global {
  var slime2Tokens: {
    twitch?: string
  }

  var slime2Chat: {
    onMessage: (data?: {
      message: TwitchMessage
      deleteMessage: () => void
    }) => [Fragment?, AfterRenderCallback?] | null | void | undefined

    onModDelete: (deleteMessage: DeleteMessage) => void

    ready: (data?: { test: (message: TwitchMessage) => void }) => void
  }

  var slime2Setup: {
    permissions: string[]
  }
}

type Fragment = DocumentFragment | JQuery<DocumentFragment>

type AfterRenderCallback = (div: HTMLElement) => void

type DeleteMessage =
  | { type: 'single'; id: string }
  | { type: 'user'; id: string }
  | { type: 'all'; id: null }

export { AfterRenderCallback }
