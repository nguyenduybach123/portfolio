import { useEffect, useState } from 'react'
import { useActive, useButtonProps } from '../../../lib/hooks'
import { Color } from '../Color'
import { ColorPicker } from '@/components/shared'
import ActionButton from '../../../components/action-button'
import ColorFillIcon from '@/components/icons/color-fill-icon'

export function RichTextColor() {
  const buttonProps = useButtonProps(Color.name)

  const {
    tooltip = undefined,
    isActive = undefined,
    defaultColor = undefined,
    colors,
    action
  } = buttonProps?.componentProps ?? {}

  const { disabled, dataState } = useActive(isActive)

  const [selectedColor, setSelectedColor] = useState<any>(defaultColor)

  useEffect(() => {
    setSelectedColor(dataState)
  }, [dataState])

  function onChange(color: any) {
    if (disabled) return

    if (action) {
      action?.(color)
      setSelectedColor(color)
    }
  }

  console.log('RichTextColor:', buttonProps)
  if (!buttonProps) {
    return <></>
  }

  return (
    <ColorPicker colors={colors} disabled={disabled} onChange={onChange} value={selectedColor}>
      <ActionButton
        disabled={disabled}
        tooltip={tooltip}
        // tooltipOptions={tooltipOptions}
      >
        <span className='richtext-flex richtext-items-center richtext-justify-center richtext-gap-[4px] richtext-text-sm'>
          <ColorFillIcon fill={dataState} />
        </span>
      </ActionButton>
    </ColorPicker>
  )
}
