import TiptapUnderline from '@tiptap/extension-underline'

import type { UnderlineOptions as TiptapUnderlineOptions } from '@tiptap/extension-underline'
import { GeneralOptions } from '../../lib/types'

export * from './components/RichTextUnderline'

export interface UnderlineOptions extends TiptapUnderlineOptions, GeneralOptions<UnderlineOptions> {}

export const TextUnderline = /* @__PURE__ */ TiptapUnderline.extend<UnderlineOptions>({
  //@ts-expect-error
  addOptions() {
    return {
      ...this.parent?.(),
      button({ editor, extension }: any) {
        return {
          componentProps: {
            action: () => editor.commands.toggleUnderline(),
            isActive: () => editor.isActive('underline') || false,
            disabled: false,
            icon: 'Underline',
            shortcutKeys: extension.options.shortcutKeys ?? ['mod', 'U'],
            tooltip: 'Underline'
          }
        }
      }
    }
  }
})
