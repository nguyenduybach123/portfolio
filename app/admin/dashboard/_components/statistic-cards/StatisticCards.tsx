'use client'

import { Card } from '@/components/ui/card'
import { CheckSquare2, Bookmark, Lightbulb } from 'lucide-react'

interface StatCardProps {
  number: string
  label: string
  icon: React.ReactNode
  bgColor: string
  iconBgColor: string
}

function StatCard({ number, label, icon, bgColor, iconBgColor }: StatCardProps) {
  return (
    <Card className={`${bgColor} relative overflow-hidden rounded-xl border-0 p-6 text-white`}>
      <div className='absolute right-0 top-0 h-24 w-24 opacity-10 blur-2xl' />
      <div className='relative z-10 flex items-center justify-between'>
        <div>
          <p className='mb-1 text-4xl font-bold'>{number}</p>
          <p className='text-sm font-medium opacity-90'>{label}</p>
        </div>
        <div className={`${iconBgColor} rounded-lg p-4`}>{icon}</div>
      </div>
    </Card>
  )
}

export function StatisticsCards() {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
      <StatCard
        number='1,500'
        label='All Courses'
        icon={<CheckSquare2 className='h-6 w-6 text-white' />}
        bgColor='bg-gradient-to-br from-slate-800 to-slate-900'
        iconBgColor='bg-slate-700/50'
      />
      <StatCard
        number='1,112'
        label='Upcoming'
        icon={<Bookmark className='h-6 w-6 text-white' />}
        bgColor='bg-gradient-to-br from-slate-800 to-slate-900'
        iconBgColor='bg-slate-700/50'
      />
      <StatCard
        number='903'
        label='Progress Courses'
        icon={<Lightbulb className='h-6 w-6 text-white' />}
        bgColor='bg-gradient-to-br from-slate-800 to-slate-900'
        iconBgColor='bg-slate-700/50'
      />
    </div>
  )
}

export default StatisticsCards
