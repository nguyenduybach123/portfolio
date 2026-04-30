'use client'

import { motion } from 'framer-motion'
import { useController } from 'react-hook-form'

import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field'

import { DynamicFilterFieldRenderer } from '../../shared'
import { useDynamicFilterContext } from '../../lib/hooks'

type Props = {
  name: string
  fieldSchema: any
  config: any
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}

export const DynamicFieldItem = ({ name, fieldSchema, config }: Props) => {
  const { form } = useDynamicFilterContext()

  const { field, fieldState } = useController({
    name,
    control: form.control
  })

  const hasError = !!fieldState.error

  return (
    <motion.div variants={item}>
      <Field data-invalid={hasError} className='space-y-2'>
        <FieldLabel className='text-xs font-medium text-muted-foreground'>{config.label ?? name}</FieldLabel>

        <DynamicFilterFieldRenderer field={field} name={name} config={config} fieldSchema={fieldSchema} />

        {config.description && <FieldDescription className='text-xs'>{config.description}</FieldDescription>}

        <FieldError errors={[fieldState.error]} />
      </Field>
    </motion.div>
  )
}
