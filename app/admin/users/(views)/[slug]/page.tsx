'use client'

import { mockComments } from '@/data/comment-data'
import { PersonalInfoCard, ProfileHeader } from './_components'
import { CommentTable } from '@/components/modules/comments'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserSessionTable } from '@/components/modules/users'
import { mockUserSessions } from '@/data/user-data'

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

      <div className='container mx-auto max-w-6xl px-4 py-8'>
        <Tabs defaultValue='personal' className='w-full'>
          <TabsList className='grid w-full grid-cols-3 bg-white p-0'>
            <TabsTrigger
              value='credentials'
              className='rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-gray-700 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500'
            >
              Credentials
            </TabsTrigger>
            <TabsTrigger
              value='sessions'
              className='rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-gray-700 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500'
            >
              Sessions
            </TabsTrigger>
            <TabsTrigger
              value='comments'
              className='rounded-none border-b-2 border-transparent px-4 py-3 font-medium text-gray-700 data-[state=active]:border-orange-500 data-[state=active]:text-orange-500'
            >
              Comments
            </TabsTrigger>
          </TabsList>

          {/* Credential Tab */}
          <TabsContent value='credentials' className='mt-6 space-y-6'>
            <div className='bg-slate-200/50 px-6 py-16 text-center text-gray-600'>Empty credentials</div>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value='sessions' className='mt-6 space-y-6'>
            <UserSessionTable data={mockUserSessions} />
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value='comments' className='mt-6'>
            <CommentTable data={mockComments} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default UserDetailPage
