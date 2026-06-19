'use client'

import { CircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import baseConfig from '@/configs/base'

const LoginForm = () => {
  return (
    <Card className='w-full max-w-md overflow-hidden rounded-2xl bg-white'>
      <CardHeader className='space-y-4 pb-6 pt-10 text-center'>
        <div className='space-y-2'>
          <h2 className='text-foreground-primary font-serif text-2xl font-bold'>
            Welcome <b className='text-orange-500'>Back</b>
          </h2>
          <p className='px-4 text-sm text-slate-500'>Please enter your details to access your account.</p>
        </div>
      </CardHeader>

      <CardContent className='space-y-6 px-8 pb-10'>
        {/* Divider OR */}
        <div className='flex items-center gap-2'>
          <div className='h-px flex-1 bg-border' />
          <CircleIcon className='size-2 text-gray-400' />
          <div className='h-px flex-1 bg-border' />
        </div>

        {/* Google Login Button */}
        <Button
          type='button'
          variant='outline'
          className='mt-6 flex w-full items-center justify-center gap-2 border-slate-200 bg-slate-50/50 py-5 font-semibold text-slate-700 hover:bg-slate-100'
          onClick={() => (window.location.href = baseConfig.backendOauth2Endpoint)}
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' className='h-5 w-5'>
            <path
              fill='#FFC107'
              d='M43.6 20.5H42V20H24v8h11.3C33.8 32.1 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.7 0 5.1 1 7 2.7l5.7-5.7C33.6 6.5 29.1 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21c11.4 0 20-8 20-20 0-1.3-.1-2.7-.4-3.5z'
            />
            <path
              fill='#FF3D00'
              d='M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c2.7 0 5.1 1 7 2.7l5.7-5.7C33.6 6.5 29.1 5 24 5 16.1 5 9.3 9.4 6.3 14.7z'
            />
            <path
              fill='#4CAF50'
              d='M24 47c5.3 0 10.1-2 13.7-5.3l-6.3-5.2C29.5 38.5 26.9 39.5 24 39.5c-5.4 0-9.9-3.6-11.5-8.5l-6.5 5C8.9 42.5 15.9 47 24 47z'
            />
            <path
              fill='#1976D2'
              d='M43.6 20.5H42V20H24v8h11.3c-1 3-3.3 5.4-6.3 6.9l6.3 5.2C38.5 37.5 44 32 44 26c0-1.3-.1-2.7-.4-3.5z'
            />
          </svg>
          Login with Google
        </Button>
      </CardContent>
    </Card>
  )
}

export default LoginForm
