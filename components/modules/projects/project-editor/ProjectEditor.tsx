'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { DEFAULT_PROJECT_FORM_VALUES, PROJECT_FORM_SCHEMA, ProjectFormValues } from './lib/constants'

function FormField({
  label,
  description,
  error,
  children
}: {
  label: string
  description?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className='space-y-2'>
      <Label className='text-sm font-medium'>{label}</Label>
      {description && <p className='text-xs text-muted-foreground'>{description}</p>}
      {children}
      {error && (
        <div className='flex items-center gap-2 text-xs text-destructive'>
          <AlertCircle className='h-3.5 w-3.5' />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default function ProjectEditor() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(PROJECT_FORM_SCHEMA),
    mode: 'onBlur',
    defaultValues: DEFAULT_PROJECT_FORM_VALUES
  })

  const onSubmit = (data: ProjectFormValues) => {
    console.log('[v0] Form submitted:', data)
    toast.success('Project saved successfully!', {
      description: data.title
    })
  }

  const handleCancel = () => {
    form.reset()
    toast('Form cleared', {
      description: 'All fields have been reset.'
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-6 py-12 pb-32'>
        <div className='grid grid-cols-[1fr_0.4fr] gap-12'>
          {/* Left Column - 70% */}
          <div className='space-y-8'>
            {/* Title */}
            <Controller
              name='title'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Title' description='The name of your project' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='title'
                    placeholder='e.g., AI Chat Dashboard'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Description */}
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField
                  label='Description'
                  description='Detailed overview of the project'
                  error={fieldState.error?.message}
                >
                  <Textarea
                    {...field}
                    id='description'
                    placeholder='Describe your project in detail...'
                    rows={4}
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Technologies */}
            <Controller
              name='technologies'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField
                  label='Technologies'
                  description='List the tech stack (comma-separated)'
                  error={fieldState.error?.message}
                >
                  <Input
                    {...field}
                    id='technologies'
                    placeholder='e.g., React, Next.js, TypeScript, Tailwind CSS'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Responsibilities */}
            <Controller
              name='responsibilities'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField
                  label='Responsibilities'
                  description='Your role and contributions to this project'
                  error={fieldState.error?.message}
                >
                  <Textarea
                    {...field}
                    id='responsibilities'
                    placeholder='Describe your key responsibilities and contributions...'
                    rows={4}
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />
          </div>

          {/* Right Column - 30% */}
          <div className='space-y-8'>
            {/* Type */}
            <Controller
              name='type'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Type' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='type'
                    placeholder='e.g., Web App, Mobile, Design'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Category */}
            <Controller
              name='category'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Category' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='category'
                    placeholder='e.g., Frontend, Full Stack, Design'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Featured */}
            <Controller
              name='featured'
              control={form.control}
              render={({ field }) => (
                <div className='flex items-center justify-between rounded-lg border border-border bg-card p-3'>
                  <div>
                    <Label htmlFor='featured' className='cursor-pointer text-sm font-medium'>
                      Featured
                    </Label>
                    <p className='mt-0.5 text-xs text-muted-foreground'>Show on homepage</p>
                  </div>
                  <Switch id='featured' checked={field.value} onCheckedChange={field.onChange} />
                </div>
              )}
            />

            {/* Start Date */}
            <Controller
              name='startDate'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Start Date' error={fieldState.error?.message}>
                  <Input {...field} id='startDate' type='date' aria-invalid={fieldState.invalid} />
                </FormField>
              )}
            />

            {/* End Date */}
            <Controller
              name='endDate'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='End Date' error={fieldState.error?.message}>
                  <Input {...field} id='endDate' type='date' aria-invalid={fieldState.invalid} />
                </FormField>
              )}
            />

            {/* GitHub URL */}
            <Controller
              name='githubUrl'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='GitHub URL' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='githubUrl'
                    placeholder='https://github.com/user/repo'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Demo URL */}
            <Controller
              name='demoUrl'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Demo URL' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='demoUrl'
                    placeholder='https://project-demo.com'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />

            {/* Image URL */}
            <Controller
              name='imageUrl'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='Image URL' error={fieldState.error?.message}>
                  <Input
                    {...field}
                    id='imageUrl'
                    placeholder='https://example.com/image.jpg'
                    aria-invalid={fieldState.invalid}
                  />
                </FormField>
              )}
            />
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className='sticky bottom-0 left-0 right-0 border-t border-border bg-card'>
        <div className='mx-auto flex max-w-7xl justify-end gap-3 px-6 py-4'>
          <Button type='button' variant='outline' onClick={handleCancel} className='min-w-[100px]'>
            Cancel
          </Button>
          <Button type='submit' className='min-w-[100px]'>
            Save Project
          </Button>
        </div>
      </div>
    </form>
  )
}
