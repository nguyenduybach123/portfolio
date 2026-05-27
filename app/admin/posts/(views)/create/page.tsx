'use client'
import { useCreate2 as useCreatePost } from '@/api/endpoints/post-controller'
import { NavigationBar } from '@/app/admin/_components'
import { PostEditor } from '@/components/modules/posts'
import { BASE_PATHS } from '@/constants/path'

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
  // Mutations
  const createPostMutation = useCreatePost()

  // Methods
  const handleSubmit = async (data: PostFormData) => {
    try {
      await createPostMutation.mutateAsync(data)
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/20'>
      <NavigationBar title='New Post' backTo={BASE_PATHS.admin.posts.path} backTitle='Back to Posts' />

      {/* Main Content */}
      <main className='mx-auto max-w-5xl px-6 py-16'>
        {/* Page Title Section */}
        <div className='mb-8'>
          <h2 className='mb-3 text-2xl font-bold text-foreground'>Create a New Post</h2>
          <p className='text-md leading-relaxed text-muted-foreground'>
            Share your thoughts and ideas with your audience. Fill in the details below.
          </p>
        </div>
        <PostEditor mode='create' onSubmit={handleSubmit} />
      </main>
    </div>
  )
}

export default Create
