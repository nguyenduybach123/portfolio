'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BlocksIcon, Pencil } from 'lucide-react'
import Image from 'next/image'

interface ProfileHeaderProps {
  name: string
  role: string
  department: string
  staffId: string
  avatar: string
  phone: string
  email: string
  onEdit?: () => void
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  role,
  department,
  staffId,
  avatar,
  phone,
  email,
  onEdit
}) => {
  return (
    <div className='mb-6'>
      <div className='flex items-center gap-6'>
        {/* Avatar */}
        <div className='relative flex-shrink-0'>
          <Avatar className='h-24 w-24 rounded-xl border-2 border-gray-300'>
            <AvatarImage src={avatar} alt={name} className='object-cover' />
          </Avatar>
        </div>

        {/* Name and Role */}
        <div className='flex-1'>
          <h1 className='mb-1 text-2xl font-bold text-gray-900'>{name}</h1>
          <p className='mb-1 text-sm font-medium text-teal-600'>
            {role}
            <span className='mx-1 text-gray-500'>|</span>
            <span className='text-gray-700'>{department}</span>
          </p>
        </div>

        <div className='flex-shrink-0'>
          <Button variant='destructive' size='default' className='relative gap-2'>
            <BlocksIcon className='h-4 w-4' />
            Block User
          </Button>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className='mt-6 grid grid-cols-2 gap-6 border-t border-gray-200 pt-6 md:grid-cols-3'>
        <div>
          <p className='mb-1 text-xs uppercase tracking-wide text-gray-500'>Staff ID</p>
          <p className='text-sm font-semibold text-gray-900'>{staffId}</p>
        </div>
        <div>
          <p className='mb-1 text-xs uppercase tracking-wide text-gray-500'>Phone number</p>
          <p className='text-sm font-semibold text-gray-900'>{phone}</p>
        </div>
        <div>
          <p className='mb-1 text-xs uppercase tracking-wide text-gray-500'>Email</p>
          <p className='text-sm font-semibold text-gray-900'>{email}</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
