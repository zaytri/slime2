import {
  WindowProps,
  useWindowListDispatch,
} from '@/contexts/window-list/useWindowList'
import clsx from 'clsx'
import { forwardRef, useRef } from 'react'
import Draggable from 'react-draggable'
import { X, type Icon } from 'react-feather'

export default function Window({
  id,
  title,
  children,
  header,
  footer,
  className,
  initialMousePosition,
  icon,
}: WindowProps) {
  const { closeWindow, sendWindowToTop } = useWindowListDispatch()
  const draggableRef = useRef(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const defaultPosition = initialMousePosition
    ? {
        x: Math.floor(
          Math.min(initialMousePosition.x + 20, window.innerWidth * 0.5),
        ),
        y: Math.floor(
          Math.min(initialMousePosition.y - 100, window.innerHeight * 0.2),
        ),
      }
    : { x: 40, y: 40 }

  function close() {
    closeWindow(id)
  }

  function sendToTop() {
    const scrollY = contentRef.current?.scrollTop
    sendWindowToTop(id)
    // for some reason sending window to top resets the scroll...
    // so doing this sets it back to where it should be
    setTimeout(() => {
      if (scrollY) contentRef.current?.scrollTo(0, scrollY)
    }, 0)
  }

  return (
    <Draggable
      handle='.draggable-handle'
      cancel='.draggable-cancel'
      defaultPosition={defaultPosition}
      nodeRef={draggableRef}
      onStart={sendToTop}
      bounds='parent'
    >
      <div
        id={id}
        ref={draggableRef}
        onClick={sendToTop}
        className={clsx(
          'slime2-window-shadow pointer-events-auto !fixed z-[999] flex max-h-[80%] min-h-[100px] min-w-[350px] max-w-[90%] flex-col overflow-hidden rounded-md border-2 border-emerald-800 bg-lime-100 font-fredoka text-sm opacity-90 last:opacity-100 only:opacity-100 hover:opacity-100',
          className,
        )}
      >
        <WindowTitle
          icon={icon}
          close={initialMousePosition ? close : undefined}
        >
          {title}
        </WindowTitle>
        {header}
        <WindowContent ref={contentRef}>{children}</WindowContent>
        {footer}
      </div>
    </Draggable>
  )
}

type WindowTitleProps = {
  icon?: Icon
  close?: () => void
}

function WindowTitle({
  icon: Icon,
  children,
  close,
}: React.PropsWithChildren<WindowTitleProps>) {
  return (
    <div className='title-shadow-i pointer-events-none flex divide-x divide-emerald-800 rounded-t-sm'>
      <div className='draggable-handle pointer-events-auto flex-1 cursor-move items-center gap-2 rounded-tl-sm bg-gradient-to-b from-lime-600 to-emerald-700 py-1 pl-[8px] pr-1 text-lime-100'>
        <p className='-mt-0.5 font-medium text-shadow text-shadow-c-black/75 text-shadow-y-px'>
          {Icon && (
            <Icon
              className='-mt-0.5 mr-1 inline drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
              size={24}
            />
          )}
          {children}
        </p>
      </div>
      {close && (
        <button
          className='draggable-cancel pointer-events-auto flex items-center justify-center border-l border-l-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-[8px] py-px text-white hover:from-rose-600 hover:to-red-900 focus:from-rose-600 focus:to-red-900 focus:outline-none'
          onClick={(event: React.MouseEvent) => {
            close()
            event.stopPropagation()
          }}
        >
          <X
            size={24}
            strokeWidth={3}
            className='drop-shadow drop-shadow-c-black/75 drop-shadow-y-px'
          />
        </button>
      )}
    </div>
  )
}

const WindowContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function WindowContent(props, ref) {
  return (
    <div
      {...props}
      className={clsx(
        'draggable-cancel m-1 flex-1 overflow-auto font-radiocanada scrollbar-thin scrollbar-track-emerald-800/25 scrollbar-thumb-emerald-800 scrollbar-track-rounded-full scrollbar-thumb-rounded-full hover:scrollbar-thumb-emerald-700 active:scrollbar-thumb-emerald-600',
        props.className,
      )}
      ref={ref}
    />
  )
})
