'use client'

import { useCreateProject } from '@/api/endpoints/projects'
import { NavigationBar } from '@/app/admin/_components'
import { ProjectEditor } from '@/components/modules/projects'
import { BASE_PATHS } from '@/constants/path'

const ProjectCreatePage = () => {
  const createProjectMutation = useCreateProject()

  const handleSubmit = async (data: any) => {
    try {
      await createProjectMutation.mutateAsync(data)
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/20'>
      <NavigationBar title='New Project' backTo={BASE_PATHS.admin.projects.path} backTitle='Back to Projects' />
      <ProjectEditor onSubmit={handleSubmit} />
    </div>
  )
}

export default ProjectCreatePage
