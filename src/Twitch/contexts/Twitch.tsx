import React, { createContext, useContext } from 'react'

import type { HelixCheermoteList } from '@twurple/api'
import type { Broadcaster, OtherEmotes } from '../types'
import type BadgeImages from '../helpers/BadgeImages'
import type ChannelRewards from '../helpers/ChannelRewards'
import type Pronouns from '../helpers/Pronouns'

const BroadcasterContext = createContext<Broadcaster | null>(null)
const RewardsContext = createContext<ChannelRewards | null>(null)
const CheermotesContext = createContext<HelixCheermoteList | null>(null)
const BadgeImagesContext = createContext<BadgeImages | null>(null)
const PronounsContext = createContext<Pronouns | null>(null)
const OtherEmotesContext = createContext<OtherEmotes | null>(null)

type TwitchProviderProps = {
  broadcaster: Broadcaster
  rewards: ChannelRewards
  cheermotes: HelixCheermoteList
  badgeImages: BadgeImages
  pronouns: Pronouns
  otherEmotes: OtherEmotes
}

export function TwitchProvider({
  broadcaster,
  rewards,
  cheermotes,
  badgeImages,
  pronouns,
  otherEmotes,
  children,
}: React.PropsWithChildren<TwitchProviderProps>) {
  return (
    <BroadcasterContext.Provider value={broadcaster}>
      <CheermotesContext.Provider value={cheermotes}>
        <BadgeImagesContext.Provider value={badgeImages}>
          <PronounsContext.Provider value={pronouns}>
            <OtherEmotesContext.Provider value={otherEmotes}>
              <RewardsContext.Provider value={rewards}>
                {children}
              </RewardsContext.Provider>
            </OtherEmotesContext.Provider>
          </PronounsContext.Provider>
        </BadgeImagesContext.Provider>
      </CheermotesContext.Provider>
    </BroadcasterContext.Provider>
  )
}

export function useBroadcaster() {
  return useContext(BroadcasterContext)
}

export function useRewards() {
  return useContext(RewardsContext)
}

export function useCheermotes() {
  return useContext(CheermotesContext)
}

export function useBadgeImages() {
  return useContext(BadgeImagesContext)
}

export function usePronouns() {
  return useContext(PronounsContext)
}

export function useOtherEmotes() {
  return useContext(OtherEmotesContext)
}
