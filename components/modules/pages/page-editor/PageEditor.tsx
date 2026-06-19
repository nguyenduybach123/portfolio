'use client'

import type { Config, WithPuckProps } from '@puckeditor/core'
import { Puck } from '@puckeditor/core'
// @ts-ignore
import '@puckeditor/core/puck.css'

interface HeadingBlockProps {
  children: string
}

export const puckConfig: Config = {
  categories: {
    layout: {
      title: 'Layout'
    },
    content: {
      title: 'Content'
    },
    media: {
      title: 'Media'
    },
    portfolio: {
      title: 'Portfolio'
    }
  },

  components: {
    Hero: HeroBlock,
    Heading: HeadingBlock,
    Text: TextBlock,
    Image: ImageBlock,
    ProjectList: ProjectListBlock
  }
}
const initialData: any = {}

const save = (data: any) => {}

const PageEditor = () => {
  return <Puck config={config} data={initialData} onPublish={save} />
}

export default PageEditor
