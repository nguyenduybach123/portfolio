import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { PageHeader } from '../_components'
import { ProjectFilter, ProjectTable } from './_components'
import { getQueryClient } from '@/configs/query-client'
import { postQueryOptions } from '@/api/queries/post-queries'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{
    page?: string
    size?: string
  }>
}

export default async function ProjectPage({ searchParams }: Props) {
  const params = await searchParams

  const queryClient = getQueryClient()

  const page = Number(params.page ?? 0)
  const size = Number(params.size ?? 10)

  await queryClient.prefetchQuery(
    postQueryOptions({
      page,
      size
    })
  )

  return (
    <div className='container mx-auto flex max-w-6xl bg-background'>
      <ProjectFilter>
        {/* Project Header */}
        <PageHeader
          title='Projects'
          description='Manage projects in the system'
          actions={
            <Button asChild className='gap-2'>
              <Link href='/admin/projects/create'>
                <PlusIcon className='h-4 w-4' />
                Add Project
              </Link>
            </Button>
          }
        />

        {/* Project Table */}
        <ProjectTable />
      </ProjectFilter>
    </div>
  )
}
