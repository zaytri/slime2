import Button, { ButtonIcon, ButtonText } from '@/components/Button'
import { WidgetSettingProvider } from '@/contexts/widget-setting/WidgetSettingProvider'
import { useWidgetSetting } from '@/contexts/widget-setting/useWidgetSetting'
import { WidgetSettingsGroupIdProvider } from '@/contexts/widget-settings-group-id/WidgetSettingsGroupIdProvider'
import { useWidgetValuesDispatch } from '@/contexts/widget-values/useWidgetValues'
import clsx from 'clsx'
import { useRef } from 'react'
import { ArrowDown, ArrowUp, Copy, FileMinus, FilePlus } from 'react-feather'
import TextDisplay from './TextDisplay'
import WidgetSettings from './WidgetSettings'

export default function GroupMultiple() {
  const { setting, value, groupId } = useWidgetSetting()
  const {
    addGroupMultiple,
    copyGroupMultiple,
    removeGroupMultiple,
    moveGroupMultiple,
  } = useWidgetValuesDispatch()
  const itemsRef = useRef<Map<string, HTMLDivElement>>()

  function getMap() {
    if (!itemsRef.current) {
      itemsRef.current = new Map<string, HTMLDivElement>()
    }

    return itemsRef.current
  }

  function refocus(index: number, className: string) {
    const map = getMap()
    const node = map.get((value as Widget.MultipleGroup)[index].__id)
    const button = node
      ?.getElementsByClassName(className)
      .item(0) as HTMLButtonElement
    button?.focus()
  }

  if (
    !setting ||
    setting.type !== 'group' ||
    !('multiple' in setting && setting.multiple) ||
    !Array.isArray(value)
  ) {
    return null
  }

  return (
    <div className='flex flex-col gap-3 p-2'>
      {setting.description && (
        <WidgetSettingProvider
          value={{
            type: 'text-display',
            id: `${setting.id}.description`,
            label: setting.description,
          }}
        >
          <TextDisplay />
        </WidgetSettingProvider>
      )}
      {value.map((multipleGroup, index) => {
        const first = index === 0
        const last = index === value.length - 1
        const { __id } = multipleGroup as Widget.MultipleGroupItem

        return (
          <div
            key={__id}
            className='slime2-group-shadow rounded border-2 border-green-700 bg-lime-200'
            ref={node => {
              const map = getMap()
              if (node) map.set(__id, node)
              else map.delete(__id)
            }}
          >
            <div className='title-shadow-i pointer-events-none flex justify-between overflow-hidden rounded-t-sm font-fredoka text-white'>
              <button
                className='pointer-events-auto flex items-center gap-1 border-r border-r-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-[8px] hover:from-lime-400 hover:to-emerald-600 focus:from-lime-400 focus:to-emerald-600 focus:outline-none active:from-lime-500/90 active:to-emerald-600/90'
                onClick={() => {
                  copyGroupMultiple(groupId, setting.id, index)
                }}
              >
                <Copy
                  size={20}
                  strokeWidth={2.5}
                  className='-mt-0.5 drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
                />
                <p className='-mt-1 text-xs font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
                  Copy
                </p>
              </button>
              <div className='flex-1 bg-gradient-to-b from-lime-600 to-emerald-700'></div>
              <button
                className={clsx(
                  !first &&
                    'pointer-events-auto border-x border-x-emerald-800 hover:from-lime-400 hover:to-emerald-600 focus:from-lime-400 focus:to-emerald-600 active:from-lime-500/90 active:to-emerald-600/90',
                  'slime2-move-up flex items-center gap-1  bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-[8px]  focus:outline-none',
                )}
                disabled={first}
                onClick={() => {
                  moveGroupMultiple(groupId, setting.id, index, index - 1)
                  refocus(index - 1, 'slime2-move-up')
                }}
              >
                <ArrowUp
                  size={20}
                  strokeWidth={2.5}
                  className={clsx(
                    '-mt-0.5 drop-shadow drop-shadow-c-black/75 drop-shadow-y-px',
                    first && 'opacity-0',
                  )}
                />
              </button>
              <div className='flex items-center bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-[8px]'>
                <p
                  className={clsx(
                    '-mt-1 text-xs font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px',
                    value.length < 2 && 'opacity-0',
                  )}
                >
                  Move
                </p>
              </div>
              <button
                className={clsx(
                  !last &&
                    'pointer-events-auto border-x border-x-emerald-800 hover:from-lime-400 hover:to-emerald-600 focus:from-lime-400 focus:to-emerald-600 active:from-lime-500/90 active:to-emerald-600/90',
                  'slime2-move-down flex items-center gap-1 bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-[8px] focus:outline-none',
                )}
                disabled={last}
                onClick={() => {
                  moveGroupMultiple(groupId, setting.id, index, index + 1)
                  refocus(index + 1, 'slime2-move-down')
                }}
              >
                <ArrowDown
                  size={20}
                  strokeWidth={2.5}
                  className={clsx(
                    '-mt-0.5 drop-shadow drop-shadow-c-black/75 drop-shadow-y-px',
                    last && 'opacity-0',
                  )}
                />
              </button>
              <div className='flex-1 bg-gradient-to-b from-lime-600 to-emerald-700'></div>
              <button
                className='pointer-events-auto flex items-center gap-1 border-l border-l-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-2 py-[8px] hover:from-rose-600 hover:to-red-900 focus:from-rose-600 focus:to-red-900 focus:outline-none'
                onClick={() => {
                  if (confirm('Are you sure you want to delete this?')) {
                    removeGroupMultiple(groupId, setting.id, index)
                  }
                }}
              >
                <p className='-mt-1 text-xs font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
                  Delete
                </p>
                <FileMinus
                  size={20}
                  strokeWidth={2.5}
                  className='-mt-0.5 drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
                />
              </button>
            </div>
            <WidgetSettingsGroupIdProvider
              groupId={[...groupId, { id: setting.id, index }]}
            >
              <WidgetSettings settings={setting.items} />
            </WidgetSettingsGroupIdProvider>
          </div>
        )
      })}
      <Button
        onClick={() => {
          addGroupMultiple(groupId, setting.id, setting.items)
        }}
        className='justify-center'
      >
        <ButtonText>Add New</ButtonText>
        <ButtonIcon>
          <FilePlus className='-mt-0.5' />
        </ButtonIcon>
      </Button>
    </div>
  )
}
