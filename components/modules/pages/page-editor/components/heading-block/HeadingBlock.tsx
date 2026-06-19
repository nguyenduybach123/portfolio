import { PuckComponent } from '@puckeditor/core'
import { JSX } from 'react'

export interface Props {
  text: string
  level: '1' | '2' | '3' | '4' | '5' | '6'
}

const HeadingBlock: PuckComponent<Props> = ({
  text,
  level
}: Props) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return <Tag>{text}</Tag>
}

export default HeadingBlock