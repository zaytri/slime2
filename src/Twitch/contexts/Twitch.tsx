import React, { createContext, useContext } from 'react'

import type { HelixCheermoteList } from '@twurple/api'
import type { Broadcaster, OtherEmotes } from '../types'
import type BadgeImages from '../helpers/BadgeImages'
import type ChannelRewards from '../helpers/ChannelRewards'

const BroadcasterContext = createContext<Broadcaster | null>(null)
const RewardsContext = createContext<ChannelRewards | null>(null)
const CheermotesContext = createContext<HelixCheermoteList | null>(null)
const BadgeImagesContext = createContext<BadgeImages | null>(null)
const OtherEmotesContext = createContext<OtherEmotes | null>(null)

type TwitchProviderProps = {
  broadcaster: Broadcaster
  rewards: ChannelRewards
  cheermotes: HelixCheermoteList
  badgeImages: BadgeImages
  otherEmotes: OtherEmotes
}

export function TwitchProvider({
  broadcaster,
  rewards,
  cheermotes,
  badgeImages,
  otherEmotes,
  children,
}: React.PropsWithChildren<TwitchProviderProps>) {
  return (
    <BroadcasterContext.Provider value={broadcaster}>
      <CheermotesContext.Provider value={cheermotes}>
        <BadgeImagesContext.Provider value={badgeImages}>
          <OtherEmotesContext.Provider value={otherEmotes}>
            <RewardsContext.Provider value={rewards}>
              {children}
            </RewardsContext.Provider>
          </OtherEmotesContext.Provider>
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

export function useOtherEmotes() {
  return useContext(OtherEmotesContext)
}
