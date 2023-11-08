import { WidgetSettingProvider } from '@/contexts/widget-setting/WidgetSettingProvider'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import { WidgetSettingsGroupIdProvider } from '@/contexts/widget-settings-group-id/WidgetSettingsGroupIdProvider'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import Slime2Color from '@/services/color'
import clsx from 'clsx'
import { Droplet } from 'react-feather'
import ColorPicker from './ColorPicker'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function ColorInput() {
  const { setting, idString, descriptionIdString, value, setValue, groupId } =
    useWidgetSetting()
  const { openWindow } = useWindowListDispatch()

  if (!setting || setting.type !== 'input-color') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value)
  }

  const existingValue = typeof value === 'string' ? value : ''

  return (
    <InputWrapper>
      <div className='flex bg-white'>
        <input
          id={idString}
          name={idString}
          className={clsx(inputClassName, 'flex-1')}
          placeholder={setting.placeholder}
          type='text'
          value={existingValue}
          aria-describedby={descriptionIdString}
          onChange={onChange}
        />
        <button
          className='flex w-44 items-stretch p-0.5'
          title='Open Color Picker'
          onClick={event => {
            openWindow({
              id: `slime2window.${idString}`,
              title: 'Color Picker',
              icon: Droplet,
              children: (
                <WidgetSettingsGroupIdProvider groupId={groupId}>
                  <WidgetSettingProvider value={setting}>
                    <ColorPicker />
                  </WidgetSettingProvider>
                </WidgetSettingsGroupIdProvider>
              ),
            })

            event.stopPropagation()
          }}
        >
          <div className='slime2-alpha-background flex-1 rounded-sm border-2 border-black'>
            <div
              className='btn-shadow-i h-full w-full'
              style={{ backgroundColor: toHex(existingValue) }}
            >
              <span className='sr-only'>Open Color Picker</span>
            </div>
          </div>
        </button>
      </div>
    </InputWrapper>
  )
}

function toHex(color: string) {
  try {
    return new Slime2Color(color).toString({ format: 'hex' })
  } catch {
    return '#00000000'
  }
}
