'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'

import SettingsCard from '../setting-card'

interface SettingsFormValues {
  social: {
    ogImage: string
    twitterHandle: string
    twitterCard: boolean
    shareButtons: boolean

    enabledNetworks: {
      facebook: boolean
      twitter: boolean
      linkedin: boolean
      pinterest: boolean
    }
  }
}

export default function SocialTab() {
  const {
    register,
    control,
    watch,
    formState: { errors }
  } = useFormContext<SettingsFormValues>()

  const shareButtons = watch('social.shareButtons')

  return (
    <div className='space-y-6'>
      <SettingsCard title='Open Graph' description='Configure how your content appears on social media'>
        <FieldGroup>
          <Field>
            <FieldLabel>Default Image URL</FieldLabel>

            <Input placeholder='https://example.com/og-image.jpg' {...register('social.ogImage')} />

            <FieldDescription>Recommended size: 1200×630 pixels</FieldDescription>

            {errors.social?.ogImage && <p className='text-sm text-destructive'>{errors.social.ogImage.message}</p>}
          </Field>
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Twitter Integration' description='Configure Twitter/X sharing settings'>
        <FieldGroup>
          <Field>
            <FieldLabel>Twitter Handle</FieldLabel>

            <Input placeholder='@yourhandle' {...register('social.twitterHandle')} />

            {errors.social?.twitterHandle && (
              <p className='text-sm text-destructive'>{errors.social.twitterHandle.message}</p>
            )}
          </Field>

          <Controller
            control={control}
            name='social.twitterCard'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Use Twitter Card</FieldLabel>

                  <FieldDescription>Enable Twitter Card meta tags for better content preview</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />
        </FieldGroup>
      </SettingsCard>

      <SettingsCard title='Social Sharing' description='Control social media sharing options'>
        <FieldGroup>
          <Controller
            control={control}
            name='social.shareButtons'
            render={({ field }) => (
              <Field className='flex items-center justify-between rounded-lg border p-4'>
                <div>
                  <FieldLabel>Share Buttons</FieldLabel>

                  <FieldDescription>Show social sharing buttons on posts</FieldDescription>
                </div>

                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </Field>
            )}
          />

          {shareButtons && (
            <div className='space-y-3 rounded-lg border bg-muted/30 p-4'>
              <Controller
                control={control}
                name='social.enabledNetworks.facebook'
                render={({ field }) => (
                  <Field className='flex items-center justify-between py-2'>
                    <FieldLabel className='font-normal'>Facebook</FieldLabel>

                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name='social.enabledNetworks.twitter'
                render={({ field }) => (
                  <Field className='flex items-center justify-between py-2'>
                    <FieldLabel className='font-normal'>Twitter</FieldLabel>

                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name='social.enabledNetworks.linkedin'
                render={({ field }) => (
                  <Field className='flex items-center justify-between py-2'>
                    <FieldLabel className='font-normal'>LinkedIn</FieldLabel>

                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </Field>
                )}
              />

              <Controller
                control={control}
                name='social.enabledNetworks.pinterest'
                render={({ field }) => (
                  <Field className='flex items-center justify-between py-2'>
                    <FieldLabel className='font-normal'>Pinterest</FieldLabel>

                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </Field>
                )}
              />
            </div>
          )}
        </FieldGroup>
      </SettingsCard>
    </div>
  )
}
