import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { Check, X } from 'react-feather'
import InputContainer from './input/InputContainer'
import InputDescription from './input/InputDescription'
import InputLabel from './input/InputLabel'

export default function BooleanInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()

  if (!setting || setting.type !== 'input-boolean') return null

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.checked)
  }

  return (
    <InputContainer
      className={clsx(
        !value &&
          'border-slate-700 bg-slate-300 focus-within:border-slate-400 focus-within:bg-slate-300 focus-within:ring-slate-400',
      )}
    >
      <InputLabel
        htmlFor={idString}
        className={clsx('flex items-center justify-between py-1 pr-1')}
      >
        <span
          className={clsx(
            'flex-1 pr-2',
            !value && 'text-shadow-none text-slate-600',
          )}
        >
          {setting.label}
        </span>
        <input
          id={idString}
          name={idString}
          className='appearance-none'
          type='checkbox'
          onChange={onChange}
          checked={!!value}
          aria-describedby={descriptionIdString}
        />
        <div
          className={clsx(
            'mt-0.5 flex items-center justify-center rounded-sm bg-white px-px',
            !value && 'bg-slate-100',
          )}
        >
          {value ? (
            <Check size={30} strokeWidth={3} className='text-emerald-600' />
          ) : (
            <X size={30} strokeWidth={3} className='text-slate-300' />
          )}
        </div>
      </InputLabel>
      <InputDescription
        className={clsx(
          !value && 'border-slate-400 bg-slate-100 text-slate-600',
        )}
        id={descriptionIdString}
      >
        {setting.description}
      </InputDescription>
    </InputContainer>
  )
}
