import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  title: string
  backTitle?: string
  backTo?: string
}

const NavigationBar: FC<Props> = (props) => {
  const { title, backTo, backTitle } = props

  return (
    <nav className='sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        {backTo && (
          <Link
            href={backTo}
            className='inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary'
          >
            <ArrowLeft className='h-4 w-4' />
            <span className='text-sm font-medium'>{backTitle || 'Back'}</span>
          </Link>
        )}
        <h1 className='text-lg font-semibold text-foreground'>{title}</h1>
        <div className='w-24' />
      </div>
    </nav>
  )
}

export default NavigationBar
