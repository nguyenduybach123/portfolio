import { useButtonProps, useEditorInstance, useToggleActive } from '../../../lib/hooks'
import { Table } from '../Table'
import CreateTablePopover from './CreateTablePopover'
import ActionButton from '../../../components/action-button'

export function RichTextTable() {
  const editor = useEditorInstance()
  const buttonProps = useButtonProps(Table.name)

  const {
    icon = undefined,
    tooltip = undefined,
    action = undefined,
    isActive = undefined,
    color
  } = buttonProps?.componentProps ?? {}

  const { dataState, disabled } = useToggleActive(isActive)

  if (!buttonProps) {
    return <></>
  }

  function createTable(options: any) {
    console.log('Creating table with options:', options)

    editor
      .chain()
      .focus()
      .insertTable({ ...options, withHeaderRow: false })
      .run()
  }

  return (
    <CreateTablePopover createTable={createTable} dataState={dataState}>
      <ActionButton
        action={action}
        color={color}
        dataState={dataState}
        icon={icon}
        isActive={isActive}
        tooltip={tooltip}
        // tooltipOptions={tooltipOptions}
        disabled={disabled}
      />
    </CreateTablePopover>
  )
}
