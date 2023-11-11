import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Grid, Video, X } from 'react-feather'
import InputWrapper from './input/InputWrapper'

export default function VideoInput() {
  const { setting, idString, descriptionIdString, value, setValue } =
    useWidgetSetting()
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!setting || setting.type !== 'video-input') return null

  function add(urlStrings: string[]) {
    if (!setting || !urlStrings) return

    if ('multiple' in setting && setting.multiple) {
      const existingValue: string[] = Array.isArray(value)
        ? (value as string[])
        : []

      const filteredUrls = urlStrings.filter(url => {
        return !existingValue.includes(url)
      })

      if (filteredUrls.length) {
        setValue([...existingValue, ...filteredUrls])
      }
    } else {
      setValue(urlStrings[0])
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

  function onFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || !files.length) return

    const urlStrings: string[] = []
    for (const file of files) {
      // assume video is in assets folder
      urlStrings.push(`assets/${file.name}`)
    }

    add(urlStrings)

    event.target.value = ''
  }

  function renderVideos() {
    if (!setting) return null

    if ('multiple' in setting && setting.multiple) {
      const existingValue: string[] = Array.isArray(value)
        ? (value as string[])
        : []

      return existingValue.map(url => {
        return <VideoPreview key={url} src={url} onRemove={remove} />
      })
    }

    if (typeof existingValue !== 'string') return null

    // use array with keys so that the video properly unloads when
    // swapping videos after a video failed to load
    return [existingValue].map(url => {
      return <VideoPreview key={url} src={url} onRemove={remove} />
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
        <div className='border-b border-emerald-800 p-2'>
          <Button
            className='w-full justify-center !px-1 !py-3'
            onClick={onButtonClick}
          >
            <ButtonText className='text-xs'>
              {`Choose ${
                Array.isArray(value) ? 'Videos' : 'a Video'
              } from the Widget Assets Folder`}
            </ButtonText>
            <ButtonIcon>
              {Array.isArray(value) ? (
                <Grid size={22} strokeWidth={2.5} className='-mt-0.5' />
              ) : (
                <Video size={22} strokeWidth={2.5} className='-mt-0.5' />
              )}
            </ButtonIcon>
          </Button>
        </div>
        <input
          className='hidden'
          id={`${idString}.chooseFile`}
          type='file'
          multiple={'multiple' in setting && setting.multiple}
          accept='video/*'
          onChange={onFileInputChange}
          ref={fileInputRef}
          aria-describedby={descriptionIdString}
        />
        {((Array.isArray(value) && value.length) ||
          typeof value === 'string') && (
          <div
            className={clsx(
              'grid grid-cols-1 gap-2 border-t border-emerald-800 bg-white p-2',
              Array.isArray(value) && {
                'grid-cols-2': value.length > 1,
              },
            )}
          >
            {renderVideos()}
          </div>
        )}
      </div>
    </InputWrapper>
  )
}

type VideoPreviewProps = {
  onRemove: (url?: string) => void
} & JSX.IntrinsicElements['source']

function VideoPreview({ onRemove, ...props }: VideoPreviewProps) {
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
      <div className='flex flex-1 flex-col items-center justify-center'>
        <FallbackVideo {...props} />
      </div>
    </div>
  )
}

function FallbackVideo(props: JSX.IntrinsicElements['source']) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className='flex items-center justify-center p-1 pr-3'>
        <p className='text-xs font-bold'>Video not found in assets folder!</p>
      </div>
    )
  }

  return (
    <video controls className='max-h-60'>
      <source
        {...props}
        onError={() => setFailed(true)}
        onLoad={() => setFailed(false)}
      />
    </video>
  )
}
