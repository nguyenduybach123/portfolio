import { Button } from '@/components/ui/button'
import { BookIcon, CalendarIcon, FlagIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const PersonalInformation = () => {
  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {/* Image */}
      <div className='relative mx-auto w-full max-w-md'>
        <div className='border-[8px] border-gray-300'>
          <Image
            src={'https://images.pexels.com/photos/34055834/pexels-photo-34055834.jpeg'}
            alt='Profile'
            width={500}
            height={500}
            className='object-cover'
          />
        </div>
      </div>

      {/* Content */}
      <div className='space-y-8'>
        <p className='text-lg leading-8 text-slate-700'>
          I'm a Frontend Developer of experience crafting beautiful and functional web experiences. Based in Ho Chi Minh
          City, Vietnam, I specialize in React and Next.js, creating responsive and user-friendly websites that delight
          users and drive results.
        </p>

        {/* Info Grid */}
        <div className='grid gap-x-10 gap-y-6 text-lg text-slate-700 sm:grid-cols-2'>
          <InfoItem icon={<CalendarIcon size={20} />} label='Birthdate' value='April 2002' />
          <InfoItem icon={<PhoneIcon size={20} />} label='Phone' value='+84 792 298 202' />
          <InfoItem icon={<FlagIcon size={20} />} label='Nationality' value='Vietnamese' />
          <InfoItem icon={<MapPinIcon size={20} />} label='Address' value='Ho Chi Minh City, Vietnam' />
          <InfoItem icon={<BookIcon size={20} />} label='Experience' value='1 years' />
          <InfoItem icon={<MailIcon size={20} />} label='Email' value='nguyenduybachdev@gmail.com' />
        </div>

        {/* Button */}
        <Button className='mt-6 h-14 bg-orange-500 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-orange-600'>
          DOWNLOAD MY CV
        </Button>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='text-slate-600'>{icon}</div>
      <span className='truncate text-sm font-medium'>
        {label} : <span className='font-semibold text-slate-900'>{value}</span>
      </span>
    </div>
  )
}

export default PersonalInformation
