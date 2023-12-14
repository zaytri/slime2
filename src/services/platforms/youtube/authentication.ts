import { getAccessToken } from '@/services/useAccessToken'

export class GoogleAuthentication {
  private _key: string
  private _accessToken: string

  constructor(accessToken: string = '', key: string = '') {
    this._accessToken = accessToken
    this._key = key
  }

  setAccessToken(accessToken: string = '') {
    if (accessToken && !this._accessToken) {
      this._accessToken = accessToken
    }
  }

  setKey(key: string = '') {
    if (key && !this._key) {
      this._key = key
    }
  }

  getAccessToken(): string {
    return this._accessToken
  }

  async refreshAccessToken(): Promise<string> {
    const accessToken = await getAccessToken('google', this._key)
    this._accessToken = accessToken
    return this.getAccessToken()
  }
}
