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

export type OtherEmotes = Map<string, EmotePartInfo>

export type Broadcaster = {
  id: string
  userName: string
}

export type TwitchUser = {
  // identifiers
  id: string
  userName: string
  displayName: string
  pronouns?: string

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
    followDate?: Date
  }
}

export type TwitchMessage = TwitchMessageType & Message

export type TwitchPart = PartType & Part

// types used for TwitchMessage

export type Message = {
  id: string
  first: boolean
  date: Date

  user: TwitchUser

  text: string
  parts: TwitchPart[]

  tags: Map<string, string>
}

// every relevant TwitchMessage variation in twurple

export type TwitchMessageType =
  | { type: 'basic' }
  | { type: 'action' }
  | { type: 'highlight' }
  | { type: 'cheer'; cheer: CheerInfo }
  | { type: 'reply'; reply: ReplyInfo }
  | { type: 'redeem'; redeem: RedeemInfo }
  | { type: 'resub'; resub: ResubInfo }
  | { type: 'announcement'; announcement: AnnouncementInfo }

type AnnouncementInfo = {
  color: string // 'PRIMARY' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE'
}

type CheerInfo = {
  amount: number // total number of bits cheers in the message
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

type ResubInfo = {
  months: number
  tier: string // '1000' | '2000' | '3000' | 'Prime'
}

type RedeemInfo = {
  id: string
  name: string
  image: string
  color: string
  cost: number
}

// types used for Part
type PartType =
  | { type: 'text' }
  | { type: 'cheer'; cheer: CheerPartInfo }
  | { type: 'emote'; emote: EmotePartInfo }

type Part = { text: string }

type CheerPartInfo = {
  name: string
  amount: number
  color: string
  images: EmoteImages
}

export type EmotePartInfo = {
  id: string
  name: string
  images: EmoteImages
  source: 'twitch' | 'betterTTV' | 'frankerFaceZ' | 'slimeMote'
}

export type EmoteImages = {
  default: EmoteUrls
  static: EmoteUrls
}

export type EmoteUrls = {
  x1: string
  x2: string
  x4: string
}
