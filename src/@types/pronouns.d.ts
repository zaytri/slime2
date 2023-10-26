namespace Pronouns {
  type User = {
    id: string // Twitch ID
    login: string // Twitch username
    pronoun_id: string // maps to name in Data
  }

  type Data = {
    name: string // pronouns ID
    display: string // pronouns display (for example: 'She/Her')
  }
}
