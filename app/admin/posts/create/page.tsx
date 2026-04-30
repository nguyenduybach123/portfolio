'use client'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface PostFormData {
  title: string
  slug: string
  summary: string
  content: string
  thumbnail: string | null
  tags: string[]
  status: 'draft' | 'published'
  featured: boolean
}

const Create = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true)
    try {
      console.log('[v0] Submitting post data:', data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('[v0] Post created successfully')
    } catch (error) {
      console.error('[v0] Error creating post:', error)
      throw new Error('Failed to create post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/20'>
      {/* Simple Navigation Bar */}
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

      {/* Main Content */}
      <main className='mx-auto max-w-5xl px-6 py-16'>
        {/* Page Title Section */}
        <div className='mb-12'>
          <h2 className='mb-3 text-4xl font-bold text-foreground'>Create a New Post</h2>
          <p className='text-lg leading-relaxed text-muted-foreground'>
            Share your thoughts and ideas with your audience. Fill in the details below.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Create
