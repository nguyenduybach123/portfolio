'use client'

import { useEditor, EditorContent, EditorContext } from '@tiptap/react'
import { Document } from '@tiptap/extension-document'
import '../../../styles/editor/index.scss'

import { Toolbar } from './components'
import { FC, useMemo } from 'react'
import { Attachment } from './extensions/Attachment'
import { convertBase64ToBlob } from '@/utils/file'
import { EditorEditableReactive } from './EditorEditableReactive'
import { CodeBlock } from './extensions/CodeBlock'
import { createLowlight } from 'lowlight'
import { FontFamily } from './extensions/FontFamily'
import { FontSize } from './extensions/FontSize'
import { Heading } from './extensions/Heading'
import { TaskList } from './extensions/TaskList'
import { TextAlign } from './extensions/TextAlign'
import { TextDirection } from './extensions/TextDirection'
import { TextUnderline } from './extensions/TextUnderline'
import { Image } from './extensions/Image'
import { Table } from './extensions/Table'
import { Color } from './extensions/Color'
import { Column } from './extensions/Column'
import { SearchAndReplace } from './extensions/SearchAndReplace'
import { Italic } from './extensions/Italic'
import { Blockquote } from './extensions/Blockquote'
import { Bold } from './extensions/Bold'
import { Clear } from './extensions/Clear'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { RichTextBubbleMenuDragHandle } from './components/bubble'
import { TextStyle } from '@tiptap/extension-text-style'

const lowlight = createLowlight()
interface Props {
  value?: string
  onChange?: (value: string) => void
}

const TextEditor: FC<Props> = (props) => {
  // Props
  const { value, onChange } = props

  // Extensions
  const extensions = useMemo(
    () => [
      Document,
      Paragraph,
      Text,
      Attachment.configure({
        upload: (file: any) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)

          return new Promise((resolve) => {
            setTimeout(() => {
              const blob = convertBase64ToBlob(reader.result as string)
              resolve(URL.createObjectURL(blob))
            }, 300)
          })
        }
      }),
      Image.configure({
        upload: (files: File) => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(URL.createObjectURL(files))
            }, 300)
          })
        }
      }),
      CodeBlock.configure({
        lowlight
      }),
      Color,
      FontFamily,
      FontSize,
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6]
      }),
      TaskList,
      TextAlign.configure({
        types: ['paragraph', 'heading']
      }),
      TextDirection,
      TextUnderline,
      Column,
      Table,
      SearchAndReplace,
      Italic,
      Bold,
      Blockquote,
      Clear,
      TextStyle
    ],
    []
  )

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
      <div className='reactjs-tiptap-editor'>
        <div className='overflow-hidden rounded-[0.5rem] bg-background outline outline-1 outline-border'>
          <Toolbar />
          <EditorEditableReactive editor={editor} />
          <div className='m-2 flex-1 overflow-auto rounded-[0.25rem] p-2' data-placeholder='Start typing...'>
            <EditorContent editor={editor} />
          </div>

          {/* Bubble */}
          {/* <RichTextBubbleMenuDragHandle /> */}
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default TextEditor
