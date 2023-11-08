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

    type Group = ItemType<
      'group',
      {
        label: string
        items: Item[]
      }
    >

    type GroupMultiple = ItemType<
      'group',
      {
        label: string
        items: Item[]
        multiple?: true
        previewIds?: string[]
        defaultValues?: ValueGroup[]
        description?: string
      }
    >

    type Item =
      | ItemType<
          'button',
          { label: string; onClick: (groupId: GroupId) => void }
        >
      | ItemType<'display-text', { text: string }>
      | ItemType<'display-image', { url: string; alt?: string; label?: string }>
      // https://tailwindui.com/components/application-ui/forms/input-groups#component-85e0087460af7ce9f5160485832f72b2
      | ItemType<
          'input-text',
          MultipleInput<
            string,
            {
              placeholder?: string
              multiline?: boolean
            }
          >
        >
      | ItemType<
          'input-number',
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
      | ItemType<'input-boolean', Input<boolean>>
      | ItemType<'input-font', Input<string>>
      | ItemType<'input-color', Input<string, { placeholder?: string }>>
      | ItemType<
          'input-select',
          MultipleInput<InputValue, { options: SelectOption[] }>
        >
      | ItemType<
          'input-dropdown',
          Input<
            string,
            {
              placeholder?: string
              options: SelectOption[]
            }
          >
        >
      | ItemType<'input-image', MultipleInput<string | null>>
      | ItemType<'input-video', MultipleInput<string | null>>
      | ItemType<'input-audio', MultipleInput<string | null>>

    type SelectOption = {
      label: string
      value: NonNullable<InputValue>
    }

    type ItemType<Type, Data> = { type: Type } & Data & {
        id: string
        dependency?: {
          id: string
          value: NonNullable<InputValue> | NonNullable<InputValue>[]
        }
      }

    type Input<Value, Data = {}> = Data & {
      label?: string
      defaultValue?: Value | null
      description?: string
    }

    type MultipleInput<Value, Data = {}> =
      | Input<Value, Data>
      | Input<Value[], Data & { multiple: true }>
  }
}
