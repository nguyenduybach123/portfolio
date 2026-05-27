import CodeBlockLowlight, { type CodeBlockLowlightOptions } from '@tiptap/extension-code-block-lowlight'
import { GeneralOptions } from '../../lib/types'

export interface CodeBlockOptions extends CodeBlockLowlightOptions, GeneralOptions<CodeBlockOptions> {}

export const CodeBlock = CodeBlockLowlight.extend<CodeBlockOptions>({
  //@ts-expect-error
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => {
        return {
          componentProps: {
            action: () => editor.chain().focus().setCodeBlock({ language: 'plaintext' }).run(),
            isActive: () => editor.isActive('codeBlock'),
            disabled: false,
            icon: 'Code',
            tooltip: 'Code Block'
          }
        }
      }
    }
  }
})
