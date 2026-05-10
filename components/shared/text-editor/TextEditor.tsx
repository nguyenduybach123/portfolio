'use client'

import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Toolbar } from './components'
import { FC } from 'react'
import { Attachment } from './extensions/Attachment'
import { convertBase64ToBlob } from '@/utils/file'
import { EditorEditableReactive } from './EditorEditableReactive'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

const TextEditor: FC<Props> = (props) => {
  // Props
  const { value, onChange } = props

  // Extensions
  const extensions = [
    // StarterKit with excluded extensions that we'll replace with custom versions
    StarterKit.configure({
      bold: false,
      italic: false,
      strike: false,
      code: false,
      codeBlock: false,
      bulletList: false,
      orderedList: false
    }),

    // Attachment with upload config
    Attachment.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)

        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      }
    })
  ]

  // Editor
  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange?.(html)
    },
    immediatelyRender: false
  })

  if (!editor) return <div>Loading...</div>

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar />
      <EditorEditableReactive editor={editor} />
      <EditorContent editor={editor} />
    </EditorContext.Provider>
  )
}

export default TextEditor
