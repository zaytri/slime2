import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { useClient } from '@/contexts/client/useClient'
import { useUnsavedChanges } from '@/contexts/unsaved-changes/useUnsavedChanges'
import { useWidgetValues } from '@/contexts/widget-values/useWidgetValues'
import { useWindowListDispatch } from '@/contexts/window-list/useWindowList'
import { useState } from 'react'
import { Download } from 'react-feather'

export default function SaveDataButton() {
  const { setUnsavedChanges } = useUnsavedChanges()
  const widgetValues = useWidgetValues()
  const { widgetDataFileName } = useClient()
  const { closeWindow } = useWindowListDispatch()
  const [saved, setSaved] = useState(false)

  function onClick() {
    setSaved(true)
    setTimeout(() => {
      setUnsavedChanges(false)
    }, 2000)

    closeWindow('slime2window.unsavedChanges')

    // https://stackoverflow.com/a/33542499

    const scriptText = `slime2.widget.setData(${JSON.stringify(
      widgetValues,
      null,
      2,
    )})`

    const blob = new Blob([scriptText], {
      type: 'text/javascript',
    })

    const downloadElement = document.createElement('a')
    downloadElement.href = URL.createObjectURL(blob)
    downloadElement.download = widgetDataFileName
    downloadElement.style.display = 'none'
    document.body.appendChild(downloadElement)
    downloadElement.click()
    document.body.removeChild(downloadElement)
  }

  return (
    <Button
      onClick={onClick}
      className='w-full justify-center outline outline-2 outline-lime-100 focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-lime-100'
      disabled={saved}
    >
      {saved ? (
        <ButtonText>Saved!</ButtonText>
      ) : (
        <>
          <ButtonText>Save Widget Data</ButtonText>
          <ButtonIcon>
            <Download strokeWidth={3} size={28} />
          </ButtonIcon>
        </>
      )}
    </Button>
  )
}
