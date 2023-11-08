import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import InputContainer from './InputContainer'
import InputDescription from './InputDescription'
import InputLabel from './InputLabel'

export default function InputWrapper({ children }: React.PropsWithChildren) {
  const { setting, idString, descriptionIdString } = useWidgetSetting()

  if (!setting) return null

  switch (setting.type) {
    case 'input-text':
    case 'input-number':
    case 'input-boolean':
    case 'input-font':
    case 'input-color':
    case 'input-select':
    case 'input-dropdown':
    case 'input-image':
    case 'input-video':
    case 'input-audio':
      return (
        <InputContainer>
          <InputLabel htmlFor={idString}>{setting.label}</InputLabel>
          {children}
          <InputDescription id={descriptionIdString}>
            {setting.description}
          </InputDescription>
        </InputContainer>
      )
    default:
      return null
  }
}
