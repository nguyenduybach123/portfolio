interface SettingsCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className='rounded-lg border border-border bg-card p-6'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
        {description && <p className='mt-1 text-sm text-muted-foreground'>{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}
