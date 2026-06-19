import { ComponentConfig } from '@puckeditor/core'
import HeadingBlock, { HeadingBlockProps } from '../components/heading-block'

export const HeadingBlockConfig: ComponentConfig<HeadingBlockProps> = {
  fields: {
    text: {
      type: 'text'
    },

    level: {
      type: 'select',

      options: [
        { label: 'H1', value: '1' },
        { label: 'H2', value: '2' },
        { label: 'H3', value: '3' },
        { label: 'H4', value: '4' },
        { label: 'H5', value: '5' },
        { label: 'H6', value: '6' }
      ]
    }
  },

  render: HeadingBlock
}