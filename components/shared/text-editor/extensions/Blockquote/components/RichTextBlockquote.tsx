import ActionButton from '../../../components/action-button'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import { Blockquote } from '../Blockquote'

export function RichTextBlockquote() {
  const buttonProps = useButtonProps(Blockquote.name)

  const {
    icon = undefined,
    tooltip = undefined,
    shortcutKeys = undefined,
    tooltipOptions = {},
    action = undefined,
    isActive = undefined
  } = buttonProps?.componentProps ?? {}

  const { dataState, disabled, update } = useToggleActive(isActive)

  const onAction = () => {
    if (disabled) return

    if (action) {
      action()
      update()
    }
  }

  console.log('[Blockquote] buttonProps', buttonProps)
  if (!buttonProps) {
    return <></>
  }

  return (
    <ActionButton
      action={onAction}
      dataState={dataState}
      disabled={disabled}
      icon={'TextQuote'}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
