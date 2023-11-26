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
      as='blockquote'
      options={{
        target: '_blank',
        className: clsx('inline underline', linkClassName),
        nl2br: true,
      }}
    />
  )
}
