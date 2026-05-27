import { Node } from '@tiptap/core'
import { GeneralOptions } from '../../lib/types'

export interface ClearOptions extends GeneralOptions<ClearOptions> {}

export * from './components/RichTextClear'

export const Clear = /* @__PURE__ */ Node.create<ClearOptions>({
  name: 'clear',
  //@ts-expect-error
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => ({
        // component: ActionButton,
        componentProps: {
          action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
          isActive: () => editor.can().chain().focus().clearNodes().unsetAllMarks().run(),
          icon: 'Eraser',
          tooltip: 'Clear Formatting'
        }
      })
    }
  }
})
