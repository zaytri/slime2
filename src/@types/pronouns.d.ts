namespace Pronouns {
  type User = {
    channel_id: string // Twitch ID
    channel_login: string // Twitch username
    pronoun_id: string // maps to id in All
    alt_pronoun_id: string | null // maps to id in All, can be null
  }

  type Data = {
    name: string // pronouns ID
    subject: string // for "She/Her", this is "She"
    object: string // for "She/Her", this is "Her"
    /**
     * if this is true,
     * and the user has this as their pronoun_id,
     * and has no alt_pronoun_id,
     * then only display the subject (for example "Any" instead of "Any/Any")
     */
    singular: boolean
  }

  type All = {
    [id: string]: Data // id = name
  }
}
