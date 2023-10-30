import useTwitchApi from '@/services/platforms/twitch/useApi'
import { auth, infiniteCache } from '@/services/settings'
import useAccessToken from '@/services/useAccessToken'
import { useQuery } from '@tanstack/react-query'
import { getTokenInfo } from '@twurple/auth'

export default function useTwitchBroadcaster() {
  const { data: accessToken } = useAccessToken('twitch')
  const api = useTwitchApi()

  return useQuery<Slime2.User.Broadcaster>({
    enabled: !!accessToken,
    queryKey: ['twitch', 'broadcaster', accessToken || null],
    queryFn: async () => {
      const { clientId } = auth.twitch
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
