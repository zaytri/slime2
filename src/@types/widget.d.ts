namespace Widget {
  type Setting = Setting.Group | Setting.GroupMultiple | Setting.Item

  type ValueGroup = {
    [key: string]:
      | Setting.InputValue
      | Setting.InputValue[]
      | ValueGroup
      | MultipleGroup
  }

  type MultipleGroup = MultipleGroupItem[]

  type MultipleGroupItem = ValueGroup & {
    __id: string
  }

  namespace Setting {
    type InputValue = number | string | boolean | null
    type GroupId = { id: string; index?: number }[]

    type Group = ItemType<'group', { settings: Item[] }>

    type GroupMultiple = ItemType<
      'group',
      {
        settings: Item[]
        multiple?: true
        previewIds?: string[]
        defaultValues?: ValueGroup[]
        description?: string
      }
    >

    type Item =
      | ItemType<'button', { onClick: (groupId: GroupId, id: string) => void }>
      | ItemType<'text-display'>
      | ItemType<'image-display', { url: string; alt?: string }>
      | ItemType<
          'text-input',
          MultipleInput<
            string,
            {
              placeholder?: string
              multiline?: boolean
            }
          >
        >
      | ItemType<
          'number-input',
          Input<
            number,
            {
              placeholder?: string
              slider?: boolean
              min?: number
              max?: number
              step?: number | 'any'
            }
          >
        >
      | ItemType<'boolean-input', Input<boolean>>
      | ItemType<'font-input', Input<string>>
      | ItemType<'color-input', Input<string, { placeholder?: string }>>
      | ItemType<
          'select-input',
          MultipleInput<InputValue, { options: SelectOption[] }>
        >
      | ItemType<
          'dropdown-input',
          Input<
            string,
            {
              placeholder?: string
              options: SelectOption[]
            }
          >
        >
      | ItemType<'image-input', MultipleInput<string | null>>
      | ItemType<'video-input', MultipleInput<string | null>>
      | ItemType<'audio-input', MultipleInput<string | null>>

    type SelectOption = {
      label: string
      value: NonNullable<InputValue>
    }

    type ItemType<Type, Data = {}> = { type: Type } & Data & {
        id: string
        label?: string
        dependency?: {
          id: string
          value: NonNullable<InputValue> | NonNullable<InputValue>[]
        }
      }

    type Input<Value, Data = {}> = Data & {
      defaultValue?: Value | null
      description?: string
    }

    type MultipleInput<Value, Data = {}> =
      | Input<Value, Data>
      | Input<Value[], Data & { multiple: true }>
  }
}
