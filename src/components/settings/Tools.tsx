import { useClient } from '@/contexts/client/useClient'
import TwitchTools from './TwitchTools'
import WidgetSettingsButton from './WidgetSettingsButton'

export default function Tools() {
  const { platforms } = useClient()

  return (
    <div className='flex flex-col justify-center gap-2 p-3'>
      <WidgetSettingsButton />
      {platforms.includes('twitch') && <TwitchTools />}
    </div>
  )
}
