import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
}

const Detail = () => {
  return (
    <nav className='sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-sm'>
      <div className='mx-auto flex max-w-5xl items-center justify-between px-6 py-4'>
        <Link
          href='/admin/posts'
          className='inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary'
        >
          <ArrowLeft className='h-4 w-4' />
          <span className='text-sm font-medium'>Back to Posts</span>
        </Link>
        <h1 className='text-lg font-semibold text-foreground'>Create Post</h1>
        <div className='w-24' />
      </div>
    </nav>
  )
}

export default Detail
