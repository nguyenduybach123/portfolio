import ActionButton from '../../../components/action-button'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import { TextUnderline } from '../TextUnderline'

export function RichTextUnderline() {
  const buttonProps = useButtonProps(TextUnderline.name)

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
