export default function WidgetField(field: Slime2.WidgetFieldProps) {
  switch (field.type) {
    case 'text-input':
      return <TextInputField {...field} />
    case 'text-area-input':
      return <TextAreaInputField {...field} />
    default:
      return null
  }
}

function TextInputField({
  defaultValue,
  keyName,
  label = '',
}: Slime2.WidgetField.TextInput) {
  return (
    <label className='block '>
      {label}
      <input
        className='block w-full rounded border-2 border-emerald-800 px-2 outline-offset-4 focus:outline-2 focus:outline-emerald-500'
        defaultValue={defaultValue}
        name={keyName}
      />
    </label>
  )
}

function TextAreaInputField({
  defaultValue,
  keyName,
  label = '',
}: Slime2.WidgetField.TextArea) {
  return (
    <label className='block '>
      {label}
      <textarea
        className=' scrollbar-track-emerald-800/25 scrollbar active:scrollbar-thumb-emerald-600 scrollbar-track-rounded-none scrollbar-thumb-rounded-none hover:scrollbar-thumb-emerald-700 scrollbar-thumb-emerald-800 block min-h-[150px] w-full resize-none overflow-auto rounded border-2 border-emerald-800 px-2 outline-offset-4 hover:resize-y focus:outline-2 focus:outline-emerald-500'
        defaultValue={defaultValue}
        name={keyName}
      />
    </label>
  )
}
