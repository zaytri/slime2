import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function NumberInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  if (!setting || setting.type !== 'input-number') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number.parseInt(event.target.value)
    setValue(Number.isNaN(newValue) ? null : newValue)
  }

  if (setting.slider) {
    return <NumberSliderInput />
  }

  return (
    <InputWrapper>
      <input
        id={idString}
        name={idString}
        className={inputClassName}
        type='number'
        onChange={onChange}
        value={typeof value === 'number' ? value.toString() : ''}
        min={setting.min}
        max={setting.max}
        step={setting.step}
        placeholder={setting.placeholder}
        aria-describedby={descriptionIdString}
      />
    </InputWrapper>
  )
}

function NumberSliderInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  if (!setting || setting.type !== 'input-number') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = Number.parseFloat(event.target.value)
    setValue(Number.isNaN(newValue) ? null : newValue)
  }

  const inputValue = typeof value === 'number' ? value : ''

  const min = typeof setting.min === 'number' ? setting.min : 0
  const max = typeof setting.max === 'number' ? setting.max : 100

  return (
    <InputWrapper>
      <div className='flex divide-x divide-emerald-800'>
        <div className={clsx(inputClassName, 'flex flex-1 py-1')}>
          <p>{min}</p>
          <input
            id={idString}
            name={idString}
            className='mx-1 flex-1 focus:outline-offset-2 focus:outline-emerald-600'
            type='range'
            onChange={onChange}
            value={inputValue.toString()}
            min={min}
            max={max}
            step={setting.step}
            aria-describedby={descriptionIdString}
          />
          <p>{max}</p>
        </div>
        <input
          id={`${idString}.numberSliderOutput`}
          name={`${idString}.numberSliderOutput`}
          className={clsx(inputClassName, 'w-20 pr-0.5 text-center')}
          type='number'
          onChange={onChange}
          value={inputValue.toString()}
          min={min}
          max={max}
          step={setting.step}
          placeholder={setting.placeholder}
          aria-describedby={descriptionIdString}
        />
      </div>
    </InputWrapper>
  )
}
