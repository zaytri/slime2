import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import InputContainer from './InputContainer'
import InputDescription from './InputDescription'
import InputLabel from './InputLabel'

export default function InputWrapper({ children }: React.PropsWithChildren) {
  const { setting, idString, descriptionIdString } = useWidgetSetting()

  if (!setting) return null

  switch (setting.type) {
    case 'text-input':
    case 'number-input':
    case 'boolean-input':
    case 'font-input':
    case 'color-input':
    case 'select-input':
    case 'dropdown-input':
    case 'image-input':
    case 'video-input':
    case 'audio-input':
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
