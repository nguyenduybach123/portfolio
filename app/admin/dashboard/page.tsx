'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, FileText, Image as ImageIcon, MessageSquare, CheckCircle, PlusCircle } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// --- Mock Data chuẩn hóa theo tone Minimalist ---
const stats = [
  { id: 'projects', label: 'Total Projects', value: 12, icon: <PlusCircle className='h-4 w-4' /> },
  { id: 'posts', label: 'Total Posts', value: 34, icon: <FileText className='h-4 w-4' /> },
  { id: 'media', label: 'Total Media Files', value: 156, icon: <ImageIcon className='h-4 w-4' /> },
  { id: 'messages', label: 'Total Messages', value: 8, icon: <MessageSquare className='h-4 w-4' /> }
]

const postsStatus = [
  { name: 'Published', value: 28 },
  { name: 'Draft', value: 6 }
]

const projectsStatus = [
  { name: 'Published', value: 10 },
  { name: 'Draft', value: 2 }
]

// Màu sắc biểu đồ: Đen đặc cho Published và Xám nhạt cho Draft
const COLORS = ['#000000', '#E5E5E5']

const activities = [
  {
    id: 1,
    icon: <CheckCircle className='h-4 w-4 text-neutral-900' />,
    text: 'Published post "Spring Security Best Practices"',
    time: '2h ago'
  },
  {
    id: 2,
    icon: <ArrowUpRight className='h-4 w-4 text-neutral-500' />,
    text: 'Updated project "Portfolio CMS"',
    time: '1d ago'
  },
  {
    id: 3,
    icon: <ImageIcon className='h-4 w-4 text-neutral-500' />,
    text: 'Uploaded image "hero-banner.jpg"',
    time: '2d ago'
  },
  {
    id: 4,
    icon: <PlusCircle className='h-4 w-4 text-neutral-900' />,
    text: 'Created project "CRM System"',
    time: '3d ago'
  },
  {
    id: 5,
    icon: <ArrowUpRight className='h-4 w-4 text-neutral-400' />,
    text: 'Updated profile information',
    time: '5d ago'
  }
]

const messages = [
  { name: 'John Doe', subject: 'Job Opportunity', email: 'john@example.com', createdAt: '2026-06-10' },
  { name: 'Jane Smith', subject: 'Portfolio Feedback', email: 'jane@example.com', createdAt: '2026-06-09' },
  { name: 'Alex Brown', subject: 'Collaboration Request', email: 'alex@example.com', createdAt: '2026-06-08' }
]

// --- Framer Motion Variants ---
const faderContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const faderItem = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 260, damping: 25 } }
}

// --- Sub-components ---
const StatCard = ({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) => (
  <motion.div variants={faderItem}>
    <Card className='group relative overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-none transition-all duration-300 hover:border-black hover:bg-neutral-50/50'>
      <CardContent className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-xs font-medium uppercase tracking-wider text-neutral-400'>{label}</p>
            <p className='text-3xl font-bold tracking-tight text-neutral-950'>{value}</p>
          </div>
          <div className='rounded-lg border border-neutral-100 bg-neutral-50 p-2.5 text-neutral-600 transition-colors duration-300 group-hover:bg-black group-hover:text-white'>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const StatusChartBlock = ({
  title,
  description,
  data
}: {
  title: string
  description: string
  data: typeof postsStatus
}) => {
  const total = data[0].value + data[1].value
  return (
    <Card className='overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-none'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-base font-semibold tracking-tight'>{title}</CardTitle>
        <CardDescription className='text-xs text-neutral-400'>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center gap-8 sm:flex-row'>
          {/* Donut Chart */}
          <div className='relative h-[110px] w-[110px] flex-shrink-0'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie data={data} dataKey='value' innerRadius={36} outerRadius={48} stroke='none' paddingAngle={2}>
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
              <span className='text-sm font-bold text-neutral-900'>{total}</span>
              <span className='text-[10px] font-medium uppercase tracking-wider text-neutral-400'>Total</span>
            </div>
          </div>

          {/* Indicators & Bars */}
          <div className='w-full flex-1 space-y-3.5'>
            {data.map((p, i) => (
              <div key={p.name} className='space-y-1.5'>
                <div className='flex items-center justify-between text-xs'>
                  <div className='flex items-center gap-2'>
                    <span className='h-2 w-2 rounded-full' style={{ backgroundColor: COLORS[i] }} />
                    <span className='font-medium text-neutral-600'>{p.name}</span>
                  </div>
                  <span className='font-semibold text-neutral-900'>{p.value}</span>
                </div>
                {/* Custom Minimalist Progress Bar */}
                <div className='h-1.5 w-full overflow-hidden rounded-full bg-neutral-100'>
                  <motion.div
                    className='h-full rounded-full bg-neutral-950'
                    initial={{ width: 0 }}
                    animate={{ width: `${(p.value / total) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ backgroundColor: i === 1 ? '#C2C2C2' : '#000000' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// --- Main Page Component ---
const DashboardPage = () => {
  return (
    <main className='min-h-screen bg-white text-neutral-950 antialiased selection:bg-neutral-900 selection:text-white'>
      <motion.div
        className='mx-auto max-w-7xl space-y-8 px-6 py-10'
        variants={faderContainer}
        initial='hidden'
        animate='show'
      >
        {/* Section 1: Overview Stats */}
        <motion.section variants={faderItem} className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {stats.map((s) => (
            <StatCard key={s.id} label={s.label} value={s.value} icon={s.icon} />
          ))}
        </motion.section>

        {/* Section 2: Content Status Charts */}
        <motion.section variants={faderItem} className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <StatusChartBlock
            title='Posts Analytics'
            description='Live publications vs workflow drafts'
            data={postsStatus}
          />
          <StatusChartBlock
            title='Projects Analytics'
            description='Showcased projects deployment status'
            data={projectsStatus}
          />
        </motion.section>

        {/* Section 3: Recent Activities + Stacked Messages */}
        <motion.section variants={faderItem} className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Recent Activities Panel */}
          <Card className='rounded-xl border border-neutral-200 bg-white shadow-none lg:col-span-2'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-base font-semibold tracking-tight'>Recent Activities</CardTitle>
              <CardDescription className='text-xs text-neutral-400'>
                Real-time stream of core system updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='relative space-y-6 pl-4 before:absolute before:bottom-2 before:left-1.5 before:top-2 before:w-[1px] before:bg-neutral-100'>
                {activities.map((a) => (
                  <div key={a.id} className='group relative flex items-start gap-4'>
                    {/* Timeline Node Point */}
                    <div className='absolute -left-[14.5px] mt-1 flex h-2 w-2 items-center justify-center rounded-full border border-neutral-300 bg-white ring-4 ring-white transition-colors duration-200 group-hover:border-black' />
                    <div className='flex-1 space-y-0.5'>
                      <div className='flex items-center justify-between gap-4'>
                        <p className='text-sm font-medium text-neutral-700 transition-colors duration-200 group-hover:text-black'>
                          {a.text}
                        </p>
                        <span className='whitespace-nowrap font-mono text-[11px] text-neutral-400'>{a.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Messages Panel (Refactored to Premium Feed Stack) */}
          <Card className='rounded-xl border border-neutral-200 bg-white shadow-none'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-base font-semibold tracking-tight'>Latest Messages</CardTitle>
              <CardDescription className='text-xs text-neutral-400'>
                Inbound queries from portfolio contacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='divide-y divide-neutral-100'>
                {messages.map((m) => (
                  <div key={m.email} className='group flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0'>
                    <div className='flex items-center justify-between gap-2'>
                      <span className='text-sm font-semibold text-neutral-900'>{m.name}</span>
                      <span className='font-mono text-[10px] text-neutral-400'>{m.createdAt}</span>
                    </div>
                    <p className='text-xs font-medium tracking-tight text-neutral-700'>{m.subject}</p>
                    <div className='mt-1 flex items-center justify-between'>
                      <a
                        href={`mailto:${m.email}`}
                        className='font-mono text-[11px] text-neutral-400 transition-colors hover:text-black hover:underline'
                      >
                        {m.email}
                      </a>
                      <Badge
                        variant='secondary'
                        className='h-4 rounded rounded-sm border border-neutral-200 bg-neutral-50 px-1.5 text-[9px] font-medium uppercase text-neutral-500 opacity-0 shadow-none transition-opacity duration-200 group-hover:opacity-100'
                      >
                        Reply
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </motion.div>
    </main>
  )
}

export default DashboardPage
