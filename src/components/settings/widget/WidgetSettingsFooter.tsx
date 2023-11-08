import { useUnsavedChanges } from '@/contexts/unsaved-changes/useUnsavedChanges'
import SaveDataButton from './SaveDataButton'

export default function WidgetSettingsFooter() {
  const { unsavedChanges } = useUnsavedChanges()

  if (!unsavedChanges) return null

  return (
    <div className='flex flex-col items-center gap-2 border-t-2 border-t-emerald-800 bg-green-700 p-2'>
      <p className='font-radiocanada text-xs font-semibold text-white'>
        You have some unsaved changes.
      </p>
      <SaveDataButton />
    </div>
  )
}
