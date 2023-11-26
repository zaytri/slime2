import clsx from 'clsx'

export default function InputLabel(
  props: React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >,
) {
  if (!props.children) return null

  return (
    <label
      {...props}
      className={clsx(
        '-mt-0.5 block w-full flex-1 px-2 py-0.5 font-medium text-white text-shadow text-shadow-c-black/75 text-shadow-y-px',
        props.className,
      )}
    />
  )
}
