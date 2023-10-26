declare var slime2key_twitch: string | undefined
declare var slime2key_google: string | undefined
declare var slime2: {
  onEvent: (setFunction: Slime2.Client.OnEvent) => void
  onModMessageDelete: (setFunction: Slime2.Client.OnModMessageDelete) => void
}
