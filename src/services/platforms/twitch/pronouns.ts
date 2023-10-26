import axios from 'axios'

export const PRONOUNS_CACHE_EXPIRE_TIME = 1000 * 60 * 5 // 5 minutes

const pronounsApi = axios.create({
  baseURL: 'https://pronouns.alejo.io/api',
})

export async function getUserPronouns(
  userName: string,
): Promise<string | undefined> {
  const data = await pronounsApi
    .get<Pronouns.User[]>(`/users/${userName}`)
    .then(response => response.data)
    .catch(() => undefined)

  if (!data) return undefined // if Alejo's server is down

  // pronouns API returns either
  // an array that contains a single User
  // or an empty array if that user hasn't set pronouns
  const [user] = data
  if (!user) return undefined // no pronouns set

  return user.pronoun_id
}

export async function getAllPronouns(): Promise<Map<string, string>> {
  const pronounsMap = new Map<string, string>()

  const allPronouns = await pronounsApi
    .get<Pronouns.Data[]>('/pronouns')
    .then(response => response.data)

  allPronouns.forEach(({ name, display }) => {
    pronounsMap.set(name, display)
  })

  return pronounsMap
}
