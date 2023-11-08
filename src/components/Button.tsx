import clsx from 'clsx'

export default function Button(
  props: React.PropsWithChildren<JSX.IntrinsicElements['button']>,
) {
  return (
    <button
      {...props}
      type='button'
      className={clsx(
        'btn-shadow-i flex items-center gap-2 rounded-md border-2 border-emerald-800 bg-gradient-to-b from-lime-600 to-emerald-700 px-3 py-1 text-center hover:from-lime-400 hover:to-emerald-600 focus:from-lime-400 focus:to-emerald-600 focus:outline-none active:from-lime-400/90 active:to-emerald-600/90',
        props.className,
      )}
    />
  )
}

type ButtonIconProps = JSX.IntrinsicElements['span'] & {
  className?: string
}

export function ButtonIcon(props: React.PropsWithChildren<ButtonIconProps>) {
  return (
    <span
      {...props}
      className={clsx(
        'font-display font-semibold text-lime-100 drop-shadow drop-shadow-c-black/75 drop-shadow-y-px',
        props.className,
      )}
    />
  )
}

type ButtonTextProps = JSX.IntrinsicElements['span'] & {
  className?: string
}

export function ButtonText(props: React.PropsWithChildren<ButtonTextProps>) {
  return (
    <span
      {...props}
      className={clsx(
        '-mb-px font-grandstander text-base font-semibold text-lime-100 text-shadow text-shadow-c-black/75 text-shadow-y-px',
        props.className,
      )}
    />
  )
}
