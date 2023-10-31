import { useClient } from '@/contexts/client/useClient'
import { generateInnerHTML } from '@/services/settings'
import { memo } from 'react'

function Settings() {
  const client = useClient()

  console.log('hi')

  if (!client.settingsPage) return null

  const innerHTML = generateInnerHTML(client.settingsPage)
  if (!innerHTML) return null

  return (
    <div
      className='widget-settings'
      dangerouslySetInnerHTML={{ __html: innerHTML }}
    ></div>
  )
}

const MemoSettings = memo(Settings)
export default MemoSettings
