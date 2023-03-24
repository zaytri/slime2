import type JQuery from 'jquery'

import type { TwitchMessage } from './Twitch/types'

declare global {
  var slimeChat: {
    token?: string
    render: (data?: {
      message: TwitchMessage
      deleteMessage: () => void
    }) =>
      | [(DocumentFragment | JQuery<DocumentFragment>)?, AfterRenderCallback?]
      | null
      | void
      | undefined
    ready: (data?: { test: (message: TwitchMessage) => void }) => void
  }

  namespace JSX {
    interface IntrinsicElements {
      ['slime-chat']: CustomElement
      ['slime-chat-message-list']: CustomElement
      ['slime-chat-message']: CustomElement
    }
  }
}

type CustomElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>

type AfterRenderCallback = (div: HTMLElement) => void

export { AfterRenderCallback }
