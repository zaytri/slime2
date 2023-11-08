import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import Slime2Color from '@/services/color'
import clsx from 'clsx'
import { HexAlphaColorPicker } from 'react-colorful'
import inputClassName from './input/inputClassName'

export default function ColorPicker() {
  const { setting, value, setValue } = useWidgetSetting()

  if (!setting || setting.type !== 'input-color') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const existingValue = typeof value === 'string' ? value : ''
  const hexValue = toHex(existingValue)
  const inputForeground = getForeground(existingValue)

  return (
    <div className='slime2-group-shadow m-2 overflow-hidden rounded border-2 border-emerald-800 bg-white'>
      <div
        className=' flex flex-col items-center justify-center gap-2   pt-2'
        style={{
          backgroundColor: hexValue,
        }}
      >
        <HexAlphaColorPicker
          color={hexValue}
          className='drop-shadow drop-shadow-c-black/25 drop-shadow-x-0.5 drop-shadow-y-0.5'
          onChange={color => setValue(color)}
        />
        <div className='slime2-alpha-background border-t border-black'>
          <input
            className={clsx(inputClassName, 'text-center font-bold')}
            style={{
              backgroundColor: hexValue,
              color: inputForeground,
            }}
            placeholder={setting.placeholder}
            type='text'
            value={existingValue}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

function getForeground(color: string) {
  try {
    const alpha = new Slime2Color(color).alpha
    if (alpha < 0.5) return 'black'
    return Slime2Color.accessibleForeground(color || 'white')
  } catch {
    return 'black'
  }
}

function toHex(color: string) {
  try {
    return new Slime2Color(color).toString({ format: 'hex' })
  } catch {
    return '#00000000'
  }
}
