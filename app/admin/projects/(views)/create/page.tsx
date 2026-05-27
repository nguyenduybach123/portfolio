import { NavigationBar } from '@/app/admin/_components'
import { ProjectEditor } from '@/components/modules/projects'
import { BASE_PATHS } from '@/constants/path'
import { ArrowLeftIcon } from 'lucide-react'

const Create = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-background via-background to-secondary/20'>
      <NavigationBar title='New Project' backTo={BASE_PATHS.admin.projects.path} backTitle='Back to Projects' />
      <ProjectEditor />
    </div>
  )
}

export default Create
