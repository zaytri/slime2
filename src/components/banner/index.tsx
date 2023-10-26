import clsx from 'clsx'

type LoaderProps = {
  status: 'success' | 'error' | 'loading'
  staticPosition?: boolean
  className?: string
}

export default function Banner({
  children,
  status,
  staticPosition = false,
  className,
}: React.PropsWithChildren<LoaderProps>) {
  return (
    <>
      <div
        className={clsx(
          'm-3 flex items-center justify-center rounded-xl px-6 py-3',
          status === 'error'
            ? 'bg-rose-900 font-radiocanada text-white'
            : 'bg-emerald-800 font-grandstander text-lime-100',
          status === 'success' && 'slime2-loader-success',
          !staticPosition && 'absolute inset-x-0',
          className,
        )}
      >
        {children}
      </div>
    </>
  )
}
