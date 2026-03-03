'use client'

import Image from 'next/image'
import { Calendar, Phone, Flag, MapPin, Mail, Settings, Book } from 'lucide-react'

export default function About() {
  return (
    <section className='min-h-screen bg-[#f3f3f3] px-6 py-20'>
      <div className='mx-auto max-w-6xl'>
        {/* Heading */}
        <h1 className='mb-20 text-center font-serif text-6xl md:text-7xl'>
          <span className='text-slate-700'>About </span>
          <span className='text-orange-500'>Me</span>
        </h1>

        <div className='grid gap-16 md:grid-cols-2'>
          {/* Image */}
          <div className='relative mx-auto w-full max-w-md'>
            <div className='border-[8px] border-gray-300'>
              <Image
                src={'https://images.pexels.com/photos/34055834/pexels-photo-34055834.jpeg'} // thay ảnh của bạn
                alt='Profile'
                width={500}
                height={600}
                className='object-cover'
              />
            </div>
          </div>

          {/* Content */}
          <div className='space-y-8'>
            <p className='text-lg leading-8 text-slate-700'>
              I'm a Frontend Developer of experience crafting beautiful and functional web experiences. Based in Ho Chi
              Minh City, Vietnam, I specialize in React and Next.js, creating responsive and user-friendly websites that
              delight users and drive results.
            </p>

            {/* Info Grid */}
            <div className='grid gap-x-10 gap-y-6 text-lg text-slate-700 sm:grid-cols-2'>
              <InfoItem icon={<Calendar size={20} />} label='Birthdate' value='April 2002' />
              <InfoItem icon={<Phone size={20} />} label='Phone' value='+84 792 298 202' />
              <InfoItem icon={<Flag size={20} />} label='Nationality' value='Vietnamese' />
              <InfoItem icon={<MapPin size={20} />} label='Address' value='Ho Chi Minh City, Vietnam' />
              <InfoItem icon={<Book size={20} />} label='Experience' value='1 years' />
              <InfoItem icon={<Mail size={20} />} label='Email' value='nguyenduybachdev@gmail.com' />
            </div>

            {/* Button */}
            <button className='mt-6 bg-orange-500 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-orange-600'>
              DOWNLOAD MY CV
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className='flex items-center gap-3'>
      <div className='text-slate-600'>{icon}</div>
      <span className='font-medium'>
        {label} : <span className='font-semibold text-slate-900'>{value}</span>
      </span>
    </div>
  )
}
