import clsx from 'clsx'

export default function InputContainer(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
) {
  return (
    <div
      {...props}
      className={clsx(
        'slime2-group-shadow overflow-hidden rounded border-2 border-emerald-800 bg-green-700 focus-within:border-emerald-600 focus-within:bg-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600',
        props.className,
      )}
    />
  )
}
