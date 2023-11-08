import { WidgetSettingProvider } from '@/contexts/widget-setting/WidgetSettingProvider'
import AudioInput from './AudioInput'
import BooleanInput from './BooleanInput'
import ColorInput from './ColorInput'
import DropdownInput from './DropdownInput'
import FontInput from './FontInput'
import Group from './Group'
import ImageDisplay from './ImageDisplay'
import ImageInput from './ImageInput'
import NumberInput from './NumberInput'
import SelectInput from './SelectInput'
import TextDisplay from './TextDisplay'
import TextInput from './TextInput'
import VideoInput from './VideoInput'
import WidgetButton from './WidgetButton'

export default function WidgetSetting(item: Widget.Setting) {
  // use event.stopPropogation() on any onClicks that create windows
  function renderType() {
    switch (item.type) {
      case 'group':
        return <Group />
      case 'button':
        return <WidgetButton />
      case 'input-text':
        return <TextInput />
      case 'input-number':
        return <NumberInput />
      case 'input-boolean':
        return <BooleanInput />
      case 'input-color':
        return <ColorInput />
      case 'input-font':
        return <FontInput />
      case 'input-image':
        return <ImageInput />
      case 'input-video':
        return <VideoInput />
      case 'input-audio':
        return <AudioInput />
      case 'input-select':
        return <SelectInput />
      case 'input-dropdown':
        return <DropdownInput />
      case 'display-text':
        return <TextDisplay />
      case 'display-image':
        return <ImageDisplay />
      default:
        return null
    }
  }

  return (
    <WidgetSettingProvider value={item}>{renderType()}</WidgetSettingProvider>
  )
}
