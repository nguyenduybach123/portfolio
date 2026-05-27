import React, { Fragment, useMemo } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ButtonViewReturnComponentProps } from '../../../lib/types'
import { FontSize } from '../FontSize'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { ActionMenuButton } from '../../../components'

export interface Item {
  title: string
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

export function RichTextFontSize() {
  const buttonProps = useButtonProps(FontSize.name)

  const { icon = undefined, tooltip = undefined, items = [], isActive = undefined } = buttonProps?.componentProps ?? {}

  const { disabled, dataState } = useActive(isActive)

  const title = useMemo(() => {
    return (dataState as any)?.title || 'Default'
  }, [dataState])

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

      <DropdownMenuContent className='richtext-max-h-96 richtext-w-32 richtext-overflow-y-auto'>
        {items?.map((item: any, index: any) => {
          return (
            <Fragment key={`font-size-${index}`}>
              <DropdownMenuCheckboxItem checked={title === item.title} onClick={item.action}>
                <div className='richtext-ml-1 richtext-h-full'>{item.title}</div>
              </DropdownMenuCheckboxItem>

              {item.title === 'Default' && <DropdownMenuSeparator />}
            </Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
