import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import useEmulateTwitchMessage from '@/services/platforms/twitch/chat/useEmulate'
import { Play } from 'react-feather'
import Button, { ButtonIcon, ButtonText } from '../Button'

export default function TwitchTools() {
  const emulate = useEmulateTwitchMessage()
  const { isPlatformReady } = usePlatformReady()
  const ready = isPlatformReady('twitch')

  if (!ready) {
    return (
      <div className='flex items-center justify-center'>
        <p>Loading Twitch Tools...</p>
      </div>
    )
  }

  return (
    <Button onClick={emulate} className='justify-center' disabled={!ready}>
      <ButtonIcon>
        <Play strokeWidth={3} size={24} className='-mt-0.5' />
      </ButtonIcon>
      <ButtonText>{'Send Test Message'}</ButtonText>
    </Button>
  )
}
