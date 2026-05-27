import { FC, HTMLAttributes } from 'react'
import { icons } from 'lucide-react'

interface Props extends HTMLAttributes<SVGElement> {
  icon: IconName
}

export type IconName = keyof typeof icons

const IconComponent: FC<Props> = (props) => {
  // Props
  const { icon: iconName, ...restProps } = props

  const Icon = icons[iconName]

  // Template
  return <Icon {...restProps} />
}

export default IconComponent
