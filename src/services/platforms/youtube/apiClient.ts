import axios, { type AxiosResponse } from 'axios'
import { GoogleAuthentication } from './authentication'

export class ApiClient {
  private readonly _authProvider
  private readonly _apiInstance

  constructor(authProvider: GoogleAuthentication) {
    this._authProvider = authProvider
    this._apiInstance = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3/',
      headers: {
        Accept: 'application/json',
      },
      paramsSerializer: {
        indexes: null,
      },
    })

    this._apiInstance.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${this._authProvider.getAccessToken()}`
      return config
    })
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  private async _get<T = any, R = AxiosResponse<T>, D = any>(
    ...parameters: Parameters<typeof axios.get<T, R, D>>
  ): ReturnType<typeof axios.get<T, R, D>> {
    return this._apiInstance.get<T, R, D>(...parameters).catch(async error => {
      if (error.response && error.response.status === 401) {
        await this._authProvider.refreshAccessToken()
        return this._apiInstance.get<T, R, D>(...parameters)
      }

      throw error
    })
  }

  async channel(): Promise<Youtube.API.ChannelListResponse> {
    const response = await this._get<Youtube.API.ChannelListResponse>(
      'channels',
      {
        params: {
          mine: true,
          part: ['id', 'snippet'],
        },
      },
    )

    return response.data
  }

  async broadcast(): Promise<Youtube.API.LiveBroadcastListResponse> {
    const response = await this._get<Youtube.API.LiveBroadcastListResponse>(
      'liveBroadcasts',
      {
        params: {
          mine: true,
          part: ['id', 'snippet', 'status'],
          maxResults: 1,
        },
      },
    )

    return response.data
  }

  async chat(
    liveChatId: string,
    pageToken?: string,
  ): Promise<Youtube.API.LiveChatMessageListResponse> {
    const params = { liveChatId, part: ['id', 'snippet', 'authorDetails'] }

    const response = await this._get<Youtube.API.LiveChatMessageListResponse>(
      'liveChat/messages',
      { params: pageToken ? { ...params, pageToken } : params },
    )

    return response.data
  }
}
