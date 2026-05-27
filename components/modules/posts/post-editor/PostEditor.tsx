'use client'

import { FC, useEffect } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
  content: z.string().min(1, 'Vui lòng nhập nội dung')
})

const DEFAULT_VALUES: PostFormValues = {
  title: '',
  slug: '',
  content: ''
}

type PostFormValues = z.infer<typeof formSchema>

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
  // Props
  const { mode = 'create', defaultValues = DEFAULT_VALUES, onSubmit } = props

  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
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

  const handleSubmit = (values: PostFormValues) => {
    try {
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
    <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
      <Controller
        name='title'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='space-y-1'>
            <FieldLabel htmlFor={field.name}>Title :</FieldLabel>
            <Input
              {...field}
              id={field.name}
              placeholder='Enter post title'
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
          <Field data-invalid={fieldState.invalid} className='space-y-1'>
            <FieldLabel htmlFor={field.name}>Slug :</FieldLabel>
            <Input
              {...field}
              id={field.name}
              readOnly
              placeholder='Auto-generated slug by title'
              tabIndex={-1}
              aria-readonly='true'
              aria-invalid={fieldState.invalid}
              className='bg-muted'
            />
            {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <Controller
        name='content'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className='space-y-1'>
            <FieldLabel>Content :</FieldLabel>

            <TextEditor value={field.value} onChange={field.onChange} />

            <FieldDescription>Write the article content using a text editor</FieldDescription>
            {fieldState.error ? <FieldError errors={[fieldState.error]} /> : null}
          </Field>
        )}
      />

      <div className='flex justify-end'>
        <Button type='submit'>Lưu bài viết</Button>
      </div>
    </form>
  )
}

export default PostEditor
