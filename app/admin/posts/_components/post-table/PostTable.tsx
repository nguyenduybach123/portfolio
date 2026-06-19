'use client'
import { PostTable as PostDataTable } from '@/components/modules/posts'
import { useUrlPagination } from '@/hooks'
import { useGetPosts } from '@/api/endpoints/posts'

const PostTable = () => {
  const { pagination, onPaginationChange, pageIndex, pageSize } = useUrlPagination({
    defaultPage: 0,
    defaultSize: 20
  })

  const getPostsQuery = useGetPosts(
    { page: pageIndex, size: pageSize },
    {
      query: { select: (data) => data.data.data }
    }
  )

  return <PostDataTable query={getPostsQuery} pagination={pagination} onPaginationChange={onPaginationChange} />
}

export default PostTable
