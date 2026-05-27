import React, { useMemo } from 'react'
import { ButtonViewReturnComponentProps } from '../../../lib/types'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { TextDirection } from '../TextDirection'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ActionButton from '../../../components/action-button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Toggle } from '@/components/ui/toggle'
import { getShortcutKey } from '@/utils/plateform'

export interface Item {
  title: string
  value?: string
  icon?: any
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

export function RichTextTextDirection() {
  const buttonProps = useButtonProps(TextDirection.name)
  const [open, setOpen] = React.useState(false)

  const { icon = undefined, tooltip = undefined, items = [], isActive = undefined } = buttonProps?.componentProps ?? {}

  const { editorDisabled, dataState } = useActive(isActive)

  const currentDir = useMemo(() => {
    return dataState?.dir || 'unset'
  }, [dataState])

  if (!buttonProps) {
    return <></>
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild disabled={editorDisabled}>
        <ActionButton
          customClass='!richtext-w-12 richtext-h-12'
          disabled={editorDisabled}
          icon={'ArrowLeftRight'}
          tooltip={tooltip}
        ></ActionButton>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='richtext-flex richtext-w-full richtext-min-w-4 richtext-flex-row richtext-gap-1 !richtext-p-[4px]'
        side='bottom'
        hideWhenDetached
      >
        {items?.map((item: any, index: any) => {
          return (
            <Tooltip key={`text-direction-${index}`}>
              <TooltipTrigger data-state={currentDir === item.value ? 'on' : 'off'} asChild>
                <Toggle
                  className='richtext-size-7 richtext-p-1'
                  onClick={() => {
                    item?.action()
                    setOpen(false)
                  }}
                  size='sm'
                ></Toggle>
              </TooltipTrigger>

              <TooltipContent className='richtext-flex richtext-flex-col richtext-items-center'>
                <span>{item.title}</span>

                {!!item.shortcutKeys?.length && (
                  <span>{item.shortcutKeys?.map((item: string) => getShortcutKey(item)).join(' ')}</span>
                )}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
