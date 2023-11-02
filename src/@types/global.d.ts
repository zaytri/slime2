declare var slime2: {
  // event handler
  onEvent: (setFunction: Slime2.Client.OnEvent) => void

  // settings
  setKey: (provider: Slime2.AuthProvider, key: string) => void
  setPlatform: (platform: Slime2.Platform | Slime2.Platform[]) => void
  setMaxEvents: (maxEvents: number) => void
  setEventDelay: (delay: number) => void
  setEventExpiration: (
    expiration: number,
    options?: Slime2.Client.EventExpirationOptions,
  ) => void
  setWidgetSettingsPage: (fragment: Slime2.Client.Fragment) => void

  // helpers
  storage: Slime2.Client.Storage
  color: Slime2.Client.Color
  random: {
    number: (min: number, max: number) => number
    integer: (min: number, max: number) => number
    boolean: () => boolean
    chance: (percentage: number) => boolean
    index: (array: Array<any>) => number
    item: <T>(array: Array<T>) => T
  }
  cloneTemplate: (id: string) => DocumentFragment
}

// https://github.com/microsoft/TypeScript/issues/54451
type MappedOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
