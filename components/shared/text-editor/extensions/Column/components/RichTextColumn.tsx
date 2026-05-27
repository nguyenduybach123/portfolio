import { isFunction } from 'lodash'
import ActionButton from '../../../components/action-button'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import { Column } from '../Column'

export function RichTextColumn() {
  const buttonProps = useButtonProps(Column.name)

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

    console.log('[Column] onAction', { action: isFunction(action) ? 'function' : typeof action })
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
      icon={'Columns2'}
      shortcutKeys={shortcutKeys}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
