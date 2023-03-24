import axios from 'axios'

const pronounsInstance = axios.create({
  baseURL: 'https://pronouns.alejo.io/api',
})

const EXPIRE_TIME = 1000 * 60 * 5 // 5 minutes

export default class Pronouns {
  private cache = new Map<string, CachedPronouns>()
  private pronounsMap: Map<string, string> | null = null

  static async create() {
    const instance = new Pronouns()
    await instance.load()
    return instance
  }

  async get(userName: string) {
    // check if pronouns map failed to be fetched
    if (!this.pronounsMap) return null

    let cachedData = this.cache.get(userName)

    if (!cachedData || cachedData.expire < Date.now()) {
      const id = await getPronouns(userName)
      cachedData = {
        id,
        expire: Date.now() + EXPIRE_TIME,
      }
      this.cache.set(userName, cachedData)
    }

    const { id } = cachedData
    if (!id) return null // user hasn't set any pronouns

    return this.pronounsMap.get(id) ?? null
  }

  private constructor() {}

  private async load() {
    this.pronounsMap = await getAllPronouns()
  }
}

async function getAllPronouns() {
  const pronounsMap = new Map<string, string>()

  const allPronouns = await get<PronounsData[]>('/pronouns')
  if (!allPronouns) return null // if Alejo's server is down

  allPronouns.forEach(({ name, display }) => {
    pronounsMap.set(name, display)
  })

  return pronounsMap
}

async function getPronouns(userName: string) {
  const users = await get<User[]>(`/users/${userName}`)
  if (!users) return null // if Alejo's server is down

  const [user] = users
  if (!user) return null // user hasn't set pronouns

  return user.pronoun_id
}

async function get<T>(url: string) {
  return await pronounsInstance
    .get<T>(url)
    .then(response => response.data)
    .catch(error => null)
}

type PronounsData = {
  name: string
  display: string
}

type CachedPronouns = {
  id: string | null
  expire: number
}

type User = {
  id: string
  login: string // username
  pronoun_id: string // maps to name in Pronouns
}
