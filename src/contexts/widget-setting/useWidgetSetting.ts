import { useWidgetSettingsGroupId } from '@/contexts/widget-settings-group-id/useWidgetSettingsGroupId'
import { createContext, useContext } from 'react'
import {
  getGroup,
  useWidgetValues,
  useWidgetValuesDispatch,
} from '../widget-values/useWidgetValues'

export function useWidgetSetting() {
  const setting = useContext(WidgetSettingContext)
  const groupId = useWidgetSettingsGroupId()
  const widgetValues = useWidgetValues()
  const { update } = useWidgetValuesDispatch()

  const groupIdString = groupId.reduce<string>((idString, { id, index }) => {
    return `${idString}.${id}${index === undefined ? '' : `[${index}]`}`
  }, 'slime2widget')

  const idString = `${groupIdString}.${setting?.id}`
  const descriptionIdString =
    setting && 'description' in setting && setting.description
      ? `${idString}.description`
      : undefined

  let existingValue = null
  if (setting) {
    existingValue = getGroup(widgetValues, groupId)?.[setting.id]
  }

  const value =
    existingValue === null ||
    typeof existingValue === 'boolean' ||
    typeof existingValue === 'string' ||
    typeof existingValue === 'number' ||
    Array.isArray(existingValue)
      ? existingValue
      : null

  function setValue(
    value: Widget.Setting.InputValue | Widget.Setting.InputValue[],
  ) {
    if (setting) update(groupId, setting.id, value)
  }

  return { setting, idString, descriptionIdString, value, setValue, groupId }
}

export const WidgetSettingContext = createContext<Widget.Setting | null>(null)
