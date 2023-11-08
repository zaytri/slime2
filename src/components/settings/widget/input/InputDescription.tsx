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
        'border-t border-emerald-800 bg-emerald-50 px-2 py-0.5  text-xs text-emerald-700',
        props.className,
      )}
      linkClassName='text-emerald-500 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white'
    ></CustomLinkify>
  )
}
