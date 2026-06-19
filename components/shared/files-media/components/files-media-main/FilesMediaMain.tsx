import { ResizablePanel } from '@/components/ui/resizable'
import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FilesMediaMain: FC<Props> = ({ children }) => {
  return (
    <ResizablePanel defaultSize='50%'>
      <div className='flex-1 space-y-4'>{children}</div>
    </ResizablePanel>
  )
}

export default FilesMediaMain
