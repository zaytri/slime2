import useAccessToken from '@/services/useAccessToken'
import useTwitchApi from '@/services/platforms/twitch/useApi'
import { infiniteCache } from '@/services/settings'
import { useQuery } from '@tanstack/react-query'
import { getTokenInfo } from '@twurple/auth'
import settings from '@/services/settings'

export default function useTwitchBroadcaster() {
  const { data: accessToken } = useAccessToken('twitch')
  const api = useTwitchApi()

  return useQuery<Slime2.User.Broadcaster>({
    enabled: !!accessToken,
    queryKey: ['twitch', 'broadcaster', accessToken!],
    queryFn: async () => {
      const { clientId } = settings.twitch
      const { userId } = await getTokenInfo(accessToken!, clientId)
      if (!userId) throw Error('Twitch broadcaster not found')

      const user = await api.users.getUserById(userId)
      if (!user) throw Error('Twitch broadcaster not found')

      return {
        id: user.id,
        userName: user.name,
        displayName: user.displayName,
        image: user.profilePictureUrl,
        url: `https://www.twitch.tv/${user.name}`,
      }
    },
    ...infiniteCache,
  })
}
