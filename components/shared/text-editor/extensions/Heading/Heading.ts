import { Heading as TiptapHeading } from '@tiptap/extension-heading'

import type { HeadingOptions as TiptapHeadingOptions } from '@tiptap/extension-heading'
import { GeneralOptions } from '../../lib/types'
import { HEADINGS } from './lib/constants'

export interface HeadingOptions extends TiptapHeadingOptions, GeneralOptions<HeadingOptions> {}

export const Heading = /* @__PURE__ */ TiptapHeading.extend<HeadingOptions>({
  //@ts-expect-error
  addOptions() {
    return {
      ...this.parent?.(),
      levels: HEADINGS,
      button({ editor, extension }) {
        const levels = extension.options?.levels || []

        const items: any[] = levels.map((level: any) => {
          const isDefault = level === 'Paragraph'

          return {
            action: () => {
              if (isDefault) {
                const currentActiveLevel: any = levels.find((lvl: any) => editor.isActive('heading', { level: lvl }))
                if (currentActiveLevel && currentActiveLevel !== 'Paragraph') {
                  editor.commands.toggleHeading({ level: currentActiveLevel })
                }
                return
              }
              editor.commands.toggleHeading({ level })
            },
            isActive: () => {
              if (isDefault) {
                return false
              }

              return editor.isActive('heading', { level }) || false
            },
            disabled: !editor.can().toggleHeading({ level }),
            title: isDefault ? 'Paragraph' : `Heading ${level}`,
            level,
            shortcutKeys: extension.options.shortcutKeys?.[level] ?? ['alt', 'mod', `${level}`],
            default: isDefault
          }
        })

        const disabled = items.filter((k: any) => k.disabled).length === items.length

        return {
          // component: HeadingButton,
          componentProps: {
            tooltip: 'Heading',
            disabled,
            items,
            icon: 'MenuDown',
            isActive: () => {
              const find: any = items?.find((k: any) => k.isActive())

              if (find && !find.default) {
                return find
              }
              const item = {
                title: 'Paragraph',
                level: 0,
                isActive: () => false
              }
              return item
            },
            levels
          }
        }
      }
    }
  }
})
