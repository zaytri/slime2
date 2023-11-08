// img wrapper with fallback

import { useState } from 'react'

export default function FallbackImage(props: JSX.IntrinsicElements['img']) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const remote =
      !props.src ||
      props.src.startsWith('http://') ||
      props.src.startsWith('https://')

    return (
      <div className='flex items-center justify-center p-1 pr-3'>
        <p className='text-xs font-bold'>
          {remote
            ? 'Image failed to load!'
            : 'Image not found in assets folder!'}
        </p>
      </div>
    )
  }

  return (
    <img
      {...props}
      onError={() => setFailed(true)}
      onLoad={() => setFailed(false)}
    />
  )
}
