import ActionButton from '../../components/action-button'
import { useButtonProps, useToggleActive } from '../../lib/hooks'

interface GenericActionButtonProps {
  extensionName: string
}

export function GenericActionButton({ extensionName }: GenericActionButtonProps) {
  const buttonProps = useButtonProps(extensionName)

  const {
    icon = undefined,
    tooltip = undefined,
    shortcutKeys = undefined,
    tooltipOptions = {},
    action = undefined,
    isActive = undefined
  } = buttonProps?.componentProps ?? {}

  const { editorDisabled, update, dataState } = useToggleActive(isActive)

  const onAction = () => {
    if (editorDisabled) return

    if (action) {
      action()
      update()
    }
  }

  if (!buttonProps) {
    return null
  }

  return (
    <ActionButton
      action={onAction}
      disabled={editorDisabled}
      icon={icon}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
      dataState={dataState}
    />
  )
}
