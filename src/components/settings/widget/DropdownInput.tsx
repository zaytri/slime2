import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function DropdownInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()

  if (!setting || setting.type !== 'input-dropdown') return null

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (!setting || setting.type !== 'input-dropdown') return null

    const selectedOption = setting.options.find(option => {
      return option.label === event.target.value
    })

    setValue(selectedOption ? event.target.value : null)
  }

  const existingValue = setting.options.find(option => {
    return option.value === value
  })?.label

  return (
    <InputWrapper>
      <div className='bg-white px-1'>
        <select
          id={idString}
          aria-describedby={descriptionIdString}
          value={existingValue}
          name={idString}
          onChange={onChange}
          className={clsx(inputClassName, 'pl-0', !value && 'text-gray-400')}
        >
          <option value='' className='text-gray-400'>
            {setting.placeholder ? setting.placeholder : 'Choose an option'}
          </option>
          {setting.options.map(option => {
            const { label } = option
            return (
              <option key={label} value={label} className='text-black'>
                {label}
              </option>
            )
          })}
        </select>
      </div>
    </InputWrapper>
  )
}
