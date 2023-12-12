import { auth } from '@/services/authSettings'
import { getAccessToken } from '@/services/useAccessToken'
import type { UserIdResolvable } from '@twurple/api'
import {
  getTokenInfo,
  type AccessToken,
  type AccessTokenMaybeWithUserId,
  type AccessTokenWithUserId,
  type AuthProvider,
} from '@twurple/auth'
import { rawDataSymbol } from '@twurple/common'

export class TwitchAuthentication implements AuthProvider {
  private readonly _clientId: string = auth.twitch.clientId
  private readonly _scopes: string[] = auth.twitch.scopes
  private readonly _accessToken: AccessToken
  private _key: string

  constructor(accessToken: string = '', key: string = '') {
    this._accessToken = {
      accessToken,
      refreshToken: null,
      scope: this._scopes,
      expiresIn: null,
      obtainmentTimestamp: Date.now(),
    }
    this._key = key
  }

  setAccessToken(accessToken: string = '') {
    if (accessToken && !this._accessToken.accessToken) {
      this._accessToken.accessToken = accessToken
    }
  }

  setKey(key: string = '') {
    if (key && !this._key) {
      this._key = key
    }
  }

  get clientId(): string {
    return this._clientId
  }

  getCurrentScopesForUser(): string[] {
    return this._scopes
  }

  async getAccessTokenForUser(
    _user: UserIdResolvable,
    ...scopeSets: (string[] | undefined)[]
  ): Promise<AccessTokenWithUserId | null> {
    return this._getAccessToken(scopeSets)
  }

  async getAnyAccessToken(): Promise<AccessTokenMaybeWithUserId> {
    return this._getAccessToken()
  }

  async refreshAccessTokenForUser(): Promise<AccessTokenWithUserId> {
    console.info('Refreshing authorization...')

    const accessToken = await getAccessToken('twitch', this._key)
    this._accessToken.accessToken = accessToken
    this._accessToken.obtainmentTimestamp = Date.now()

    console.info('Reauthorized!')

    return this._getAccessToken()
  }

  private async _getAccessToken(
    requestedScopeSets?: Array<string[] | undefined>,
  ): Promise<AccessTokenWithUserId> {
    try {
      this._checkScopes(requestedScopeSets)

      const {
        [rawDataSymbol]: { expires_in: expiresIn },
        userId,
      } = await getTokenInfo(this._accessToken.accessToken, this._clientId)

      this._accessToken.expiresIn = expiresIn || null

      return {
        ...this._accessToken,
        userId: userId!,
      }
    } catch {
      return await this.refreshAccessTokenForUser()
    }
  }

  private _checkScopes(requestedScopeSets?: Array<string[] | undefined>): void {
    if (requestedScopeSets?.length) {
      const scopes = new Set<string>(this._scopes)

      requestedScopeSets.forEach(requestedScopes => {
        if (!requestedScopes || !requestedScopes.length) return

        if (requestedScopes.every(scope => !scopes.has(scope))) {
          throw new MissingScopesError(requestedScopes)
        }
      })
    }
  }
}

class MissingScopesError extends Error {
  constructor(requestedScopes: string[]) {
    const message = `This token does not have one of the requested scopes: [${requestedScopes.join(
      ', ',
    )}]`
    super(message)
    this.name = 'MissingScopesError'
  }
}
