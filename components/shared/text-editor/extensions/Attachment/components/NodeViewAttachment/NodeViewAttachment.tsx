import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'

import { extractFileExtension, extractFilename, normalizeFileSize } from '@/utils/file'

import { getFileTypeIcon } from './FileIcon'

import styles from './index.module.scss'
import { useEditableEditor } from '@/components/shared/text-editor/lib/stores'
import ActionButton from '@/components/shared/text-editor/components/action-button'

export function NodeViewAttachment({ editor, node, updateAttributes, deleteNode, extension }: NodeViewProps) {
  const $upload: any = useRef<HTMLInputElement>(null)

  const isEditable = useEditableEditor()

  const { hasTrigger, fileName, fileSize, fileExt, fileType, url, error } = node.attrs
  const [loading, setLoading] = useState(false)

  const upload = extension?.options?.upload

  const selectFile = useCallback(() => {
    if (!isEditable || url) return

    $upload.current.click()
  }, [url, isEditable])

  const handleFile = useCallback(
    async (e: any) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return

      const fileInfo = {
        fileName: extractFilename(file.name),
        fileSize: file.size,
        fileType: file.type,
        fileExt: extractFileExtension(file.name)
      }

      setLoading(true)

      try {
        const url = await upload(file)
        updateAttributes({ ...fileInfo, url })
        setLoading(false)
      } catch (error: any) {
        updateAttributes({
          error: `File upload fail: ${error && error.message}`
        })
        setLoading(false)

        $upload.current.value = ''
      }
    },
    [setLoading, updateAttributes]
  )

  useEffect(() => {
    if (!url && !hasTrigger) {
      selectFile()
      updateAttributes({ hasTrigger: true })
    }
  }, [url, hasTrigger, selectFile, updateAttributes])

  const onDeleteAttachment = useCallback(() => deleteNode(), [editor])

  if (isEditable && !url) {
    return (
      <NodeViewWrapper>
        <div className={clsx(styles.wrap, 'render-wrapper')}>
          <p onClick={selectFile} style={{ cursor: 'pointer' }}>
            {loading ? <span>Uploading...</span> : <span>Please upload a file</span>}
          </p>

          <input hidden onChange={handleFile} ref={$upload} type='file' />
        </div>
      </NodeViewWrapper>
    )
  }

  if (url) {
    return (
      <NodeViewWrapper>
        <div className={clsx(styles.wrap, 'render-wrapper')} onClick={selectFile}>
          <div className='richtext-flex richtext-items-center richtext-gap-[4px]'>
            <span>
              {fileName}.{fileExt}
            </span>

            <span>({normalizeFileSize(fileSize)})</span>
          </div>

          <ActionButton action={onDeleteAttachment} icon='Trash2' tooltip='Delete' />
        </div>
      </NodeViewWrapper>
    )
  }

  if (error !== 'null') {
    return (
      <NodeViewWrapper>
        <div className={clsx(styles.wrap, 'render-wrapper')} onClick={selectFile}>
          <p>{error}</p>
        </div>
      </NodeViewWrapper>
    )
  }

  return <></>
}
