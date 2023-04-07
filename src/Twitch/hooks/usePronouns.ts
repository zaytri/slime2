import axios from 'axios'

const pronounsInstance = axios.create({
  baseURL: 'https://pronouns.alejo.io/api',
})

const PRONOUNS_CACHE_EXPIRE_TIME = 1000 * 60 * 5 // 5 minutes

const cache = new Map<string, CachedPronouns>()
const pronounsMap = new Map<string, string>()
let loaded = false

export default function usePronouns() {
  async function loadPronounsMap() {
    if (loaded) return // pronouns map already loaded

    const allPronouns = await getAllPronouns()
    if (!allPronouns) return // if Alejo's server is down

    allPronouns.forEach(({ name: prounounId, display: pronouns }) => {
      pronounsMap.set(prounounId, pronouns)
    })

    loaded = true
  }

  async function getPronouns(userName: string) {
    if (!loaded) return // pronouns map failed to load

    let cachedData = cache.get(userName)
    if (!cachedData || cachedData.expire < Date.now()) {
      const pronoundId = await getUserPronounId(userName)
      const pronouns = pronoundId ? pronounsMap.get(pronoundId) : undefined

      cachedData = { pronouns, expire: Date.now() + PRONOUNS_CACHE_EXPIRE_TIME }
      cache.set(userName, cachedData)
    }

    return cachedData.pronouns
  }

  return { loadPronounsMap, getPronouns }
}

async function getUserPronounId(userName: string) {
  const data = await get<User[]>(`/users/${userName}`)
  if (!data) return null // if Alejo's server is down

  const [user] = data
  if (!user) return null // user hasn't set pronouns

  return user.pronoun_id
}

async function getAllPronouns() {
  return get<PronounsData[]>('/pronouns')
}

async function get<T>(url: string) {
  return await pronounsInstance
    .get<T>(url)
    .then(response => response.data)
    .catch(error => null)
}

type PronounsData = {
  name: string // pronoun ID
  display: string // pronouns
}

type CachedPronouns = {
  pronouns?: string
  expire: number
}

type User = {
  id: string
  login: string // username
  pronoun_id: string // maps to name in Pronouns
}
