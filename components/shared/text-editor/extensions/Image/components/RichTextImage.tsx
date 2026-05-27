import { useMemo, useRef, useState } from 'react'
import { useButtonProps, useEditorInstance, useExtension, useToggleActive } from '../../../lib/hooks'
import { DEFAULT_OPTIONS, Image } from '../Image'
import { validateFiles } from '../../../lib/utils'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ActionButton from '../../../components/action-button'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderIcon } from 'lucide-react'
import { ImageCropper } from './ImageCropper'
import { Separator } from '@/components/ui/separator'

export function RichTextImage() {
  const editor = useEditorInstance()
  const buttonProps = useButtonProps(Image.name)

  const { icon, tooltip } = buttonProps?.componentProps ?? {}

  const { editorDisabled } = useToggleActive()

  const [open, setOpen] = useState(false)

  const [isUploading, setIsUploading] = useState(false)
  const extension = useExtension(Image.name)

  const [link, setLink] = useState<string>('')
  const [alt, setAlt] = useState<string>('')
  const fileInput = useRef<HTMLInputElement>(null)

  const defaultInline = extension?.options.defaultInline || false

  const [imageInline, setImageInline] = useState(defaultInline)

  const uploadOptions = useMemo(() => {
    const uploadOptions = extension?.options

    return uploadOptions || DEFAULT_OPTIONS
  }, [extension])

  async function handleFile(event: any) {
    const files = event?.target?.files
    if (!editor || editor.isDestroyed || files.length === 0 || isUploading) {
      event.target.value = ''
      return
    }

    const validFiles = validateFiles(files, {
      acceptMimes: uploadOptions?.acceptMimes,
      maxSize: uploadOptions?.maxSize,
      onError: uploadOptions.onError
    })

    if (validFiles.length <= 0) {
      event.target.value = ''
      return
    }

    setIsUploading(true)
    try {
      if (uploadOptions?.multiple) {
        // Handle multiple files upload
        const uploadPromises = validFiles.map(async (file) => {
          let src = ''
          if (uploadOptions.upload) {
            src = await uploadOptions.upload(file)
          } else {
            src = URL.createObjectURL(file)
          }
          return src
        })

        const srcs = await Promise.all(uploadPromises)
        // Insert all images (you might want to adjust this based on your editor's capabilities)
        srcs.forEach((src) => {
          editor.chain().focus().setImageInline({ src, inline: imageInline, alt }).run()
        })
      } else {
        // Single file upload (take the first valid file)
        const file = validFiles[0]
        let src = ''
        if (uploadOptions.upload) {
          src = await uploadOptions.upload(file)
        } else {
          src = URL.createObjectURL(file)
        }
        editor.chain().focus().setImageInline({ src, inline: imageInline, alt }).run()
      }

      setOpen(false)
      setAlt('')
      setImageInline(defaultInline)
    } catch (error) {
      console.error('Error uploading image', error)
      if (uploadOptions.onError) {
        uploadOptions.onError({
          type: 'upload',
          message: 'Error uploading image'
        })
      } else {
        console.warn('Error uploading image')
      }
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }
  }

  function handleLink(e: any) {
    e.preventDefault()
    e.stopPropagation()

    editor.chain().focus().setImageInline({ src: link, inline: imageInline, alt }).run()
    setOpen(false)
    setImageInline(defaultInline)
    setLink('')
    setAlt('')
  }

  function handleClick(e: any) {
    e.preventDefault()
    fileInput.current?.click()
  }

  if (!buttonProps) {
    return <></>
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <ActionButton
          disabled={editorDisabled}
          icon={icon}
          tooltip={tooltip}
          action={() => {
            if (editorDisabled) return
            setOpen(true)
          }}
        />
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Upload</DialogTitle>

        <Tabs
          activationMode='manual'
          defaultValue={
            uploadOptions.resourceImage === 'both' || uploadOptions.resourceImage === 'upload' ? 'upload' : 'link'
          }
          className='space-y-2'
        >
          {uploadOptions.resourceImage === 'both' && (
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value='upload'>Upload</TabsTrigger>
              <TabsTrigger value='link'>URL</TabsTrigger>
            </TabsList>
          )}

          <div className='richtext-my-[10px] richtext-flex richtext-items-center richtext-gap-[4px]'>
            <Checkbox
              checked={imageInline}
              onCheckedChange={(v) => {
                setImageInline(v as boolean)
              }}
            />

            <Label className='ml-1'>Inline</Label>
          </div>

          {uploadOptions.enableAlt && (
            <div className='richtext-my-[10px]'>
              <Label className='mb-[6px]'>Alt</Label>

              <Input onChange={(e) => setAlt(e.target.value)} required type='text' value={alt} />
            </div>
          )}

          <TabsContent value='upload'>
            <div className='richtext-flex richtext-items-center richtext-gap-[10px] mt-3'>
              <Button className='richtext-mt-1 richtext-w-full' disabled={isUploading} onClick={handleClick} size='sm'>
                {isUploading ? (
                  <>
                    Uploading
                    <LoaderIcon className='richtext-ml-2 richtext-animate-spin' />
                  </>
                ) : (
                  'Upload'
                )}
              </Button>

              <Separator orientation='vertical' className='mx-2 my-auto h-6' />

              <ImageCropper
                alt={alt}
                disabled={isUploading}
                editor={editor}
                imageInline={imageInline}
                onClose={() => {
                  setAlt('')
                }}
              />
            </div>

            <input
              // accept="image/*"
              accept={uploadOptions.acceptMimes.join(',') || 'image/*'}
              multiple={uploadOptions.multiple}
              onChange={handleFile}
              ref={fileInput}
              style={{ display: 'none' }}
              type='file'
            />
          </TabsContent>

          <TabsContent value='link'>
            <form onSubmit={handleLink}>
              <div className='richtext-flex richtext-items-center richtext-gap-2'>
                <Input
                  autoFocus
                  onChange={(e) => setLink(e.target.value)}
                  placeholder='Enter image URL'
                  required
                  type='url'
                  value={link}
                />

                <Button type='submit'>Apply</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
