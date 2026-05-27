import React from 'react'
import { CodeBlock } from '../CodeBlock'
import { useButtonProps, useToggleActive } from '../../../lib/hooks'
import ActionButton from '../../../components/action-button'

export function RichTextCodeBlock() {
  const buttonProps = useButtonProps(CodeBlock.name)

  const {
    icon = undefined,
    tooltip = undefined,
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
      icon={'CodeXml'}
      tooltip={tooltip}
      tooltipOptions={tooltipOptions}
    />
  )
}
