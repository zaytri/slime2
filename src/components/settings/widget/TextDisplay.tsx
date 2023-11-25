import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function TextDisplay() {
  const { setting, idString } = useWidgetSetting()
  if (!setting || setting.type !== 'text-display' || !setting.label) return null

  return (
    <div id={idString} className='setting-text-display text-emerald-900'>
      <Markdown remarkPlugins={[remarkGfm]}>{setting.label}</Markdown>
    </div>
  )
}
