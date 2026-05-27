import React, { useMemo } from 'react'
import { ButtonViewReturnComponentProps } from '../../../lib/types'
import { TextAlign } from '../TextAlign'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ActionButton from '../../../components/action-button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Toggle } from '@/components/ui/toggle'
import { getShortcutKey } from '@/utils/plateform'

export interface Item {
  title: string
  icon?: any
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

export function RichTextAlign() {
  const [open, setOpen] = React.useState(false)
  const buttonProps = useButtonProps(TextAlign.name)

  const { icon = undefined, tooltip = undefined, items = [], isActive = undefined } = buttonProps?.componentProps ?? {}

  const { disabled, dataState } = useActive(isActive)

  const currentAlign = useMemo(() => {
    return dataState?.title || ''
  }, [dataState])

  const hasAlign = useMemo(() => {
    return items?.some((item: Item) => item.title === currentAlign)
  }, [items, currentAlign])

  if (!buttonProps) {
    return <></>
  }

  return (
    <Popover modal onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        asChild
        className='hover:richtext-bg-accent data-[state=on]:richtext-bg-accent'
        data-state={hasAlign ? 'on' : 'off'} // active background control
        disabled={disabled}
      >
        <ActionButton
          customClass='!richtext-w-12 richtext-h-12'
          disabled={disabled}
          icon={'TextAlignJustify'}
          tooltip={tooltip}
          // tooltipOptions={tooltipOptions}
        ></ActionButton>
      </PopoverTrigger>

      <PopoverContent
        align='start'
        className='richtext-flex richtext-w-full richtext-min-w-4 richtext-flex-row richtext-gap-1 !richtext-p-[4px]'
        side='bottom'
      >
        {items?.map((item: any, index: any) => {
          return (
            <Tooltip key={`text-align-${index}`}>
              <TooltipTrigger asChild>
                <Toggle
                  className='richtext-size-7 richtext-p-1'
                  data-state={currentAlign === item.title ? 'on' : 'off'}
                  size='sm'
                  onClick={() => {
                    item?.action()
                    setOpen(false)
                  }}
                ></Toggle>
              </TooltipTrigger>

              <TooltipContent className='richtext-flex richtext-flex-col richtext-items-center'>
                <span>{item.title}</span>

                {!!item.shortcutKeys?.length && (
                  <span>{item.shortcutKeys?.map((key: string) => getShortcutKey(key)).join(' ')}</span>
                )}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
