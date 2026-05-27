import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditableEditor } from './stores'

// isActive (can action) => false => disable true
//                       => true => disable false
const fnActiveDefault = () => false

export function useActive(isActive = fnActiveDefault) {
  const editable = useEditableEditor()

  const [dataState, setDataState] = useState<any>(() => {
    const r = isActive()

    return typeof r === 'boolean' ? !r : r
  })
  const editor = useEditorInstance()

  useEffect(() => {
    if (!editor || !isActive) return

    const listener = () => {
      const r = isActive()

      setDataState(typeof r === 'boolean' ? !r : r)
    }

    listener()

    editor.on('selectionUpdate', listener)
    editor.on('transaction', listener)

    return () => {
      editor.off('selectionUpdate', listener)
      editor.off('transaction', listener)
    }
  }, [editor, isActive])

  const disabled = useMemo(() => {
    if (!editable || !editor) return true

    if (typeof dataState === 'boolean') {
      return dataState
    }

    return false
  }, [editable, editor, dataState])

  const editorDisabled = useMemo(() => {
    return !editable || !editor
  }, [editable, editor])

  return {
    disabled, // can not action, opacity < 1
    dataState, // true => show background, false => no background
    editorDisabled
  }
}

/**
 * export type Mark =
  | "bold"
  | "italic"
  | "strike"
  | "code"
  | "underline"
  | "superscript"
  | "subscript"
 */
// isActive (can action) => false => disable false
//                       => true => disable false
export function useToggleActive(isActive = fnActiveDefault) {
  const editable = useEditableEditor()

  const [v, setUpdate] = useState({})

  const [dataState, setDataState] = useState(isActive())
  const editor = useEditorInstance()

  useEffect(() => {
    if (!editor || !isActive) return

    const listener = () => {
      setDataState(isActive())
    }

    listener()

    editor.on('selectionUpdate', listener)

    return () => {
      editor.off('selectionUpdate', listener)
    }
  }, [v, editor, isActive])

  const disabled = useMemo(() => {
    if (!editable || !editor) return true

    return false
  }, [editable, editor])

  const editorDisabled = useMemo(() => {
    return !editable || !editor
  }, [editable, editor])

  return {
    disabled, // can not action, opacity < 1
    dataState, // true => show background, false => no background
    editorDisabled,
    update: () => setUpdate({}) // force update
  }
}

import { type Editor } from '@tiptap/core'
import { useCurrentEditor, useEditorState as useEditorStateTiptap } from '@tiptap/react'
import * as React from 'react'
import { isFunction } from 'lodash'

/**
 * Hook that provides access to a Tiptap editor instance.
 *
 * Accepts an optional editor instance directly, or falls back to retrieving
 * the editor from the Tiptap context if available. This allows components
 * to work both when given an editor directly and when used within a Tiptap
 * editor context.
 *
 * @param providedEditor - Optional editor instance to use instead of the context editor
 * @returns The provided editor or the editor from context, whichever is available
 */
export function useTiptapEditor(providedEditor?: Editor | null): {
  editor: Editor | null
  editorState?: Editor['state']
  canCommand?: Editor['can']
} {
  const { editor: coreEditor } = useCurrentEditor()
  const mainEditor = React.useMemo(() => providedEditor || coreEditor, [providedEditor, coreEditor])

  const editorState = useEditorStateTiptap({
    editor: mainEditor,
    selector(context) {
      if (!context.editor) {
        return {
          editor: null,
          editorState: undefined,
          canCommand: undefined
        }
      }

      return {
        editor: context.editor,
        editorState: context.editor.state,
        canCommand: context.editor.can
      }
    }
  })

  return editorState || { editor: null }
}

function useEditorInstance() {
  const editor = useCurrentEditor().editor
  return editor as Editor
}

function useEditorState() {
  const editorState = useTiptapEditor().editorState
  return editorState
}

function useCanCommand() {
  const canCommand = useTiptapEditor().canCommand
  return canCommand
}

export { useEditorInstance, useEditorState, useCanCommand }

export function useButtonProps(extensionName: string) {
  const editor = useEditorInstance()
  const extension = useExtension(extensionName)
  console.log('useButtonProps', { extensionName, editor, extension })

  const editorRef = React.useRef<Editor | null>(editor)
  editorRef.current = editor

  return useMemo(() => {
    const currentEditor = editorRef.current
    const currentExtension = extension

    console.log('useButtonProps useMemo', { extensionName, currentEditor, currentExtension })
    if (!currentEditor || !currentExtension) {
      return null
    }

    const { button } = currentExtension.options

    console.log('useButtonProps button', { extensionName, currentExtension: currentExtension.options })
    if (!button || !isFunction(button)) {
      return null
    }

    return button({
      editor: currentEditor,
      extension: currentExtension
    })
  }, [extensionName, extension])
}
export function useExtension(extensionName: string) {
  const editor = useEditorInstance()

  return useMemo(() => {
    if (!editor) {
      return null
    }
    const extension = editor.extensionManager.extensions.find((extension) => extension.name === extensionName)

    return extension
  }, [editor, extensionName])
}
