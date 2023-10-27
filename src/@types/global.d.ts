declare var slime2: {
  onEvent: (setFunction: Slime2.Client.OnEvent) => void
  onModMessageDelete: (setFunction: Slime2.Client.OnModMessageDelete) => void
  setKey: (provider: Slime2.AuthProvider, key: string) => void
  storage: Slime2.Client.Storage
}
