import clsx from 'clsx'
import Linkify from 'linkify-react'

export default function CustomLinkify(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > & { linkClassName?: string },
) {
  const { linkClassName, ...rest } = props
  return (
    <Linkify
      {...rest}
      className={clsx('break-words', props.className)}
      as='p'
      options={{
        target: '_blank',
        className: clsx(
          'inline rounded-[2px] underline outline-none focus:border-none focus:ring-2',
          linkClassName,
        ),
      }}
    />
  )
}
