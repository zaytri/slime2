import { useRef } from 'react'
import Draggable from 'react-draggable'
import { X } from 'react-feather'
import Settings from './Settings'

type SettingsWindowProps = {
  close: () => void
}

export default function SettingsWindow({ close }: SettingsWindowProps) {
  const draggableRef = useRef(null)

  return (
    <Draggable
      handle='.draggable-handle'
      positionOffset={{ x: '-50%', y: '-50%' }}
      nodeRef={draggableRef}
    >
      <div
        ref={draggableRef}
        className='font-fredoka !fixed z-[999] bg-white border-emerald-800 border-2 overflow-hidden rounded-md top-1/2 left-1/2'
      >
        <div className='draggable-handle bg-gradient-to-b from-lime-600 to-emerald-700 flex items-center rounded-t-sm text-lime-100 cursor-move py-0.5 pl-2 pr-1 gap-2'>
          <p className='flex-1 font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
            Settings
          </p>
          <button
            className=' flex items-center justify-center py-px px-px draggable-cancel border-2 border-white rounded text-white bg-gradient-to-b from-rose-400 to-rose-500'
            onClick={close}
          >
            <X size={20} />
          </button>
        </div>
        <Settings />
      </div>
    </Draggable>
  )
}
