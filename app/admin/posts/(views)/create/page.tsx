'use client'
import { useCreatePost } from '@/api/endpoints/posts'
import { NavigationBar } from '@/app/admin/_components'
import { PostEditor } from '@/components/modules/posts'
import { PostFormValues } from '@/components/modules/posts/post-editor'
import { BASE_PATHS } from '@/constants/path'
import { toast } from 'sonner'

const CreatePostPage = () => {
  // Mutations
  const createPostMutation = useCreatePost()

  // Methods
  const handleSubmit = async (data: PostFormValues) => {
    try {
      await createPostMutation.mutateAsync({
        data: {
          title: data.title,
          summary: data.summary,
          content: data.content,
          thumbnail: data.thumbnail,
          tags: data.tags,
          featured: data.featured
        }
      })

      toast('Post has been created', {
        description: 'Sunday, December 03, 2023 at 9:00 AM',
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      })
    } catch (error) {
      console.error('Failed to create post:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/20'>
      <NavigationBar title='New Post' backTo={BASE_PATHS.admin.posts.path} backTitle='Back to Posts' />

      {/* Main Content */}
      <main className='mx-auto max-w-5xl px-6 py-8'>
        <PostEditor mode='create' onSubmit={handleSubmit} />
      </main>
    </div>
  )
}

export default CreatePostPage
