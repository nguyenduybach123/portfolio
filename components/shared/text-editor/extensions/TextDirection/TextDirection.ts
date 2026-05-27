import { Extension } from '@tiptap/core'

const TextDirection = /* @__PURE__ */ Extension.create({
  name: 'richTextTextDirection',
  addOptions() {
    return {
      ...this.parent?.(),
      directions: ['auto', 'ltr', 'rtl', 'unset'],
      defaultDirection: 'auto',
      button({ editor, extension }: { editor: any; extension: Extension }) {
        const directions = (extension.options?.directions as any[]) || []

        const iconMap = {
          auto: 'TextDirection',
          ltr: 'LeftToRight',
          rtl: 'RightToLeft',
          unset: 'X'
        } as any

        const items = directions.map((k) => ({
          title: `Text Direction: ${k}`,
          value: k,
          icon: iconMap[k],
          action: () => {
            if (k === 'unset') {
              editor.commands?.unsetTextDirection?.()
              return
            }

            editor.commands?.setTextDirection?.(k)
          },
          disabled: false
        }))

        return {
          componentProps: {
            icon: 'TextDirection',
            tooltip: 'Text Direction',
            items,
            isActive: () => editor.getAttributes('paragraph')
          }
        }
      }
    }
  }
})

export { TextDirection }
