declare var slime2: {
  // event handler
  onEvent: (setFunction: Slime2.Client.OnEvent) => void

  // settings
  setMaxEvents: (maxEvents: number) => void
  setEventDelay: (delay: number) => void
  setEventExpiration: (
    expiration: number,
    options?: Slime2.Client.EventExpirationOptions,
  ) => void
  setKey: (provider: Slime2.AuthProvider, key: string) => void

  // helpers
  storage: {
    permanent: Slime2.Client.Storage
    temporary: Map<string, any>
  }
  color: Slime2.Client.Color
  random: {
    number: (min: number, max: number) => number
    integer: (min: number, max: number) => number
    percent: (percentage: number) => boolean
    boolean: () => boolean
    index: (array: Array<any>) => number
    item: <T>(array: Array<T>) => T
  }
  cloneTemplate: (id: string) => DocumentFragment
}

// https://github.com/microsoft/TypeScript/issues/54451
type MappedOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]
}
