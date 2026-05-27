import React, { Fragment, useMemo } from 'react'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ButtonViewReturnComponentProps } from '../../../lib/types'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { FontFamily } from '../FontFamily'
import { ActionMenuButton } from '../../../components'

export interface Item {
  title: string
  icon?: any
  font?: string
  isActive: NonNullable<ButtonViewReturnComponentProps['isActive']>
  action?: ButtonViewReturnComponentProps['action']
  style?: React.CSSProperties
  shortcutKeys?: string[]
  disabled?: boolean
  divider?: boolean
  default?: boolean
}

export function RichTextFontFamily() {
  const buttonProps = useButtonProps(FontFamily.name)

  const { icon = undefined, tooltip = undefined, items = [], isActive = undefined } = buttonProps?.componentProps ?? {}

  const { disabled, dataState } = useActive(isActive)

  const title = useMemo(() => {
    return dataState?.font || 'Default'
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
          title={title?.length > 12 ? `${title?.slice(0, 12)}...` : title}
          tooltip={tooltip}
          // tooltipOptions={tooltipOptions}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className='richtext-w-full'>
        {items?.map((item: any, index: any) => {
          const style = item.font === 'Default' ? {} : { fontFamily: item.font }

          return (
            <Fragment key={`font-family-${index}`}>
              <DropdownMenuCheckboxItem checked={title === item.font} onClick={item.action}>
                <div className='richtext-ml-1 richtext-h-full' style={style}>
                  {item.font}
                </div>
              </DropdownMenuCheckboxItem>

              {item.font === 'Default' && <DropdownMenuSeparator />}
            </Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
