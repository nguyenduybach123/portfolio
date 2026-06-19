'use client'
import { z } from 'zod'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

import SettingsCard from '../setting-card'

export const generalSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),

  siteDescription: z.string().optional(),

  postsPerPage: z.coerce.number().min(1, 'Minimum 1 post').max(100, 'Maximum 100 posts'),

  draftMode: z.boolean(),

  scheduledPosts: z.boolean(),

  homeUrl: z.url(),

  adminUrl: z.url()
})

export type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>

interface GeneralTabProps {
  onChange: () => void
}

const defaultValues: GeneralSettingsValues = {
  siteName: 'My Awesome CMS',

  siteDescription: 'A powerful content management system for modern web applications',

  postsPerPage: 10,

  draftMode: false,

  scheduledPosts: true,

  homeUrl: 'https://example.com',

  adminUrl: 'https://example.com/admin'
}

export default function GeneralTab({ onChange }: GeneralTabProps) {
  const {
    register,
    control,
    formState: { errors, isDirty }
  } = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema) as any,
    defaultValues
  })

  useEffect(() => {
    if (isDirty) {
      onChange()
    }
  }, [isDirty, onChange])

  return (
    <div className='space-y-6'>
      <SettingsCard title='Site Information' description='Basic settings for your CMS'>
        <FieldGroup>
          <Field>
            <FieldLabel>Site Name</FieldLabel>

            <Input placeholder='Enter site name' {...register('siteName')} />

            {errors.siteName && <p className='text-sm text-destructive'>{errors.siteName.message}</p>}
          </Field>

          <Field>
            <FieldLabel>Site Description</FieldLabel>

            <Textarea rows={4} {...register('siteDescription')} />

            {errors.siteDescription && <p className='text-sm text-destructive'>{errors.siteDescription.message}</p>}
          </Field>

          <Field>
            <FieldLabel>Posts Per Page</FieldLabel>

            <Input
              type='number'
              {...register('postsPerPage', {
                valueAsNumber: true
              })}
            />

            {errors.postsPerPage && <p className='text-sm text-destructive'>{errors.postsPerPage.message}</p>}
          </Field>
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Content Options' description='Control how content is handled'>
        <FieldGroup>
          <Controller
            control={control}
            name='draftMode'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Draft Mode</FieldLabel>

                  <FieldDescription>Allow saving posts as drafts before publishing</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name='scheduledPosts'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Scheduled Posts</FieldLabel>

                  <FieldDescription>Enable scheduling posts for future publication</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Site URL' description="Configure your site's public URL">
        <FieldGroup>
          <Field>
            <FieldLabel>Home URL</FieldLabel>

            <Input placeholder='https://example.com' {...register('homeUrl')} />

            {errors.homeUrl && <p className='text-sm text-destructive'>{errors.homeUrl.message}</p>}
          </Field>

          <Field>
            <FieldLabel>Admin URL</FieldLabel>

            <Input placeholder='https://example.com/admin' {...register('adminUrl')} />

            {errors.adminUrl && <p className='text-sm text-destructive'>{errors.adminUrl.message}</p>}
          </Field>
        </FieldGroup>
      </SettingsCard>
    </div>
  )
}
