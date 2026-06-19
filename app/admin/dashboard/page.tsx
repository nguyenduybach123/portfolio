'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, FileText, Image, MessageSquare, CheckCircle, PlusCircle } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const stats = [
  {
    id: 'projects',
    label: 'Total Projects',
    value: 12,
    icon: <PlusCircle className='h-6 w-6' />,
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'posts',
    label: 'Total Posts',
    value: 34,
    icon: <FileText className='h-6 w-6' />,
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'media',
    label: 'Total Media Files',
    value: 156,
    icon: <Image className='h-6 w-6' />,
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'messages',
    label: 'Total Messages',
    value: 8,
    icon: <MessageSquare className='h-6 w-6' />,
    color: 'from-gray-600 to-gray-800'
  }
]

const postsStatus = [
  { name: 'Published', value: 28 },
  { name: 'Draft', value: 6 }
]
const projectsStatus = [
  { name: 'Published', value: 10 },
  { name: 'Draft', value: 2 }
]
const COLORS = ['#10b981', '#f59e0b']

const activities = [
  {
    id: 1,
    icon: <CheckCircle className='h-5 w-5 text-emerald-500' />,
    text: 'Published post "Spring Security Best Practices"',
    time: '2h ago'
  },
  {
    id: 2,
    icon: <ArrowUpRight className='h-5 w-5 text-sky-500' />,
    text: 'Updated project "Portfolio CMS"',
    time: '1d ago'
  },
  {
    id: 3,
    icon: <Image className='h-5 w-5 text-amber-400' />,
    text: 'Uploaded image "hero-banner.jpg"',
    time: '2d ago'
  },
  {
    id: 4,
    icon: <PlusCircle className='h-5 w-5 text-violet-500' />,
    text: 'Created project "CRM System"',
    time: '3d ago'
  },
  {
    id: 5,
    icon: <ArrowUpRight className='h-5 w-5 text-slate-400' />,
    text: 'Updated profile information',
    time: '5d ago'
  }
]

const messages = [
  { name: 'John Doe', subject: 'Job Opportunity', email: 'john@example.com', createdAt: '2026-06-10' },
  { name: 'Jane Smith', subject: 'Portfolio Feedback', email: 'jane@example.com', createdAt: '2026-06-09' },
  { name: 'Alex Brown', subject: 'Collaboration Request', email: 'alex@example.com', createdAt: '2026-06-08' }
]

const StatCard = ({
  label,
  value,
  icon,
  color
}: {
  label: string
  value: number
  icon: React.ReactNode
  color: string
}) => (
  <Card className='group border-0 bg-gradient-to-br text-white'>
    <div className={`rounded-xl p-6 ${'bg-gradient-to-br ' + color}`}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-2xl font-semibold'>{value}</p>
          <p className='mt-1 text-sm opacity-90'>{label}</p>
        </div>
        <div className='rounded-md bg-white/10 p-2 transition-transform group-hover:scale-105'>{icon}</div>
      </div>
    </div>
  </Card>
)

const DashboardPage = () => {
  return (
    <main className='min-h-screen'>
      <div className='mx-auto max-w-7xl space-y-6 px-6 py-8'>
        {/* Overview Stats */}
        <section>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
            {stats.map((s) => (
              <StatCard key={s.id} label={s.label} value={s.value} icon={s.icon} color={s.color} />
            ))}
          </div>
        </section>

        {/* Content Status */}
        <section className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Posts</CardTitle>
              <CardDescription>Published vs Draft</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-6'>
                <div className='w-48'>
                  <ResponsiveContainer width='100%' height={120}>
                    <PieChart>
                      <Pie data={postsStatus} dataKey='value' innerRadius={30} outerRadius={50} paddingAngle={3}>
                        {postsStatus.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className='flex-1'>
                  {postsStatus.map((p, i) => (
                    <div key={p.name} className='mb-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div style={{ background: COLORS[i] }} className='h-2.5 w-8 rounded' />
                          <div className='text-sm'>{p.name}</div>
                        </div>
                        <div className='text-sm font-medium'>{p.value}</div>
                      </div>
                      <div className='mt-2 h-2 w-full rounded-full bg-card'>
                        <div
                          className='h-full rounded-full bg-gradient-to-r from-green-500 to-green-400'
                          style={{ width: `${(p.value / (postsStatus[0].value + postsStatus[1].value)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Published vs Draft</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center gap-6'>
                <div className='w-48'>
                  <ResponsiveContainer width='100%' height={120}>
                    <PieChart>
                      <Pie data={projectsStatus} dataKey='value' innerRadius={30} outerRadius={50} paddingAngle={3}>
                        {projectsStatus.map((entry, index) => (
                          <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className='flex-1'>
                  {projectsStatus.map((p, i) => (
                    <div key={p.name} className='mb-3'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div style={{ background: COLORS[i] }} className='h-2.5 w-8 rounded' />
                          <div className='text-sm'>{p.name}</div>
                        </div>
                        <div className='text-sm font-medium'>{p.value}</div>
                      </div>
                      <div className='mt-2 h-2 w-full rounded-full bg-card'>
                        <div
                          className='h-full rounded-full bg-gradient-to-r from-green-500 to-green-400'
                          style={{ width: `${(p.value / (projectsStatus[0].value + projectsStatus[1].value)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activities + Messages */}
        <section className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <Card className='lg:col-span-2'>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest content changes and uploads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {activities.map((a) => (
                  <div key={a.id} className='flex items-start gap-4'>
                    <div className='mt-1'>{a.icon}</div>
                    <div className='flex-1'>
                      <div className='flex items-center justify-between'>
                        <div className='text-sm text-foreground'>{a.text}</div>
                        <div className='text-xs text-muted-foreground'>{a.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Messages</CardTitle>
              <CardDescription>Recent contact messages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((m) => (
                    <TableRow key={m.email}>
                      <TableCell>{m.name}</TableCell>
                      <TableCell>{m.subject}</TableCell>
                      <TableCell>
                        <a className='text-primary underline' href={`mailto:${m.email}`}>
                          {m.email}
                        </a>
                      </TableCell>
                      <TableCell>{m.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}

export default DashboardPage
