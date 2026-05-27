'use client'

import { mockComments } from '@/data/comment-data'
import { PersonalInfoCard, ProfileHeader } from './_components'
import { CommentTable } from '@/components/modules/comments'
import { Separator } from '@/components/ui/separator'

const mockStaffData = {
  name: 'Hang Minh Nguyen',
  role: 'UI - UX Designer',
  department: 'Product Department',
  staffId: 'SJ53862',
  avatar: 'https://i.pravatar.cc/150?img=1',
  phone: '0913 854 235',
  email: 'hangntm@sjlabel.com',
  staffAccount: 'hangntml',
  gender: 'Female',
  dateOfBirth: '5th March, 1996',
  identifyCode: '3234611342',
  hometown: 'Hai Duong city',
  nationality: 'Vietnam',
  religion: 'None',
  language: 'Vietnamese, English',
  maritalStatus: 'Single',
  permanentAddress: '5. Nguyen Chi Thanh Street, Tan Binh Ward, Hai Duong',
  currentAddress: '29. Nguyen Ngoc Doan Street, Dong Da District, Ha Noi',
  educations: [
    {
      degree: 'Bachelor in Management Information System',
      institution: 'National Economic University',
      period: '2014-2018'
    },
    {
      degree: 'Certificate of Graphic Design',
      institution: 'FPT Arena University',
      period: '2018-2019'
    }
  ],
  bankAccount: '02520613401',
  accountName: 'Nguyen Thi Minh Hang',
  bank: 'TPBank Duy Tan',
  taxCode: '8456120546',
  insuranceCode: '8456120546'
}

export function UserDetailPage() {
  return (
    <div className='container mx-auto max-w-6xl space-y-4'>
      <ProfileHeader
        name={mockStaffData.name}
        role={mockStaffData.role}
        department={mockStaffData.department}
        staffId={mockStaffData.staffId}
        avatar={mockStaffData.avatar}
        phone={mockStaffData.phone}
        email={mockStaffData.email}
        onEdit={() => console.log('Edit profile header')}
      />

      <PersonalInfoCard
        gender={mockStaffData.gender}
        dateOfBirth={mockStaffData.dateOfBirth}
        identifyCode={mockStaffData.identifyCode}
        hometown={mockStaffData.hometown}
        nationality={mockStaffData.nationality}
        religion={mockStaffData.religion}
        language={mockStaffData.language}
        maritalStatus={mockStaffData.maritalStatus}
        permanentAddress={mockStaffData.permanentAddress}
        currentAddress={mockStaffData.currentAddress}
        onEdit={() => console.log('Edit personal info')}
      />

      <Separator className='my-10' />

      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold text-gray-900'>Recent comments</h2>
        </div>
        <CommentTable data={mockComments} />
      </div>
    </div>
  )
}

export default UserDetailPage
