import ActionButton from '../../../components/action-button'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { Clear } from '../Clear'

export function RichTextClear() {
  const buttonProps = useButtonProps(Clear.name)

  const {
    icon = undefined,
    tooltip = undefined,
    shortcutKeys = undefined,
    tooltipOptions = {},
    action = undefined,
    isActive = undefined
  } = buttonProps?.componentProps ?? {}

  const { disabled } = useActive(isActive)

  const onAction = () => {
    if (disabled) return

    if (action) action()
  }

  if (!buttonProps) {
    return <></>
  }

  return (
    <ActionButton
      action={onAction}
      disabled={disabled}
      icon={'Eraser'}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
