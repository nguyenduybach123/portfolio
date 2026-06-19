'use client'

import { FC, useEffect } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'

// Thay đổi path import theo cấu trúc thư mục thực tế của bạn
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea' // Thêm Textarea
import { Switch } from '@/components/ui/switch' // Thêm Switch
import { TextEditor } from '@/components/shared'
import { toast } from 'sonner'

interface Props {
  mode?: 'create' | 'edit'
  defaultValues?: PostFormValues
  onSubmit?: (values: PostFormValues) => void
}

const formSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  slug: z.string().min(1, 'Slug không được để trống'),
  summary: z.string().optional(),
  content: z.string().min(1, 'Vui lòng nhập nội dung'),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false)
})

export type PostFormValues = z.infer<typeof formSchema>

const DEFAULT_VALUES: PostFormValues = {
  title: '',
  slug: '',
  summary: '',
  content: '',
  thumbnail: '',
  tags: [],
  featured: false
}

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

const PostEditor: FC<Props> = (props) => {
  const { mode = 'create', defaultValues = DEFAULT_VALUES, onSubmit } = props

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: { ...DEFAULT_VALUES, ...defaultValues },
    mode: 'onChange'
  })

  const title = useWatch({
    control: form.control,
    name: 'title'
  })

  useEffect(() => {
    const nextSlug = slugify(title ?? '')
    const currentSlug = form.getValues('slug')

    if (currentSlug !== nextSlug) {
      form.setValue('slug', nextSlug, {
        shouldDirty: true,
        shouldTouch: false,
        shouldValidate: true
      })
    }
  }, [title, form])

  const handleSubmit: SubmitHandler<PostFormValues> = (values) => {
    try {
      console.log('Form values:', values)
      onSubmit?.(values)
      if (mode === 'create') {
        form.reset()
        toast.success('Bài viết đã được tạo thành công')
      } else {
        toast.success('Bài viết đã được cập nhật thành công')
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.')
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit as any)}
      className='grid grid-cols-1 items-start gap-8 xl:grid-cols-3'
    >
      {/* CỘT TRÁI: Nội dung chính */}
      <div className='space-y-6 xl:col-span-2'>
        <div className='space-y-6 bg-background p-6'>
          <Controller
            name='title'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder='Enter the article title...'
                  aria-invalid={fieldState.invalid}
                  autoComplete='off'
                />
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />

          <Controller
            name='slug'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  readOnly
                  placeholder='Auto-generated slug...'
                  tabIndex={-1}
                  aria-readonly='true'
                  aria-invalid={fieldState.invalid}
                  className='bg-muted text-muted-foreground'
                />
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />

          <Controller
            name='summary'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel htmlFor={field.name}>Summary</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder='Enter a brief summary of the article...'
                  className='h-24 resize-none'
                />
                <FieldDescription>A short description displayed on the article list page.</FieldDescription>
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />

          <Controller
            name='content'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel>Content</FieldLabel>
                <TextEditor value={field.value} onChange={field.onChange} />
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />
        </div>
      </div>

      {/* CỘT PHẢI: Meta Data (Sticky) */}
      <div className='sticky top-1 space-y-6'>
        <div className='space-y-6 bg-background py-6'>
          <Controller
            name='thumbnail'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel htmlFor={field.name}>Thumbnail URL</FieldLabel>
                <Input {...field} id={field.name} placeholder='https://example.com/image.jpg' />
                {/* Bạn có thể thay thế bằng component ImageUpload nếu có */}
                {field.value && (
                  <div className='mt-2 aspect-video w-full overflow-hidden rounded-md border bg-muted'>
                    <img
                      src={field.value}
                      alt='Thumbnail preview'
                      className='h-full w-full object-cover'
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />

          <Controller
            name='tags'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='space-y-2'>
                <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                <Input
                  id={field.name}
                  placeholder='react, nextjs, tailwind...'
                  value={field.value?.join(', ') || ''}
                  onChange={(e) => {
                    // Chuyển chuỗi phân tách bằng dấu phẩy thành mảng
                    const val = e.target.value
                    field.onChange(val ? val.split(',').map((t) => t.trim()) : [])
                  }}
                />
                <FieldDescription>Ngăn cách các tag bằng dấu phẩy (,)</FieldDescription>
                {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
              </Field>
            )}
          />

          <Controller
            name='featured'
            control={form.control}
            render={({ field }) => (
              <div className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FieldLabel className='text-base'>Featured Post</FieldLabel>
                  <FieldDescription>Highlight this article.</FieldDescription>
                </div>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </div>
            )}
          />
        </div>

        {/* Nút Submit nằm gọn trong sidebar */}
        <Button type='submit' className='w-full' size='lg'>
          {mode === 'create' ? 'Publish Post' : 'Save Changes'}
        </Button>
      </div>
    </form>
  )
}

export default PostEditor
