declare var slime2key_twitch: string | undefined
declare var slime2key_google: string | undefined
declare var slime2: {
  onEvent: (setFunction: Slime2.Client.OnEvent) => void
  onModMessageDelete: (setFunction: Slime2.Client.OnModMessageDelete) => void
  setKey: (provider: Slime2.AuthProvider, key: string) => void
  storage: {
    get: <T = any>(key: string) => Promise<T | undefined>
    getMany: <T = any>(keys: string[]) => Promise<T[]>
    set: (key: string, value: any) => Promise<void>
    setMany: (entries: [string, any][]) => Promise<void>
    update: <T = any>(
      key: string,
      updater: (oldValue: T | undefined) => T,
    ) => Promise<void>
    del: (key: string) => Promise<void>
    delMany: (keys: string[]) => Promise<void>
    clear: () => Promise<void>
    keys: () => Promise<string[]>
    values: <T = any>() => Promise<T[]>
    entries: <T = any>() => Promise<[string, T][]>
  }
}
