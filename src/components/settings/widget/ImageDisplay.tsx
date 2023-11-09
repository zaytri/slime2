import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import FallbackImage from '../FallbackImage'

export default function ImageDisplay() {
  const { setting, idString, descriptionIdString } = useWidgetSetting()
  if (!setting || setting.type !== 'image-display' || !setting.url) return null

  return (
    <div className='slime2-group-shadow flex flex-col items-center justify-center overflow-hidden rounded border-2 border-emerald-800 bg-white'>
      {setting.label && (
        <p
          id={descriptionIdString}
          className='-mt-0.5 block w-full bg-green-700 px-2 py-0.5 font-medium text-white text-shadow text-shadow-c-black/75 text-shadow-y-px'
        >
          {setting.label}
        </p>
      )}
      <FallbackImage
        className='max-h-96'
        src={setting.url}
        alt={setting.alt}
        title={setting.alt}
        id={idString}
        aria-describedby={descriptionIdString}
      />
    </div>
  )
}
