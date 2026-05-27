import DragHandle from '@tiptap/extension-drag-handle-react'
import { type NodeSelection } from '@tiptap/pm/state'
import { useCallback, useEffect, useState } from 'react'

import type { Editor } from '@tiptap/react'
import { useEditorInstance } from '../../lib/hooks'
import { useEditableEditor } from '../../lib/stores'
import { TextAlign } from '../../extensions/TextAlign'
import ActionButton from '../action-button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuContent,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Indent } from '../../extensions/Indent'
import { Clear } from '../../extensions/Clear'
import { IndentProps, setNodeIndentMarkup } from '../../lib/utils/indent'
import { IconComponent } from '@/components/shared'

export function RichTextBubbleMenuDragHandle() {
  const editor = useEditorInstance() as any
  const editable = useEditableEditor()

  const [currentNode, setCurrentNode] = useState<any>(null)
  const [currentNodePos, setCurrentNodePos] = useState(-1)
  const [menuOpen, setMenuOpen] = useState(false)

  const hasTextAlignExtension = editor?.extensionManager?.extensions?.some((ext: any) => ext?.name === TextAlign.name)
  const hasIndentExtension = editor?.extensionManager?.extensions?.some((ext: any) => ext?.name === Indent.name)
  const hasClearExtension = editor?.extensionManager?.extensions?.some((ext: any) => ext?.name === Clear.name)

  function resetTextFormatting() {
    const chain = editor.chain()
    chain.setNodeSelection(currentNodePos).unsetAllMarks()
    if (currentNode?.type.name !== 'paragraph') {
      chain.setParagraph()
    }
    chain.run()
  }
  function copyNodeToClipboard() {
    editor.chain().focus().setNodeSelection(currentNodePos).run()
    document.execCommand('copy')
  }
  function duplicateNode() {
    editor.commands.setNodeSelection(currentNodePos)
    const { $anchor } = editor.state.selection
    const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node
    editor
      .chain()
      .setMeta('hideDragHandle', true)
      .insertContentAt(currentNodePos + (currentNode?.nodeSize || 0), selectedNode.toJSON())
      .run()
  }
  function setTextAlign(alignments: string) {
    editor.commands.setTextAlign(alignments)
  }
  function increaseIndent() {
    const indentTr = setNodeIndentMarkup(editor.state.tr, currentNodePos, 1)
    indentTr.setMeta('hideDragHandle', true)
    if (editor.view.dispatch) editor.view.dispatch(indentTr)
  }
  function decreaseIndent() {
    const tr = setNodeIndentMarkup(editor.state.tr, currentNodePos, -1)
    if (editor.view.dispatch) editor.view.dispatch(tr)
  }

  function deleteNode() {
    editor.chain().setMeta('hideDragHandle', true).setNodeSelection(currentNodePos).deleteSelection().run()
  }

  const handleNodeChange = useCallback((data: { node: Node | null; editor: Editor; pos: number }) => {
    if (data.node) {
      setCurrentNode(data.node)
    }
    setCurrentNodePos(data.pos)
    // Force update bubble menu position
    requestAnimationFrame(() => {
      data.editor.commands.focus()
    })
  }, [])

  const handleAdd = (e: any) => {
    e.preventDefault()

    if (currentNodePos !== -1) {
      const currentNodeSize = currentNode?.nodeSize || 0
      const insertPos = currentNodePos + currentNodeSize
      const currentNodeIsEmptyParagraph = currentNode?.type.name === 'paragraph' && currentNode?.content?.size === 0
      const focusPos = currentNodeIsEmptyParagraph ? currentNodePos + 2 : insertPos + 2
      editor
        .chain()
        .command(({ dispatch, tr, state }: any) => {
          if (dispatch) {
            if (currentNodeIsEmptyParagraph) {
              tr.insertText('/', currentNodePos, currentNodePos + 1)
            } else {
              tr.insert(insertPos, state.schema.nodes.paragraph.create(null, [state.schema.text('/')]))
            }

            return dispatch(tr)
          }

          return true
        })
        .focus(focusPos)
        .run()
    }
  }

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true)
    } else {
      editor.commands.setMeta('lockDragHandle', false)
    }

    return () => {
      editor.commands.setMeta('lockDragHandle', false)
    }
  }, [menuOpen])

  const handleMenuOpenChange = (open: any) => {
    if (!editable) {
      return
    }
    setMenuOpen(open)
  }

  return (
    <DragHandle
      className='richtext-transition-all richtext-duration-200 richtext-ease-out'
      editor={editor}
      onNodeChange={handleNodeChange as any}
      pluginKey={'RichTextBubbleMenuDragHandle'}
    >
      <div className='richtext-flex richtext-items-center richtext-gap-0.5'>
        <ActionButton action={handleAdd} disabled={!editable} icon='Plus' tooltip={'Insert Block'} />

        <ActionButton
          disabled={!editable}
          icon='Grip'
          tooltip={'Grip'}
          action={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleMenuOpenChange(!menuOpen)
          }}
        />

        <DropdownMenu onOpenChange={handleMenuOpenChange} open={menuOpen}>
          <DropdownMenuTrigger className='richtext-pointer-events-none' />

          <DropdownMenuContent align='start' className='richtext-w-48' hideWhenDetached side='bottom' sideOffset={0}>
            <DropdownMenuItem
              className='richtext-flex richtext-gap-3 richtext-bg-opacity-10 hover:richtext-bg-red-400 hover:richtext-bg-opacity-20 focus:richtext-bg-red-400 focus:richtext-bg-opacity-30 focus:richtext-text-red-500 dark:hover:richtext-bg-opacity-20 dark:hover:richtext-text-red-500'
              onClick={deleteNode}
            >
              <IconComponent icon='Trash2' />

              <span>Remove</span>
            </DropdownMenuItem>

            {hasClearExtension ? (
              <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={resetTextFormatting}>
                <IconComponent icon='PaintRoller' />

                <span>Clear Formatting</span>
              </DropdownMenuItem>
            ) : null}

            <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={copyNodeToClipboard}>
              <IconComponent icon='Clipboard' />

              <span>Copy to Clipboard</span>
            </DropdownMenuItem>

            <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={duplicateNode}>
              <IconComponent icon='Copy' />

              <span>Duplicate</span>
            </DropdownMenuItem>

            {hasTextAlignExtension || hasIndentExtension ? <DropdownMenuSeparator /> : null}

            {hasTextAlignExtension ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='richtext-flex richtext-gap-3'>
                  <IconComponent icon='TextAlignCenter' />

                  <span>Text Align</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={() => setTextAlign('left')}>
                      <IconComponent icon='TextAlignStart' />

                      <span>Text Align Left</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={() => setTextAlign('center')}>
                      <IconComponent icon='TextAlignCenter' />

                      <span>Text Align Center</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className='richtext-flex richtext-gap-3' onClick={() => setTextAlign('right')}>
                      <IconComponent icon='TextAlignEnd' />

                      <span>Text Align Right</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : null}

            {hasIndentExtension ? (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className='richtext-flex richtext-gap-3'>
                  <IconComponent icon='ListIndentDecrease' />

                  <span>Indent Decrease</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      className='richtext-flex richtext-gap-3'
                      disabled={currentNode?.attrs?.indent >= IndentProps.max}
                      onClick={increaseIndent}
                    >
                      <IconComponent icon='ListIndentIncrease' />

                      <span>Indent Increase</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className='richtext-flex richtext-gap-3'
                      disabled={currentNode?.attrs?.indent <= IndentProps.min}
                      onClick={decreaseIndent}
                    >
                      <IconComponent icon='ListIndentDecrease' />

                      <span>Indent Decrease</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </DragHandle>
  )
}
