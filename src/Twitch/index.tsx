import { useEffect, useState } from 'react'
import { getTokenInfo } from '@twurple/auth'
import { MessageListProvider } from './contexts/MessageList'
import { TwitchProvider } from './contexts/Twitch'
import ChatHandler from './ChatHandler'
import { CLIENT_ID, ACCESS_TOKEN, apiClient } from './helpers/authentication'
import BadgeImages from './helpers/BadgeImages'
import ChannelRewards from './helpers/ChannelRewards'
import BetterTTV from './helpers/BetterTTV'
import FrankerFaceZ from './helpers/FrankerFaceZ'
import InvalidToken from '../components/InvalidToken'
import Loading from '../components/Loading'
import Connected from '../components/Connected'
import usePronouns from './hooks/usePronouns'

import type { HelixCheermoteList } from '@twurple/api'
import type { Broadcaster, EmotePartInfo, OtherEmotes } from './types'

export default function Twitch() {
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [badgeImages, setBadgeImages] = useState<BadgeImages>()
  const [channelRewards, setChannelRewards] = useState<ChannelRewards>()
  const [cheermoteList, setCheermoteList] = useState<HelixCheermoteList>()
  const [broadcaster, setBroadcaster] = useState<Broadcaster>()
  const [otherEmotes, setOtherEmotes] = useState<OtherEmotes>()

  const { loadPronounsMap } = usePronouns()

  useEffect(() => {
    async function load() {
      // check if the token is valid
      const tokenInfo = await getTokenInfo(ACCESS_TOKEN, CLIENT_ID).catch(
        _ => null,
      )
      if (!tokenInfo) {
        setIsTokenValid(false)
        return
      }

      // get user ID and username from token
      const { userId, userName } = tokenInfo
      const user: Broadcaster = {
        id: userId!,
        userName: userName!,
      }
      setBroadcaster(user)

      // get Twitch API and 3rd party data asynchronously
      const [
        channelBadgeData,
        globalBadgeData,
        rewardData,
        cheermoteData,
        _voidPronouns,
        bttvEmotes,
        ffzEmotes,
      ] = await Promise.all([
        apiClient.chat.getChannelBadges(user.id),
        apiClient.chat.getGlobalBadges(),
        apiClient.channelPoints.getCustomRewards(user.id),
        apiClient.bits.getCheermotes(user.id),
        loadPronounsMap(),
        BetterTTV.getEmotes('twitch', user.id),
        FrankerFaceZ.getEmotes('twitch', user.id),
      ])

      setBadgeImages(new BadgeImages(globalBadgeData, channelBadgeData))
      setChannelRewards(new ChannelRewards(rewardData))
      setCheermoteList(cheermoteData)

      const emoteMap = new Map<string, EmotePartInfo>()
      if (bttvEmotes) {
        bttvEmotes.forEach((emote, name) => {
          emoteMap.set(name, emote)
        })
      }
      if (ffzEmotes) {
        // ffz emotes will override bttv emotes of the same name
        ffzEmotes.forEach((emote, name) => {
          emoteMap.set(name, emote)
        })
      }
      setOtherEmotes(emoteMap)

      // finished loading everything
      setLoaded(true)
    }

    load()
  }, [])

  if (!isTokenValid) {
    return <InvalidToken />
  }

  if (!loaded) {
    return <Loading />
  }

  return (
    <>
      <Connected />
      <TwitchProvider
        broadcaster={broadcaster!}
        rewards={channelRewards!}
        cheermotes={cheermoteList!}
        badgeImages={badgeImages!}
        otherEmotes={otherEmotes!}
      >
        <MessageListProvider>
          <ChatHandler />
        </MessageListProvider>
      </TwitchProvider>
    </>
  )
}
