import WidgetSetting from './WidgetSetting'

type WidgetSettingsProps = {
  settings: Widget.Setting[]
}

export default function WidgetSettings({ settings }: WidgetSettingsProps) {
  return (
    <div className='flex flex-col gap-2 p-2'>
      {settings.map(item => {
        return <WidgetSetting key={item.id} {...item} />
      })}
    </div>
  )
}
