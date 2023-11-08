import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import CustomLinkify from './CustomLinkify'

export default function TextDisplay() {
  const { setting, idString } = useWidgetSetting()
  if (!setting || setting.type !== 'display-text' || !setting.text) return null

  return (
    <div className='slime2-group-shadow rounded border-2 border-emerald-800 bg-green-700 px-2 py-1 font-medium text-white text-shadow text-shadow-c-black/75 text-shadow-y-px'>
      <CustomLinkify
        id={idString}
        linkClassName='text-lime-200 focus:ring-lime-200 focus:ring-offset-2 focus:ring-offset-green-700'
      >
        {setting.text}
      </CustomLinkify>
    </div>
  )
}
