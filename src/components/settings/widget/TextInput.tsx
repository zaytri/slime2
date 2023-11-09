import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { useState } from 'react'
import { X } from 'react-feather'
import AutosizingTextarea from 'react-textarea-autosize'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function TextInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  if (!setting || setting.type !== 'text-input') return null

  function onChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValue(event.target.value)
  }

  const commonProps = {
    id: idString,
    name: idString,
    className: inputClassName,
    onChange,
    placeholder: setting.placeholder,
    'aria-describedby': descriptionIdString,
  }

  const singleValue = typeof value === 'string' ? value : ''

  if ('multiple' in setting && setting.multiple) {
    return (
      <TextInputMultiple
        {...commonProps}
        value={Array.isArray(value) ? (value as string[]) : []}
        setValue={setValue}
      />
    )
  }

  if (setting.multiline) {
    return <TextInputMultiline {...commonProps} value={singleValue} />
  }

  return (
    <InputWrapper>
      <input {...commonProps} type='text' value={singleValue} />
    </InputWrapper>
  )
}

function TextInputMultiline(props: JSX.IntrinsicElements['textarea']) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { style, ref, className, ...rest } = props

  return (
    <InputWrapper>
      <AutosizingTextarea
        {...rest}
        className={clsx(
          'resize-none overflow-auto border-none scrollbar-thin scrollbar-track-emerald-800/25 scrollbar-thumb-emerald-800 scrollbar-track-rounded-none scrollbar-thumb-rounded-none hover:scrollbar-thumb-emerald-700 active:scrollbar-thumb-emerald-600',
          className,
        )}
        minRows={4}
      />
    </InputWrapper>
  )
}

type TextInputMultipleProps = JSX.IntrinsicElements['input'] & {
  value: string[]
  setValue: (value: string[]) => void
}

function TextInputMultiple(props: TextInputMultipleProps) {
  const { value, setValue, ...rest } = props
  const multipleValue: string[] = Array.isArray(value) ? value : []
  const [inputValue, setInputValue] = useState('')

  function add() {
    if (inputValue && !multipleValue.includes(inputValue)) {
      setInputValue('')
      const trimmedValue = inputValue.trim()
      if (trimmedValue) {
        setValue([...value, trimmedValue])
      }
    }
  }

  function remove(item: string) {
    setValue(value.filter(valueItem => valueItem !== item))
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
    // fix for CJKT users
    if (event.nativeEvent.isComposing || event.keyCode === 229) return

    if (event.key === 'Enter') add()
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value)
  }

  return (
    <InputWrapper>
      <div className='bg-white'>
        <input
          {...rest}
          type='text'
          onKeyDown={onKeyDown}
          onBlur={add}
          value={inputValue}
          onChange={onInputChange}
        />
        <div
          className={clsx(
            'flex flex-wrap gap-1 border-t border-emerald-800 p-1 text-[16px] font-semibold',
            !multipleValue.length && 'hidden',
          )}
        >
          {multipleValue.map(item => {
            return (
              <div
                className='slime2-tag-shadow flex items-center gap-1 rounded-sm border-2 border-emerald-800 bg-green-700 px-1 text-white text-shadow text-shadow-c-black/75 text-shadow-y-px'
                key={item}
              >
                <p>{item}</p>
                <button
                  className='my-1 rounded-sm bg-green-500/50 hover:bg-rose-500  focus:bg-rose-500 focus:outline-none'
                  onClick={() => remove(item)}
                >
                  <X
                    className='drop-shadow drop-shadow-c-black/50 drop-shadow-y-px'
                    size={18}
                    strokeWidth={3}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </InputWrapper>
  )
}
