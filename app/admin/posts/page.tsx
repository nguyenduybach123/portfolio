import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { PageHeader } from '../_components'
import { PostFilter, PostTable } from './_components'
import Link from 'next/link'
import { BASE_PATHS } from '@/constants/path'

const Posts = () => {
  return (
    <div className='container mx-auto flex max-w-6xl bg-background'>
      <PostFilter>
        {/* Post Header */}
        <PageHeader
          title='Post List'
          description='Manage the posts in the system'
          actions={
            <Link href={BASE_PATHS.admin.posts.create}>
              <Button className='gap-2'>
                <PlusIcon className='h-4 w-4' />
                Add New
              </Button>
            </Link>
          }
        />
        {/* Post Table */}
        <PostTable />
      </PostFilter>
    </div>
  )
}

export default Posts
