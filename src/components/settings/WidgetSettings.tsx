import WidgetField from './WidgetField'

export default function WidgetSettings() {
  const widgetSettings: Slime2.WidgetField[] = [
    {
      type: 'text-input',
      key: 'test',
      label: 'Test',
      defaultValue: 'test',
    },
    {
      type: 'text-input',
      key: 'test2',
      label: 'Test2',
      defaultValue: 'test2',
    },
    {
      type: 'text-area-input',
      key: 'test3',
      label: 'Test3',
      defaultValue: 'test3',
    },
  ]

  for (let i = 0; i < 100; i++) {
    widgetSettings.push({
      type: 'text-area-input',
      key: `more-${i}`,
      label: `More-${i}`,
      defaultValue:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    })
  }

  return (
    <div className='flex flex-col gap-4  px-2 pb-2 pt-1'>
      {widgetSettings.map(field => {
        const { key, ...rest } = field
        return <WidgetField key={key} keyName={key} {...rest} />
      })}
    </div>
  )
}
