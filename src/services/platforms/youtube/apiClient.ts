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

  async channel() {
    const response = await this._get<ChannelResponse>('channels', {
      params: {
        mine: true,
        part: ['id', 'snippet'],
      },
    })

    console.log(response)

    return response.data
  }
}

type ChannelResponse = {
  kind: 'youtube#channelListResponse'
  etag: string
  nextPageToken: string
  prevPageToken: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: ChannelResponseItem[]
}

type ChannelResponseItem = {
  kind: 'youtube#channel'
  etag: string
  id: string
  snippet: {
    title: string
    description: string
    customUrl: string
    publishedAt: string
    thumbnails: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }
    defaultLanguage: string
    localized: {
      title: string
      description: string
    }
    country: string
  }
}

type Thumbnail = {
  url: string
  width: number
  height: number
}
