import { nanoid } from 'nanoid'
import { createContext, useContext } from 'react'
import { emptyFunction } from '../common'
import { useUnsavedChanges } from '../unsaved-changes/useUnsavedChanges'

export const initialState: Widget.ValueGroup = {}

export function useWidgetValues() {
  return useContext(WidgetValuesContext)
}

export function useWidgetValuesDispatch() {
  const dispatch = useContext(WidgetValuesDispatchContext)
  const { setUnsavedChanges } = useUnsavedChanges()

  function loadDefaults(settings: Widget.Setting[]) {
    dispatch({ type: 'load-defaults', settings })
  }

  function loadValues(values: Widget.ValueGroup) {
    dispatch({ type: 'load-values', values })
  }

  function update(
    groupId: Widget.Setting.GroupId,
    id: string,
    value: Widget.Setting.InputValue | Widget.Setting.InputValue[],
  ) {
    setUnsavedChanges(true)
    dispatch({ type: 'update-value', id, groupId, value })
  }

  function addGroupMultiple(
    groupId: Widget.Setting.GroupId,
    id: string,
    settingItems: Widget.Setting[],
  ) {
    setUnsavedChanges(true)
    dispatch({ type: 'add-group-multiple', groupId, id, settingItems })
  }

  function copyGroupMultiple(
    groupId: Widget.Setting.GroupId,
    id: string,
    index: number,
  ) {
    setUnsavedChanges(true)
    dispatch({ type: 'copy-group-multiple', groupId, id, index })
  }

  function removeGroupMultiple(
    groupId: Widget.Setting.GroupId,
    id: string,
    index: number,
  ) {
    setUnsavedChanges(true)
    dispatch({ type: 'remove-group-multiple', groupId, id, index })
  }

  function moveGroupMultiple(
    groupId: Widget.Setting.GroupId,
    id: string,
    currentIndex: number,
    newIndex: number,
  ) {
    setUnsavedChanges(true)
    dispatch({
      type: 'move-group-multiple',
      groupId,
      id,
      currentIndex,
      newIndex,
    })
  }

  return {
    loadDefaults,
    loadValues,
    update,
    addGroupMultiple,
    copyGroupMultiple,
    removeGroupMultiple,
    moveGroupMultiple,
  }
}

export const WidgetValuesContext =
  createContext<Widget.ValueGroup>(initialState)
export const WidgetValuesDispatchContext =
  createContext<React.Dispatch<WidgetValuesAction>>(emptyFunction)

export function widgetValuesReducer(
  state: Widget.ValueGroup,
  action: WidgetValuesAction,
): Widget.ValueGroup {
  switch (action.type) {
    case 'load-defaults':
      return transformDefaults(action.settings, state)
    case 'load-values':
      return action.values
    case 'update-value': {
      const { groupId, id } = action
      let { value } = action

      // if value is a primitive, ensure that value is one of the valid types
      if (
        value !== null &&
        typeof value !== 'boolean' &&
        typeof value !== 'string' &&
        typeof value !== 'number' &&
        !Array.isArray(value)
      ) {
        return state
      }

      // if value is an array, remove any items with invalid types
      if (Array.isArray(value)) {
        value = value.filter(item => {
          return (
            typeof item === 'string' ||
            typeof item === 'boolean' ||
            typeof item === 'number'
          )
        })
      }

      const existingValue = getGroup(state, groupId)?.[id]

      // equality check for if the value is a primitive
      if (!Array.isArray(value) && value === existingValue) {
        return state
      }

      // equality check for if the value is an array
      if (Array.isArray(value) && Array.isArray(existingValue)) {
        // ensure that both value arrays don't hold the same exact elements
        if (
          JSON.stringify(value.toSorted()) ===
          JSON.stringify(existingValue.toSorted())
        ) {
          return state
        }
      }

      // if this throws an error, state hasn't been handled correctly
      const newState = JSON.parse(JSON.stringify(state)) as Widget.ValueGroup
      setValue(newState, groupId, id, value)

      return newState
    }
    case 'add-group-multiple': {
      const { groupId, id, settingItems } = action
      const newState = JSON.parse(JSON.stringify(state)) as Widget.ValueGroup
      const parentGroup = getGroup(newState, groupId)
      if (parentGroup) {
        const group = parentGroup[id]

        if (Array.isArray(group)) {
          parentGroup[id] = [
            ...(group as Widget.MultipleGroup),
            {
              ...transformDefaults(settingItems),
              __id: generateGroupMultipleId(id),
            },
          ]
        }
      }
      return newState
    }
    case 'copy-group-multiple': {
      const { groupId, id, index } = action
      const newState = JSON.parse(JSON.stringify(state)) as Widget.ValueGroup
      const parentGroup = getGroup(newState, groupId)
      if (parentGroup) {
        const group = parentGroup[id]

        if (Array.isArray(group)) {
          const groupItem = JSON.parse(
            JSON.stringify((group as Widget.MultipleGroup)[index]),
          ) as Widget.ValueGroup

          parentGroup[id] = (group as Widget.MultipleGroup).toSpliced(
            index,
            0,
            { ...groupItem, __id: generateGroupMultipleId(id) },
          )
        }
      }
      return newState
    }
    case 'move-group-multiple': {
      const { groupId, id, currentIndex, newIndex } = action
      if (newIndex < 0 || currentIndex === newIndex) return state

      const newState = JSON.parse(JSON.stringify(state)) as Widget.ValueGroup
      const parentGroup = getGroup(newState, groupId)
      if (parentGroup) {
        const group = parentGroup[id]

        if (Array.isArray(group)) {
          if (newIndex >= group.length) return state

          const [groupItem] = group.splice(currentIndex, 1)
          group.splice(newIndex, 0, groupItem as Widget.MultipleGroupItem)
        }
      }
      return newState
    }
    case 'remove-group-multiple': {
      const { groupId, id, index } = action
      const newState = JSON.parse(JSON.stringify(state)) as Widget.ValueGroup
      const parentGroup = getGroup(newState, groupId)
      if (parentGroup) {
        const group = parentGroup[id]

        if (Array.isArray(group)) {
          parentGroup[id] = (group as Widget.MultipleGroup).filter(
            (_, groupIndex) => {
              return index !== groupIndex
            },
          )
        }
      }
      return newState
    }
  }
}

type WidgetValuesAction =
  | { type: 'load-defaults'; settings: Widget.Setting[] }
  | { type: 'load-values'; values: Widget.ValueGroup }
  | {
      type: 'update-value'
      id: string
      groupId: Widget.Setting.GroupId
      value: Widget.Setting.InputValue | Widget.Setting.InputValue[]
    }
  | {
      type: 'add-group-multiple'
      groupId: Widget.Setting.GroupId
      id: string
      settingItems: Widget.Setting[]
    }
  | {
      type: 'copy-group-multiple'
      groupId: Widget.Setting.GroupId
      id: string
      index: number
    }
  | {
      type: 'move-group-multiple'
      groupId: Widget.Setting.GroupId
      id: string
      currentIndex: number
      newIndex: number
    }
  | {
      type: 'remove-group-multiple'
      groupId: Widget.Setting.GroupId
      id: string
      index: number
    }

function transformDefaults(
  settings: Widget.Setting[],
  values: Widget.ValueGroup = {},
): Widget.ValueGroup {
  const group: Widget.ValueGroup =
    !values || typeof values !== 'object' || Array.isArray(values)
      ? {}
      : (JSON.parse(JSON.stringify(values)) as Widget.ValueGroup)

  const duplicateCheck = new Map<string, boolean>()

  for (const setting of settings) {
    if (!setting.id)
      throw Error(
        'A widget setting is missing an ID! All widget settings must have a unique ID.',
      )

    if (duplicateCheck.get(setting.id)) {
      throw Error(
        `Two widget settings have the same ID of '${setting.id}'! All widget settings must have a unique ID.`,
      )
    }

    duplicateCheck.set(setting.id, true)

    const value = transformDefault(setting, group, group[setting.id])
    if (value !== undefined) group[setting.id] = value
  }

  return group
}

function transformDefault(
  setting: Widget.Setting,
  group: Widget.ValueGroup,
  existingValue?: Widget.ValueGroup['key'],
): Widget.ValueGroup['key'] | undefined {
  function validateString(
    value: Widget.Setting.InputValue | Widget.ValueGroup,
  ) {
    return typeof value === 'string'
  }

  function validateInputValue(
    value: Widget.Setting.InputValue | Widget.ValueGroup,
  ) {
    return (
      typeof value === 'string' ||
      typeof value === 'boolean' ||
      typeof value === 'number'
    )
  }

  function validateValueGroup(
    valueGroup: Widget.Setting.InputValue | Widget.ValueGroup,
  ) {
    return !!valueGroup && typeof valueGroup === 'object'
  }

  // use defaults and add unique __id
  function transformValueGroup(valueGroup: Widget.ValueGroup) {
    return {
      ...transformDefaults(
        (setting as Widget.Setting.GroupMultiple).items,
        valueGroup,
      ),
      __id: generateGroupMultipleId(setting.id),
    }
  }

  switch (setting.type) {
    case 'input-boolean': {
      if (typeof existingValue === 'boolean') return existingValue

      return typeof setting.defaultValue === 'boolean'
        ? setting.defaultValue
        : false // default to false
    }
    case 'input-number': {
      if (typeof existingValue === 'number' || existingValue === null) {
        return existingValue
      }

      return typeof setting.defaultValue === 'number'
        ? setting.defaultValue
        : null // default to null
    }
    case 'input-font':
    case 'input-color': {
      if (typeof existingValue === 'string') return existingValue

      return typeof setting.defaultValue === 'string'
        ? setting.defaultValue
        : '' // default to empty string
    }
    case 'input-text': {
      if ('multiple' in setting && setting.multiple) {
        if (Array.isArray(existingValue)) {
          return existingValue.filter(validateString) as string[]
        }

        return Array.isArray(setting.defaultValue)
          ? setting.defaultValue.filter(validateString)
          : [] // default to empty array
      } else {
        if (typeof existingValue === 'string') return existingValue

        return typeof setting.defaultValue === 'string'
          ? setting.defaultValue
          : '' // default to empty string
      }
    }
    case 'input-image':
    case 'input-video':
    case 'input-audio': {
      if ('multiple' in setting && setting.multiple) {
        if (Array.isArray(existingValue)) {
          return existingValue.filter(validateString) as string[]
        }

        return Array.isArray(setting.defaultValue)
          ? setting.defaultValue.filter(validateString)
          : [] // default to empty array
      } else {
        if (typeof existingValue === 'string' || existingValue === null) {
          return existingValue
        }

        return typeof setting.defaultValue === 'string'
          ? setting.defaultValue
          : null // default to null
      }
    }
    case 'input-select': {
      if ('multiple' in setting && setting.multiple) {
        if (Array.isArray(existingValue)) {
          return existingValue.filter(
            validateInputValue,
          ) as Widget.Setting.InputValue[]
        }

        return Array.isArray(setting.defaultValue)
          ? setting.defaultValue.filter(validateInputValue)
          : [] // default to empty array
      } else {
        if (
          typeof existingValue === 'string' ||
          typeof existingValue === 'boolean' ||
          typeof existingValue === 'number'
        ) {
          return existingValue
        }

        return typeof setting.defaultValue === 'string' ||
          typeof setting.defaultValue === 'boolean' ||
          typeof setting.defaultValue === 'number'
          ? setting.defaultValue
          : setting.options.length
          ? setting.options[0].value // default to first value
          : null // default to null if first value doesn't exist
      }
    }
    case 'group': {
      if ('multiple' in setting && setting.multiple) {
        if (Array.isArray(existingValue)) {
          return (
            existingValue.filter(validateValueGroup) as Widget.MultipleGroup
          ).map(transformValueGroup)
        }

        return Array.isArray(setting.defaultValues)
          ? setting.defaultValues
              .filter(validateValueGroup)
              .map(transformValueGroup)
          : // default to an array with 1 element with group defaults
            [
              {
                ...transformDefaults(setting.items),
                __id: generateGroupMultipleId(setting.id),
              },
            ]
      } else {
        if (
          existingValue &&
          typeof existingValue === 'object' &&
          !Array.isArray(existingValue)
        ) {
          return transformDefaults(setting.items, existingValue)
        }

        // default to group defaults
        return transformDefaults(
          setting.items,
          group[setting.id] as Widget.ValueGroup,
        )
      }
    }
    default:
      return undefined
  }
}

function generateGroupMultipleId(id: string): string {
  return `${id}_${nanoid()}`
}

export function getGroup(
  values: Widget.ValueGroup,
  groupId: Widget.Setting.GroupId,
): Widget.ValueGroup | null {
  let group = values

  for (let i = 0; i < groupId.length; i++) {
    const { id, index } = groupId[i]
    let newGroup = group[id]

    // validate group index
    if (index !== undefined) {
      if (!Array.isArray(newGroup)) return null
      newGroup = newGroup[index]
    }

    // validate that newGroup is a ValueGroup
    if (!newGroup || typeof newGroup !== 'object' || Array.isArray(newGroup)) {
      return null
    }

    group = newGroup
  }

  return group
}

function setValue(
  values: Widget.ValueGroup,
  groupId: Widget.Setting.GroupId,
  valueId: string,
  value: Widget.Setting.InputValue | Widget.Setting.InputValue[],
) {
  let group = values

  for (let i = 0; i < groupId.length; i++) {
    const { id: subGroupId, index: subGroupIndex } = groupId[i]

    if (subGroupIndex !== undefined) {
      // if group[id] isn't an array, replace it with empty array
      if (!Array.isArray(group[subGroupId])) {
        group[subGroupId] = []
      }

      // prettier-ignore
      /**
       * if indexed group has an unexpected value, replace it with empty object
       * also use type assertions because at this point
       * we've already guaranteed that group[id] is an array
       *
       * using prettier-ignore to remove unnecessary semicolon
       */
      if (
        !(group[subGroupId] as Widget.ValueGroup[])[subGroupIndex] ||
        typeof (group[subGroupId] as Widget.ValueGroup[])[subGroupIndex] !==
          'object' ||
        Array.isArray((group[subGroupId] as Widget.ValueGroup[])[subGroupIndex])
      ) {
        (group[subGroupId] as Widget.ValueGroup[])[subGroupIndex] = {}
      }

      group = (group[subGroupId] as Widget.ValueGroup[])[subGroupIndex]
    } else {
      // if group[id] has an unexpected value, replace it with empty object
      if (
        !group[subGroupId] ||
        typeof group[subGroupId] !== 'object' ||
        Array.isArray(group[subGroupId])
      ) {
        group[subGroupId] = {}
      }

      group = group[subGroupId] as Widget.ValueGroup
    }
  }

  group[valueId] = value
}
