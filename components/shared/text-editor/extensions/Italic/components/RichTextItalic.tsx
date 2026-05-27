import ActionButton from '../../../components/action-button'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import { Italic } from '../Italic'

export function RichTextItalic() {
  const buttonProps = useButtonProps(Italic.name)

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

  if (!buttonProps) {
    return <></>
  }

  return (
    <ActionButton
      action={onAction}
      dataState={dataState}
      disabled={disabled}
      icon={icon}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
