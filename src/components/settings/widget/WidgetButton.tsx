import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import { Play } from 'react-feather'

export default function WidgetButton() {
  const { setting, idString, groupId } = useWidgetSetting()
  if (!setting || setting.type !== 'button') return null

  return (
    <Button
      id={idString}
      onClick={() => setting.onClick(groupId)}
      className='justify-center'
    >
      <ButtonIcon>
        <Play strokeWidth={3} size={24} className='-mt-0.5' />
      </ButtonIcon>
      <ButtonText>{setting.label}</ButtonText>
    </Button>
  )
}
