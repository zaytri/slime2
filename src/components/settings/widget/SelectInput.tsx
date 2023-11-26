import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import InputDescription from './input/InputDescription'

export default function SelectInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()

  if (!setting || setting.type !== 'select-input') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!setting || setting.type !== 'select-input') return null

    const selectedOption = setting.options.find(option => {
      return option.label === event.target.value
    })

    if (!selectedOption) return

    if ('multiple' in setting && setting.multiple) {
      const existingValue = Array.isArray(value)
        ? (value as Widget.Setting.InputValue[])
        : []
      if (event.target.checked) {
        if (!existingValue.includes(selectedOption.value)) {
          setValue([...existingValue, selectedOption.value])
        }
      } else {
        setValue(
          existingValue.filter(valueItem => valueItem !== selectedOption.value),
        )
      }
    } else {
      setValue(selectedOption.value)
    }
  }

  return (
    <div id={idString}>
      <fieldset
        className='flex justify-between gap-2'
        aria-describedby={descriptionIdString}
      >
        <legend className='float-left flex-[2] text-lg font-medium text-emerald-900'>
          {setting.label}
        </legend>
        <div className='mb-1 flex flex-[3] flex-wrap gap-2'>
          {setting.options.map(option => {
            const optionIdString = `${idString}.${option.label}`
            const checked =
              'multiple' in setting && setting.multiple
                ? (Array.isArray(value)
                    ? (value as Widget.Setting.InputValue[])
                    : []
                  ).includes(option.value)
                : value === option.value

            return (
              <label key={optionIdString} htmlFor={optionIdString} className=''>
                <input
                  id={optionIdString}
                  value={option.label}
                  name={idString}
                  onChange={onChange}
                  className='peer appearance-none'
                  checked={checked}
                  type={
                    'multiple' in setting && setting.multiple
                      ? 'checkbox'
                      : 'radio'
                  }
                />
                <span
                  className={clsx(
                    'inline-flex rounded border-2 p-1 peer-focus:outline peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-emerald-800 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-emerald-800',
                    !checked && 'border-emerald-800/30 text-emerald-800/75',
                    checked && 'border-emerald-800 bg-green-700 text-white',
                  )}
                >
                  {option.label}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>
      <InputDescription id={descriptionIdString}>
        {setting.description}
      </InputDescription>
    </div>
  )
}
