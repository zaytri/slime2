import {
  WindowProps,
  useWindowListDispatch,
} from '@/contexts/window-list/useWindowList'
import clsx from 'clsx'
import { useRef } from 'react'
import Draggable from 'react-draggable'
import { X } from 'react-feather'

export default function Window({
  id,
  title,
  children,
  className,
  initialMousePosition,
}: WindowProps) {
  const { closeWindow, sendWindowToTop } = useWindowListDispatch()
  const draggableRef = useRef(null)

  const defaultPosition = initialMousePosition
    ? { x: Math.min(initialMousePosition.x + 20, window.innerWidth / 2), y: 20 }
    : { x: 40, y: 40 }

  function close() {
    closeWindow(id)
  }

  function onMouseDown() {
    sendWindowToTop(id)
  }

  return (
    <Draggable
      handle='.draggable-handle'
      cancel='.draggable-cancel'
      defaultPosition={defaultPosition}
      nodeRef={draggableRef}
      onMouseDown={onMouseDown}
      bounds={'parent'}
    >
      <div
        ref={draggableRef}
        className={clsx(
          'window-shadow pointer-events-auto !fixed z-[999] flex max-h-[80%] max-w-[90%] flex-col overflow-hidden rounded-md border-2 border-emerald-800 bg-lime-100 font-fredoka opacity-50 last:opacity-100 only:opacity-100 hover:opacity-100',
          className,
        )}
      >
        <WindowTitle close={initialMousePosition ? close : undefined}>
          {title}
        </WindowTitle>
        <WindowContent>{children}</WindowContent>
      </div>
    </Draggable>
  )
}

type WindowTitleProps = {
  close?: () => void
}

function WindowTitle({
  children,
  close,
}: React.PropsWithChildren<WindowTitleProps>) {
  return (
    <div className=' title-shadow-i pointer-events-none flex rounded-t-lg  '>
      <div className=' draggable-handle pointer-events-auto flex-1 cursor-move items-center gap-2 rounded-tl-sm bg-gradient-to-b from-lime-600 to-emerald-700 py-0.5 pl-2 pr-1 text-lime-100'>
        <p className=' font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
          {children}
        </p>
      </div>
      {close && (
        <button
          className='draggable-cancel pointer-events-auto flex items-center justify-center bg-gradient-to-b from-rose-600 to-red-700 px-2 py-px text-rose-100 hover:from-red-400 hover:to-rose-600'
          onClick={close}
        >
          <X
            size={30}
            strokeWidth={3}
            className='drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
          />
        </button>
      )}
    </div>
  )
}

function WindowContent({ children }: React.PropsWithChildren) {
  return (
    <div className='scrollbar active:scrollbar-thumb-emerald-600 hover:scrollbar-thumb-emerald-700 scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-track-emerald-800/25 scrollbar-thumb-emerald-800 m-1 flex-1 overflow-auto'>
      {children}
    </div>
  )
}
