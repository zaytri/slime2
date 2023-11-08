import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { useState } from 'react'
import AutosizingTextarea from 'react-textarea-autosize'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

const fonts = [
  'Arial',
  'Arial Black',
  'Avant Garde',
  'Baskerville',
  'Bookman',
  'Calibri',
  'Century Gothic',
  'Comic Sans MS',
  'Courier New',
  'Gadget',
  'Garamond',
  'Geneva',
  'Georgia',
  'Gill Sans',
  'Helvetica',
  'Helvetica Neue',
  'Impact',
  'Lucida',
  'Lucida Console',
  'Lucida Grande',
  'Lucida Sans',
  'MS Serif',
  'Monaco',
  'Palatino',
  'Palatino Linotype',
  'San Francisco',
  'Segoe UI',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
]

export default function FontInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  const [selectValue, setSelectValue] = useState('')

  if (!setting || setting.type !== 'input-font') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const fontValue = typeof value === 'string' ? value : ''

  return (
    <InputWrapper>
      <div className='flex flex-col divide-y divide-emerald-800 bg-white'>
        <div className='flex divide-x divide-emerald-800 '>
          <input
            type='text'
            id={idString}
            name={idString}
            className={clsx(inputClassName, 'flex-1')}
            placeholder='Type in a font name'
            aria-describedby={descriptionIdString}
            value={fontValue}
            onChange={onChange}
          />
          <div className='flex-1 pl-1'>
            <select
              className={clsx(
                inputClassName,
                '!px-0 text-[16px]',
                (!selectValue || !fonts.includes(fontValue)) && 'text-gray-400',
              )}
              onChange={event => {
                setSelectValue(event.target.value)
                setValue(event.target.value)
              }}
              value={fontValue}
              style={{
                fontFamily: fonts.includes(fontValue) ? fontValue : 'Fredoka',
              }}
            >
              <option value='' className='font-fredoka text-gray-400'>
                ...or choose a common font
              </option>
              {fonts.map(fontOption => {
                return (
                  <option
                    key={fontOption}
                    value={fontOption}
                    className='text-base text-black'
                    style={{ fontFamily: fontOption }}
                  >
                    {fontOption}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <AutosizingTextarea
          className={clsx(
            inputClassName,
            'resize-none overflow-auto scrollbar-thin scrollbar-track-emerald-800/25 scrollbar-thumb-emerald-800 scrollbar-track-rounded-none scrollbar-thumb-rounded-none hover:scrollbar-thumb-emerald-700 active:scrollbar-thumb-emerald-600',
          )}
          defaultValue='Font Preview: The quick brown fox jumps over the lazy dog'
          style={{ fontFamily: fontValue }}
        />
      </div>
    </InputWrapper>
  )
}
