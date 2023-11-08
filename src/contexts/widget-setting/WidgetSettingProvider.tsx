import { WidgetSettingContext } from './useWidgetSetting'

type WidgetSettingProviderProps = {
  value: Widget.Setting
}

export function WidgetSettingProvider({
  value,
  children,
}: React.PropsWithChildren<WidgetSettingProviderProps>) {
  return (
    <WidgetSettingContext.Provider value={value}>
      {children}
    </WidgetSettingContext.Provider>
  )
}
