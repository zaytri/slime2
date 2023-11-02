import type { UseQueryResult } from '@tanstack/react-query'
import { ScaleLoader } from 'react-spinners'
import colors from 'tailwindcss/colors'
import Banner from './Banner'

type LoadingBannerProps = {
  message: string
  items?: LoadingItemProps[]
  staticPosition?: boolean
}

export default function LoadingBanner({
  message,
  items,
  staticPosition,
}: LoadingBannerProps) {
  return (
    <Banner
      status='loading'
      staticPosition={staticPosition}
      className='flex-col'
    >
      <div className='flex items-center justify-center gap-3'>
        {scaleLoader}
        {message}
        {scaleLoader}
      </div>
      {items && (
        <div className='flex flex-col'>
          {items.map(item => {
            return <LoadingItem key={item.message} {...item} />
          })}
        </div>
      )}
    </Banner>
  )
}

type LoadingItemProps = {
  message: string
  status: UseQueryResult['status']
}

function LoadingItem({ message, status }: LoadingItemProps) {
  let child = scaleLoader
  switch (status) {
    case 'error':
      child = <p>❌</p>
      break
    case 'success':
      child = <p>✅</p>
      break
    default: // nothing
  }

  return (
    <div className='flex items-center justify-between gap-2'>
      <p>{message}</p>
      {child}
    </div>
  )
}

const scaleLoader = (
  <ScaleLoader
    color={colors.lime[100]}
    loading={true}
    speedMultiplier={0.5}
    height={16}
    width={3}
    radius={10}
  />
)
