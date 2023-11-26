import clsx from 'clsx'
import CustomLinkify from '../CustomLinkify'

export default function InputDescription(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  if (!props.children) return

  return (
    <CustomLinkify
      {...props}
      className={clsx(
        'mt-1 border border-l-4 border-lime-500 bg-lime-200 p-2 text-sm text-emerald-900',
        props.className,
      )}
      linkClassName='text-green-600'
    ></CustomLinkify>
  )
}
