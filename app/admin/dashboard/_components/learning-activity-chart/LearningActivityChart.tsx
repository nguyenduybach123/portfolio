'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Mon', thisMonth: 60, lastMonth: 40 },
  { name: 'Tue', thisMonth: 70, lastMonth: 50 },
  { name: 'Wed', thisMonth: 80, lastMonth: 40 },
  { name: 'Thu', thisMonth: 50, lastMonth: 60 },
  { name: 'Fri', thisMonth: 60, lastMonth: 85 },
  { name: 'Sat', thisMonth: 80, lastMonth: 90 }
]

export function LearningActivityChart() {
  return (
    <Card className='rounded-xl border border-gray-200 bg-white p-6'>
      <div className='mb-6 flex items-center justify-between'>
        <h3 className='text-xl font-bold text-gray-900'>Learning Activity</h3>
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
      </div>

      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
          <Line
            type='monotone'
            dataKey='thisMonth'
            stroke='#10b981'
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 5 }}
            activeDot={{ r: 7 }}
            name='This Month'
          />
          <Line
            type='monotone'
            dataKey='lastMonth'
            stroke='#fb923c'
            strokeWidth={2}
            dot={{ fill: '#fb923c', r: 5 }}
            activeDot={{ r: 7 }}
            name='Last Month'
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default LearningActivityChart
