import { useEffect, useState } from 'react'
import Banner from '.'

const avatarSize = 60
const providerLogoSize = 20

type SuccessBannerProps = {
  broadcaster: Slime2.User.Broadcaster
  platform: Slime2.Platform
  staticPosition?: boolean
}

export default function SuccessBanner({
  broadcaster,
  staticPosition,
  platform,
}: SuccessBannerProps) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHidden(true)
    }, 3.5 * 1000) // remove from DOM after 3.5 seconds
  }, [])

  if (hidden) return null

  return (
    <Banner
      status='success'
      staticPosition={staticPosition}
      className='slime2-banner-fade'
    >
      <div className='flex items-center justify-center'>
        Connected to
        <a href={broadcaster.url} target='_blank'>
          <div className='relative mx-3 inline-block'>
            <img
              src={broadcaster.image}
              alt='Your Profile Picture'
              width={avatarSize}
              height={avatarSize}
              className='inline rounded-full'
            />

            <img
              src={`https://slime2.stream/assets/${platform}-logo.svg`}
              height={providerLogoSize}
              width={providerLogoSize}
              alt='Stream Platform Logo'
              className='absolute -bottom-px -right-1'
            />
          </div>
        </a>
        {broadcaster.displayName}
      </div>
    </Banner>
  )
}
