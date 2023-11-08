import { createContext, useContext } from 'react'

export function useWidgetSettingsGroupId() {
  return useContext(WidgetSettingsGroupIdContext)
}

export const WidgetSettingsGroupIdContext =
  createContext<Widget.Setting.GroupId>([])
