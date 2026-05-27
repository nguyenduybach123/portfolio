import React, { Fragment, useMemo } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'
import { getShortcutKey } from '@/utils/plateform'
import { Button } from '@/components/ui/button'
import { ButtonViewReturnComponentProps } from '../../../lib/types'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { Heading } from '../Heading'
import { ActionMenuButton } from '../../../components'

export interface Item {
  title: string
  icon?: any
  level?: number
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

export function RichTextHeading() {
  const buttonProps = useButtonProps(Heading.name)

  const { icon = undefined, tooltip = undefined, isActive = undefined, items = [] } = buttonProps?.componentProps ?? {}

  const { disabled, dataState } = useActive(isActive)

  const title = useMemo(() => {
    return (dataState as any)?.title || 'Paragraph'
  }, [dataState])

  console.log('RichTextHeading:', buttonProps)
  if (!buttonProps) {
    return <></>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        <ActionMenuButton
          disabled={disabled}
          icon={icon}
          title={title}
          tooltip={tooltip}
          // tooltipOptions={tooltipOptions}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='richtext-w-full'>
        {items?.map((item: any, index: any) => {
          return (
            <Fragment key={`heading-k-${index}`}>
              <DropdownMenuCheckboxItem checked={title === item.title} onClick={item.action}>
                <div
                  className={cn('richtext-ml-1 richtext-h-full', {
                    '': item.level === 'Paragraph',
                    'heading-1': item.level === 1,
                    'heading-2': item.level === 2,
                    'heading-3': item.level === 3,
                    'heading-4': item.level === 4,
                    'heading-5': item.level === 5,
                    'heading-6': item.level === 6
                  })}
                >
                  {item.title}
                </div>

                {!!item?.shortcutKeys?.length && (
                  <DropdownMenuShortcut className='pl-4'>
                    {item?.shortcutKeys?.map((item: any) => getShortcutKey(item)).join(' ')}
                  </DropdownMenuShortcut>
                )}
              </DropdownMenuCheckboxItem>

              {item.level === 'Paragraph' && <DropdownMenuSeparator />}
            </Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
