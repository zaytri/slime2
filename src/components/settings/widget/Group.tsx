import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { WidgetSettingProvider } from '@/contexts/widget-setting/WidgetSettingProvider'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import { WidgetSettingsGroupIdProvider } from '@/contexts/widget-settings-group-id/WidgetSettingsGroupIdProvider'
import { useWidgetSettingsGroupId } from '@/contexts/widget-settings-group-id/useWidgetSettingsGroupId'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import { ChevronRight, ChevronsRight, FileText } from 'react-feather'
import GroupMultiple from './GroupMultiple'
import WidgetSettings from './WidgetSettings'

export default function Group() {
  const groupId = useWidgetSettingsGroupId()
  const { openWindow } = useWindowListDispatch()
  const { setting, idString } = useWidgetSetting()
  if (!setting || setting.type !== 'group') return null

  const multiple = 'multiple' in setting && setting.multiple
  const iconProps = {
    strokeWidth: 3,
    size: 30,
    className: '-mt-0.5',
  }

  return (
    <Button
      id={idString}
      className='-my-0.5 w-full justify-between py-2'
      onClick={(event: React.MouseEvent) => {
        openWindow({
          id: `slime2window.${idString}`,
          icon: FileText,
          title: setting.label,
          className: 'w-96',
          children: (
            <WidgetSettingsGroupIdProvider
              groupId={multiple ? groupId : [...groupId, { id: setting.id }]}
            >
              {multiple ? (
                <WidgetSettingProvider value={setting}>
                  <GroupMultiple />
                </WidgetSettingProvider>
              ) : (
                <WidgetSettings settings={setting.items} />
              )}
            </WidgetSettingsGroupIdProvider>
          ),
        })

        event.stopPropagation()
      }}
    >
      <ButtonText>{setting.label}</ButtonText>
      <ButtonIcon>
        {multiple ? (
          <ChevronsRight {...iconProps} />
        ) : (
          <ChevronRight {...iconProps} />
        )}
      </ButtonIcon>
    </Button>
  )
}
