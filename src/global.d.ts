import type JQuery from 'jquery'

import type { TwitchMessage } from './Twitch/types'

declare global {
  var slime2Login: {
    twitch?: {
      chat?: string
    }
  }

  var slime2Chat: {
    onMessage: (data?: {
      message: TwitchMessage
      deleteMessage: () => void
    }) =>
      | [(DocumentFragment | JQuery<DocumentFragment>)?, AfterRenderCallback?]
      | null
      | void
      | undefined

    onDelete: (deleteMessage: DeleteMessage) => void

    ready: (data?: { test: (message: TwitchMessage) => void }) => void
  }

  var slime2Setup: {
    permissions: string[]
  }
}

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

type AfterRenderCallback = (div: HTMLElement) => void

type DeleteMessage =
  | { type: 'one'; id: string }
  | { type: 'user'; id: string }
  | { type: 'all' }

export { AfterRenderCallback }
