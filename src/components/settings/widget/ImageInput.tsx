import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Grid, Image, X } from 'react-feather'
import FallbackImage from '../FallbackImage'
import InputWrapper from './input/InputWrapper'
import inputClassName from './input/inputClassName'

export default function ImageInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  const [textInputValue, setTextInputValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!setting || setting.type !== 'input-image') return null

  function textInputAdd() {
    if (!setting) return

    if (textInputValue) {
      setTextInputValue('')
      add([textInputValue.trim()])
    }
  }

  function add(urlStrings: string[]) {
    if (!setting || !urlStrings) return

    // use remote url or assume image is in assets folder
    const formattedUrls = urlStrings.map(url => {
      return url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `assets/${url}`
    })

    if ('multiple' in setting && setting.multiple) {
      const existingValue: string[] = Array.isArray(value)
        ? (value as string[])
        : []

      const filteredUrls = formattedUrls.filter(url => {
        return !existingValue.includes(url)
      })

      if (filteredUrls.length) {
        setValue([...existingValue, ...filteredUrls])
      }
    } else {
      if (formattedUrls[0]) setValue(formattedUrls[0])
    }
  }

  function remove(item?: string) {
    if (!setting || !item) return

    if ('multiple' in setting && setting.multiple) {
      const existingValue: string[] = Array.isArray(value)
        ? (value as string[])
        : []
      setValue(existingValue.filter(valueItem => valueItem !== item))
    } else {
      setValue(null)
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
    // fix for CJKT users
    if (event.nativeEvent.isComposing || event.keyCode === 229) return

    if (event.key === 'Enter') textInputAdd()
  }

  function onTextInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTextInputValue(event.target.value)
  }

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || !files.length) return

    const urlStrings: string[] = []
    for (const file of files) {
      urlStrings.push(file.name)
    }

    add(urlStrings)

    event.target.value = ''
  }

  function renderImages() {
    if (!setting) return null

    if ('multiple' in setting && setting.multiple) {
      const existingValue: string[] = Array.isArray(value)
        ? (value as string[])
        : []

      return existingValue.map(url => {
        return <ImagePreview key={url} src={url} onRemove={remove} />
      })
    }

    if (typeof existingValue !== 'string') return null

    // use array with keys so that the image properly unloads when
    // swapping images after an image failed to load
    return [existingValue].map(url => {
      return <ImagePreview key={url} src={url} onRemove={remove} />
    })
  }

  function onButtonClick() {
    fileInputRef.current?.click()
  }

  const existingValue =
    'multiple' in setting && setting.multiple
      ? Array.isArray(value)
        ? (value as string[])
        : []
      : typeof value === 'string'
      ? value
      : null

  return (
    <InputWrapper>
      <div className='bg-white'>
        <div className='border-b border-emerald-800 p-1'>
          <Button className='w-full justify-center' onClick={onButtonClick}>
            <ButtonText className=' text-xs'>
              {`Choose ${
                Array.isArray(value) ? 'Images' : 'an Image'
              } from your Widget Assets Folder`}
            </ButtonText>
            <ButtonIcon>
              {Array.isArray(value) ? (
                <Grid size={22} strokeWidth={2.5} className='-mt-0.5' />
              ) : (
                <Image size={22} className='-mt-0.5' />
              )}
            </ButtonIcon>
          </Button>
        </div>
        <input
          id={idString}
          value={textInputValue}
          className={clsx(inputClassName, 'text-center')}
          aria-describedby={descriptionIdString}
          placeholder='...or paste in a remote image URL and press enter'
          type='text'
          onChange={onTextInputChange}
          onKeyDown={onKeyDown}
        />
        <input
          className='hidden'
          id={`${idString}.chooseFile`}
          type='file'
          multiple={'multiple' in setting && setting.multiple}
          accept='image/*'
          onChange={onFileInputChange}
          ref={fileInputRef}
        />
        {((Array.isArray(value) && value.length) ||
          typeof value === 'string') && (
          <div
            className={clsx(
              'grid grid-cols-1 gap-2 border-t border-emerald-800 bg-white p-2',
              Array.isArray(value) && {
                'grid-cols-3': value.length > 2,
                'grid-cols-2': value.length === 2,
              },
            )}
          >
            {renderImages()}
          </div>
        )}
      </div>
    </InputWrapper>
  )
}

type ImagePreviewProps = {
  onRemove: (url?: string) => void
} & JSX.IntrinsicElements['img']

function ImagePreview({ onRemove, ...props }: ImagePreviewProps) {
  return (
    <div className='slime2-group-shadow flex flex-col overflow-hidden rounded border-2 border-emerald-800'>
      <div className='title-shadow-i pointer-events-none flex rounded-t-sm font-fredoka text-white'>
        <p className='-mt-0.5 flex-1 overflow-hidden text-ellipsis whitespace-nowrap bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-0.5 text-xs font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
          {props.src?.split('/').pop()}
        </p>
        <button
          className='pointer-events-auto rounded-tr-sm bg-rose-700 p-0.5 text-white hover:bg-rose-500 focus:bg-rose-500 focus:outline-none'
          onClick={() => onRemove(props.src)}
        >
          <X
            className='drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
            size={20}
            strokeWidth={3}
          />
        </button>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center bg-white'>
        <FallbackImage {...props} className='max-h-32' />
      </div>
    </div>
  )
}
