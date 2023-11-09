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
      case 'text-input':
        return <TextInput />
      case 'number-input':
        return <NumberInput />
      case 'boolean-input':
        return <BooleanInput />
      case 'color-input':
        return <ColorInput />
      case 'font-input':
        return <FontInput />
      case 'image-input':
        return <ImageInput />
      case 'video-input':
        return <VideoInput />
      case 'audio-input':
        return <AudioInput />
      case 'select-input':
        return <SelectInput />
      case 'dropdown-input':
        return <DropdownInput />
      case 'text-display':
        return <TextDisplay />
      case 'image-display':
        return <ImageDisplay />
      default:
        return null
    }
  }

  return (
    <WidgetSettingProvider value={item}>{renderType()}</WidgetSettingProvider>
  )
}
