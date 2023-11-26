import { WidgetSettingProvider } from '@/contexts/widget-setting/WidgetSettingProvider'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import { WidgetSettingsGroupIdProvider } from '@/contexts/widget-settings-group-id/WidgetSettingsGroupIdProvider'
import { useWidgetSettingsGroupId } from '@/contexts/widget-settings-group-id/useWidgetSettingsGroupId'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import { Folder } from 'react-feather'
import GroupMultiple from './GroupMultiple'
import WidgetSettings from './WidgetSettings'

export default function Group() {
  const groupId = useWidgetSettingsGroupId()
  const { openWindow } = useWindowListDispatch()
  const { setting, idString } = useWidgetSetting()
  if (!setting || setting.type !== 'group') return null

  const multiple = 'multiple' in setting && setting.multiple
  const iconProps = {
    strokeWidth: 2.5,
    size: 25,
    className: '-mt-0.5',
  }

  return (
    <button
      id={idString}
      className=' -my-2 flex items-center gap-2 rounded border-2 border-lime-500 bg-lime-300 bg-gradient-to-br from-lime-200 to-lime-300 px-2 py-2 text-xl font-semibold text-emerald-900 first:mt-0 last:mb-0 hover:-translate-y-1'
      onClick={(event: React.MouseEvent) => {
        openWindow({
          id: `slime2window.${idString}`,
          icon: Folder,
          title: setting.label || '',
          className: 'w-[720px]',
          children: (
            <WidgetSettingsGroupIdProvider
              groupId={multiple ? groupId : [...groupId, { id: setting.id }]}
            >
              {multiple ? (
                <WidgetSettingProvider value={setting}>
                  <GroupMultiple />
                </WidgetSettingProvider>
              ) : (
                <WidgetSettings settings={setting.settings} />
              )}
            </WidgetSettingsGroupIdProvider>
          ),
        })

        event.stopPropagation()
      }}
    >
      <p className='flex-1 text-left'>{setting.label}</p>
      <div>
        <Folder {...iconProps} />
      </div>
    </button>
  )
}
