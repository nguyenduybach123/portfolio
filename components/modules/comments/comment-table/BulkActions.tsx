import { FC } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  onDeleteSelected?: () => void
}

export const CommentTableBulkActions: FC<Props> = ({ onDeleteSelected }) => {
  return (
    <div className='flex gap-2'>
      <Button variant='destructive' onClick={onDeleteSelected} size='sm'>
        Delete Selected
      </Button>
    </div>
  )
}
