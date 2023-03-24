import { useEffect, useState } from 'react'
import { getTokenInfo } from '@twurple/auth'

import type { HelixCheermoteList } from '@twurple/api'

import BadgeImages from './helpers/BadgeImages'
import ChannelRewards from './helpers/ChannelRewards'
import { CLIENT_ID, ACCESS_TOKEN, apiClient } from './helpers/authentication'
import ChatHandler from './ChatHandler'
import { MessageListProvider } from './Context'
import Pronouns from './helpers/Pronouns'
import BetterTTV from './helpers/BetterTTV'
import FrankerFaceZ from './helpers/FrankerFaceZ'

import type { EmotePartInfo } from './types'
import InvalidToken from '../components/InvalidToken'
import Loading from '../components/Loading'
import Connected from '../components/Connected'

export default function Twitch() {
  const [isTokenValid, setIsTokenValid] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const [badgeImages, setBadgeImages] = useState<BadgeImages>()
  const [channelRewards, setChannelRewards] = useState<ChannelRewards>()
  const [cheermoteList, setCheermoteList] = useState<HelixCheermoteList>()
  const [broadcasterUserName, setBroadcasterUserName] = useState('')
  const [broadcasterUserId, setBroadcasterUserId] = useState('')
  const [pronouns, setPronouns] = useState<Pronouns>()
  const [emotes, setEmotes] = useState<Map<string, EmotePartInfo>>()

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
      setBroadcasterUserId(userId!)
      setBroadcasterUserName(userName!)

      // get Twitch API and 3rd party data asynchronously
      const [
        channelBadgeData,
        globalBadgeData,
        rewardData,
        cheermoteData,
        pronounsInstance,
        bttvEmotes,
        ffzEmotes,
      ] = await Promise.all([
        apiClient.chat.getChannelBadges(userId!),
        apiClient.chat.getGlobalBadges(),
        apiClient.channelPoints.getCustomRewards(userId!),
        apiClient.bits.getCheermotes(userId!),
        Pronouns.create(),
        BetterTTV.getEmotes('twitch', userId!),
        FrankerFaceZ.getEmotes('twitch', userId!),
      ])

      setBadgeImages(new BadgeImages(globalBadgeData, channelBadgeData))
      setChannelRewards(new ChannelRewards(rewardData))
      setCheermoteList(cheermoteData)
      setPronouns(pronounsInstance)

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
      setEmotes(emoteMap)

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
      <MessageListProvider>
        <ChatHandler
          broadcasterUserName={broadcasterUserName}
          broadcasterUserId={broadcasterUserId}
          channelRewards={channelRewards!}
          cheermoteList={cheermoteList!}
          badgeImages={badgeImages!}
          pronouns={pronouns!}
          emotes={emotes!}
        />
      </MessageListProvider>
    </>
  )
}
