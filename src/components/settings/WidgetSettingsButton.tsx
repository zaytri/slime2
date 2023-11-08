import { useClient } from '@/contexts/client/useClient'
import { useUnsavedChanges } from '@/contexts/unsaved-changes/useUnsavedChanges'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import { useEffect } from 'react'
import { AlertTriangle, ChevronRight, Settings } from 'react-feather'
import Button, { ButtonIcon, ButtonText } from '../Button'
import SaveDataButton from './widget/SaveDataButton'
import WidgetSettings from './widget/WidgetSettings'
import WidgetSettingsFooter from './widget/WidgetSettingsFooter'

export default function WidgetSettingsButton() {
  const { openWindow } = useWindowListDispatch()
  const { unsavedChanges } = useUnsavedChanges()
  const { widgetSettings } = useClient()

  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (unsavedChanges) {
        event.preventDefault()
        event.returnValue = true // for legacy support

        openWindow(
          {
            id: 'slime2window.unsavedChanges',
            icon: AlertTriangle,
            title: 'You have unsaved changes!',
            className: 'w-80',
            children: (
              <div className='flex flex-col gap-3 p-2'>
                <p className='font-radiocanada text-sm'>
                  To see your changes in <span className='font-bold'>OBS</span>{' '}
                  (or other streaming software),{' '}
                  <span className='font-bold'>
                    download and save your widget data!
                  </span>
                </p>
                <SaveDataButton />
              </div>
            ),
          },
          {
            x: window.innerWidth / 3,
            y: window.innerHeight / 2,
          },
        )
      }
    }

    addEventListener('beforeunload', beforeUnload)
    return () => {
      removeEventListener('beforeunload', beforeUnload)
    }
  }, [unsavedChanges, openWindow])

  if (!widgetSettings || !widgetSettings.length) return null

  return (
    <Button
      onClick={(event: React.MouseEvent) => {
        openWindow({
          id: 'widget-settings',
          icon: Settings,
          title: 'Widget Settings',
          className: 'w-96',
          children: <WidgetSettings settings={widgetSettings} />,
          footer: <WidgetSettingsFooter />,
        })

        event.stopPropagation()
      }}
      className='justify-between'
    >
      <ButtonText>Widget Settings</ButtonText>
      <ButtonIcon>
        <ChevronRight strokeWidth={3} size={30} className='-mt-0.5' />
      </ButtonIcon>
    </Button>
  )
}
