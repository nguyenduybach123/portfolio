'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronDown, MoreVertical } from 'lucide-react'

const data = [
  { name: 'Mon', thisMonth: 20, lastMonth: 30 },
  { name: 'Tue', thisMonth: 10, lastMonth: 50 },
  { name: 'Wed', thisMonth: 30, lastMonth: 20 },
  { name: 'Thu', thisMonth: 80, lastMonth: 40 },
  { name: 'Fri', thisMonth: 20, lastMonth: 30 },
  { name: 'Sat', thisMonth: 40, lastMonth: 20 }
]

export function ScoreActivityChart() {
  return (
    <Card className='rounded-xl border border-gray-200 bg-white p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-xl font-bold text-gray-900'>Score Activity</h3>
        <div className='flex items-center gap-4'>
          <div className='flex gap-6'>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-emerald-500' />
              <span className='text-sm text-gray-600'>This Month</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='h-3 w-3 rounded-full bg-orange-400' />
              <span className='text-sm text-gray-600'>Last Month</span>
            </div>
          </div>
          <Button variant='ghost' size='sm' className='flex items-center gap-2 text-gray-600 hover:bg-gray-100'>
            This Month
            <ChevronDown className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' className='text-gray-400 hover:bg-gray-100'>
            <MoreVertical className='h-5 w-5' />
          </Button>
        </div>
      </div>

      <ResponsiveContainer width='100%' height={250}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' vertical={false} />
          <XAxis dataKey='name' stroke='#999' style={{ fontSize: '12px' }} />
          <YAxis stroke='#999' style={{ fontSize: '12px' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey='thisMonth' fill='#10b981' radius={[8, 8, 0, 0]} name='This Month' />
          <Bar dataKey='lastMonth' fill='#fb923c' radius={[8, 8, 0, 0]} name='Last Month' />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default ScoreActivityChart
