import type { HelixCustomReward } from '@twurple/api'
import type {
  ChatAnnouncementInfo,
  ChatBitsBadgeUpgradeInfo,
  ChatCommunityPayForwardInfo,
  ChatCommunitySubInfo,
  ChatPrimeCommunityGiftInfo,
  ChatRaidInfo,
  ChatRewardGiftInfo,
  ChatStandardPayForwardInfo,
  ChatSubExtendInfo,
  ChatSubGiftInfo,
  ChatSubGiftUpgradeInfo,
  ChatSubInfo,
  ChatSubUpgradeInfo,
} from '@twurple/chat'

import type { Badge } from './helpers/BadgeImages'

export type User = {
  // identifiers
  id: string
  userName: string
  displayName: string
  pronouns: string | null

  // cosmetics
  badges: Badge[]
  color?: string

  // roles
  roles: {
    broadcaster: boolean
    moderator: boolean
    artist: boolean
    vip: boolean
    founder: boolean
    subscriber: boolean
    follower: Date | false
  }
}

export type TwitchMessage = TwitchMessageType & Message

export type TwitchPart = PartType & Part

// types used for TwitchMessage

export type Message = {
  id: string
  first: boolean
  date: Date

  user: User

  text: string
  parts: TwitchPart[]

  tags: Map<string, string>
  randomSeed: number
}

// every relevant TwitchMessage variation in twurple

export type TwitchMessageType =
  | { type: 'action' }
  | { type: 'default' }
  | { type: 'highlight' }
  | { type: 'cheer'; typeInfo: CheerInfo }
  | { type: 'redemption'; typeInfo: HelixCustomReward }
  | { type: 'reply'; typeInfo: ReplyInfo }
  | { type: 'announcement'; typeInfo: ChatAnnouncementInfo }
  | { type: 'bits-badge-upgrade'; typeInfo: ChatBitsBadgeUpgradeInfo }
  | { type: 'community-pay-forward'; typeInfo: ChatCommunityPayForwardInfo }
  | { type: 'community-sub'; typeInfo: ChatCommunitySubInfo }
  | { type: 'gift-paid-upgrade'; typeInfo: ChatSubGiftUpgradeInfo }
  | { type: 'prime-community-gift'; typeInfo: ChatPrimeCommunityGiftInfo }
  | { type: 'prime-paid-upgrade'; typeInfo: ChatSubUpgradeInfo }
  | { type: 'raid'; typeInfo: ChatRaidInfo }
  | { type: 'resub'; typeInfo: ChatSubInfo }
  | { type: 'reward-gift'; typeInfo: ChatRewardGiftInfo }
  | { type: 'standard-pay-forward'; typeInfo: ChatStandardPayForwardInfo }
  | { type: 'sub'; typeInfo: ChatSubInfo }
  | { type: 'sub-extend'; typeInfo: ChatSubExtendInfo }
  | { type: 'sub-gift'; typeInfo: ChatSubGiftInfo }

type CheerInfo = {
  bits: number
}

type ReplyInfo = {
  id: string // id of the message being replied to
  text: string // text of the message being replied to
  // info of the user being replied to
  user: {
    id: string
    userName: string
    displayName: string
  }
}

// types used for Part
type PartType =
  | { type: 'text' }
  | { type: 'cheer'; typeInfo: CheerPartInfo }
  | { type: 'emote'; typeInfo: EmotePartInfo }

type Part = { text: string }

type CheerPartInfo = {
  name: string
  amount: number
  color: string
  image: string
}

export type EmotePartInfo = {
  id: string
  name: string
  image: string
  source: 'twitch' | 'betterTTV' | 'frankerFaceZ' | 'slimeMote'
}
