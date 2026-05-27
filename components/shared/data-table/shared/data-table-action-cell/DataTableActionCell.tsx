import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react'
import { FC, Fragment } from 'react'
import { Props } from './lib/types'
import { useDataTableContext } from '../../lib/hooks'

const ActionColumn: FC<Props> = (props) => {
  // Props
  const { rowName, actions = [], extraActions, onEdit, onDelete } = props

  // Hooks
  const { openDeleteDialogAction } = useDataTableContext()

  const handleDelete = () => {
    if (onDelete) {
      onDelete()
    }

    openDeleteDialogAction(true)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='h-8 w-8'>
          <MoreHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='max-w-[200px]'>
        <DropdownMenuLabel>
          <span className='font-medium!'>Actions for</span>{' '}
          <span className='font-semibold text-primary'>{rowName}</span>{' '}
        </DropdownMenuLabel>

        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onClick={action.onAction} className='group'>
            {action.icon && <action.icon className='size-3' />}
            {action.label && <span>{action.label}</span>}
          </DropdownMenuItem>
        ))}

        {extraActions}

        {onEdit && (
          <DropdownMenuItem onClick={onEdit} className='group'>
            <EditIcon className='size-3' />
            <span>Edit data</span>
          </DropdownMenuItem>
        )}
        {onDelete && (
          <Fragment>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive' onClick={handleDelete}>
              <Trash2Icon className='size-4' />
              Delete data
            </DropdownMenuItem>
          </Fragment>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionColumn
