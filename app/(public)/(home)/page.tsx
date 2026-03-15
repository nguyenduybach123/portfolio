import { Github, Instagram, Linkedin } from 'lucide-react'
import { GeometricShapes, HeroCTA } from './_components'

export default function Home() {
  return (
    <div>
      {/* Background geometric pattern */}
      <GeometricShapes />

      {/* Hero Section */}
      <HeroCTA />

      {/* Contact info - bottom left */}
      <div className='absolute bottom-8 left-8 text-sm text-gray-600'>
        <p className='mb-2 font-medium'>Let's work together</p>
        <a
          href='mailto:contact@daniel.net'
          className='mb-1 block text-orange-500 transition-colors hover:text-orange-600'
        >
          nguyenduybachdev@gmail.com
        </a>
        <p className='text-gray-500'>+847 9229 8202</p>
      </div>

      {/* Social icons - bottom right */}
      <div className='absolute bottom-8 right-8 flex gap-4'>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/duy-b%C3%A1ch-nguy%E1%BB%85n-715082333/'
          className='text-gray-600 transition-colors hover:text-orange-500'
          aria-label='LinkedIn'
        >
          <Linkedin />
        </a>
        <a
          target='_blank'
          href='https://github.com/nguyenduybach123'
          className='text-gray-600 transition-colors hover:text-orange-500'
          aria-label='GitHub'
        >
          <Github />
        </a>
        <a
          target='_blank'
          href='https://www.instagram.com/duybach_ng/'
          className='text-gray-600 transition-colors hover:text-orange-500'
          aria-label='Instagram'
        >
          <Instagram />
        </a>
      </div>
    </div>
  )
}
