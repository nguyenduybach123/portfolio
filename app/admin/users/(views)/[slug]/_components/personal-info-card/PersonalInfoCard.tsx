'use client'

import { Pencil } from 'lucide-react'

interface PersonalInfoCardProps {
  gender: string
  dateOfBirth: string
  identifyCode: string
  hometown: string
  nationality: string
  religion: string
  language: string
  maritalStatus: string
  permanentAddress: string
  currentAddress: string
  onEdit?: () => void
}

export function PersonalInfoCard({
  gender,
  dateOfBirth,
  identifyCode,
  hometown,
  nationality,
  religion,
  language,
  maritalStatus,
  permanentAddress,
  currentAddress,
  onEdit
}: PersonalInfoCardProps) {
  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-gray-900'>Personal information</h2>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {/* Left Column */}
        <div className='space-y-6'>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Gender</p>
            <p className='text-sm font-semibold text-gray-900'>{gender}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Indentify code</p>
            <p className='text-sm font-semibold text-gray-900'>{identifyCode}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Nationality</p>
            <p className='text-sm font-semibold text-gray-900'>{nationality}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Language</p>
            <p className='text-sm font-semibold text-gray-900'>{language}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Permanent address</p>
            <p className='text-sm font-semibold text-gray-900'>{permanentAddress}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className='space-y-6'>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Date of birth</p>
            <p className='text-sm font-semibold text-gray-900'>{dateOfBirth}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Hometown</p>
            <p className='text-sm font-semibold text-gray-900'>{hometown}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Religion</p>
            <p className='text-sm font-semibold text-gray-900'>{religion}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Marital status</p>
            <p className='text-sm font-semibold text-gray-900'>{maritalStatus}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Current address</p>
            <p className='text-sm font-semibold text-gray-900'>{currentAddress}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoCard
