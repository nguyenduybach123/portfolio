'use client'

import { z } from 'zod'
import { Controller, useFormContext } from 'react-hook-form'

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import SettingsCard from '../setting-card'

export const seoSettingsSchema = z.object({
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters'),

  keywords: z.string(),

  sitemapEnabled: z.boolean(),

  robotsIndex: z.boolean(),

  robotsFollow: z.boolean()
})

export type SeoSettingsValues = z.infer<typeof seoSettingsSchema>

export default function SeoTab() {
  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext<SeoSettingsValues>()

  const metaDescription = watch('metaDescription')

  return (
    <div className='space-y-6'>
      <SettingsCard title='Meta Information' description='Configure SEO metadata for search engines'>
        <FieldGroup>
          <Field>
            <FieldLabel>Meta Description</FieldLabel>

            <Textarea
              rows={3}
              placeholder='Enter meta description (max 160 characters)'
              {...register('metaDescription')}
            />

            <FieldDescription>
              {metaDescription?.length ?? 0}
              /160 characters
            </FieldDescription>

            {errors.metaDescription && <p className='text-sm text-destructive'>{errors.metaDescription.message}</p>}
          </Field>

          <Field>
            <FieldLabel>Keywords</FieldLabel>

            <Input placeholder='Enter keywords separated by commas' {...register('keywords')} />

            {errors.keywords && <p className='text-sm text-destructive'>{errors.keywords.message}</p>}
          </Field>
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Search Engine Settings' description='Control how search engines index your site'>
        <FieldGroup>
          <Controller
            control={control}
            name='sitemapEnabled'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Sitemap</FieldLabel>

                  <FieldDescription>Enable XML sitemap for search engine indexing</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name='robotsIndex'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Allow Indexing</FieldLabel>

                  <FieldDescription>Allow search engines to index your site</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />

          <Controller
            control={control}
            name='robotsFollow'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Allow Following</FieldLabel>

                  <FieldDescription>Allow search engines to follow links</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Sitemap Configuration' description='Manage your XML sitemap'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-3'>
            <div>
              <p className='text-sm font-medium'>Sitemap URL</p>

              <p className='text-xs text-muted-foreground'>https://example.com/sitemap.xml</p>
            </div>

            <Button variant='ghost' size='sm'>
              Copy
            </Button>
          </div>

          <div className='flex items-center justify-between rounded-lg border bg-muted/30 p-3'>
            <div>
              <p className='text-sm font-medium'>Last Generated</p>

              <p className='text-xs text-muted-foreground'>2 hours ago</p>
            </div>

            <Button variant='outline' size='sm'>
              Regenerate
            </Button>
          </div>
        </div>
      </SettingsCard>
    </div>
  )
}
