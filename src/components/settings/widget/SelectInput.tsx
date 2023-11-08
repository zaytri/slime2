import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import InputContainer from './input/InputContainer'
import InputDescription from './input/InputDescription'
import inputClassName from './input/inputClassName'

export default function SelectInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()

  if (!setting || setting.type !== 'input-select') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!setting || setting.type !== 'input-select') return null

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
    <InputContainer>
      <fieldset aria-describedby={descriptionIdString}>
        <legend
          className={clsx(
            '-mt-0.5 block w-full px-2 py-0.5 font-medium text-white text-shadow text-shadow-c-black/75 text-shadow-y-px',
          )}
        >
          {setting.label}
        </legend>
        <div className={clsx(inputClassName, 'pb-0 pt-2')}>
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
                  className='peer sr-only'
                  checked={checked}
                  type={
                    'multiple' in setting && setting.multiple
                      ? 'checkbox'
                      : 'radio'
                  }
                />
                <span
                  className={clsx(
                    'mb-2 mr-2 inline-block rounded border-2 p-1 peer-focus:outline peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-emerald-800 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-emerald-800',
                    !checked && 'border-slate-400',
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
    </InputContainer>
  )
}
