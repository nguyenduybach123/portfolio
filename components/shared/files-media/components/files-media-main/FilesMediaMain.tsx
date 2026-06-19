import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const FilesMediaMain: FC<Props> = ({ children }) => {
  return <div className='space-y-4'>{children}</div>
}

export default FilesMediaMain
