declare var slime2: {
  // event handler
  onEvent: (setFunction: Slime2.Client.OnEvent) => void

  // settings
  setKey: (provider: Slime2.Auth.Provider, key: string) => void
  setMaxEvents: (maxEvents: number) => void
  setEventDelay: (delay: number) => void
  setEventExpiration: (
    expiration: number,
    options?: Slime2.Client.EventExpirationOptions,
  ) => void

  // widget settings
  widget: {
    loadPlatform: (
      platform: Slime2.Platform | Slime2.Platform[],
    ) => Promise<boolean>
    loadSettings: (
      dataFileName: string,
      settings: Widget.Setting[],
    ) => Promise<void>
    setData: (values: Widget.ValueGroup) => void
    getData: (
      groupId?: Widget.Setting.GroupId,
      id?: string,
    ) => Widget.ValueGroup | Widget.ValueGroup['key'] | null
  }

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
