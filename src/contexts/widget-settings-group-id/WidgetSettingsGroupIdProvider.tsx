import { WidgetSettingsGroupIdContext } from './useWidgetSettingsGroupId'

type WidgetSettingsGroupIdProviderProps = {
  groupId?: Widget.Setting.GroupId
}

export function WidgetSettingsGroupIdProvider({
  groupId = [],
  children,
}: React.PropsWithChildren<WidgetSettingsGroupIdProviderProps>) {
  return (
    <WidgetSettingsGroupIdContext.Provider value={groupId}>
      {children}
    </WidgetSettingsGroupIdContext.Provider>
  )
}
