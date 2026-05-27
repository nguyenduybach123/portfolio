import ActionButton from '../../../components/action-button'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import { Attachment } from '../Attachment'

export function ActionButtonAttachment() {
  const buttonProps = useButtonProps(Attachment.name)
  console.log('[ActionButtonAttachment] buttonProps:', buttonProps)
  const {
    icon = undefined,
    tooltip = undefined,
    shortcutKeys = undefined,
    tooltipOptions = {},
    action = undefined,
    isActive = undefined
  } = buttonProps?.componentProps ?? {}

  const { editorDisabled, update } = useToggleActive(isActive)

  const onAction = () => {
    if (editorDisabled) return

    if (action) {
      action()
      update()
    }
  }

  console.log('[ActionButtonAttachment] buttonProps:', buttonProps)
  if (!buttonProps) {
    return <></>
  }

  return (
    <ActionButton
      action={onAction}
      disabled={editorDisabled}
      icon={'Paperclip'}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
