import { usePlatformReady } from '@/contexts/platform-ready/usePlatformReady'
import useEmulateTwitchMessage from '@/services/platforms/twitch/chat/useEmulate'
import { Play } from 'react-feather'
import Button, { ButtonIcon, ButtonText } from '../Button'

import WidgetSettingsButton from './WidgetSettingsButton'

export default function MainSettings() {
  const emulate = useEmulateTwitchMessage()
  const { isPlatformReady } = usePlatformReady()
  const ready = isPlatformReady('twitch')

  return (
    <div className='flex flex-col justify-center gap-2 p-3'>
      <WidgetSettingsButton />
      {ready && (
        <Button onClick={emulate} className='justify-center' disabled={!ready}>
          <ButtonIcon>
            <Play strokeWidth={3} size={24} className='-mt-0.5' />
          </ButtonIcon>
          <ButtonText>{'Send Test Message'}</ButtonText>
        </Button>
      )}
    </div>
  )
}
