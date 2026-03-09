/**
 * Timeline Component Examples
 * Copy these examples to use in your portfolio pages
 */

import Timeline from './Timeline'
import { Briefcase, GraduationCap, Award, Star, Rocket, Code, Trophy, CheckCircle2 } from 'lucide-react'

// Example 1: Experience Timeline (Left-aligned with card variant)
export function ExperienceTimelineExample() {
  return (
    <Timeline position='left' color='primary'>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Briefcase} size='lg' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <div className='space-y-2'>
            <div className='flex items-start justify-between'>
              <h3 className='text-lg font-semibold'>Senior Frontend Developer</h3>
              <span className='text-sm text-muted-foreground'>2023 - Present</span>
            </div>
            <p className='text-sm font-medium text-muted-foreground'>Tech Company Inc.</p>
            <ul className='mt-2 space-y-1 text-sm'>
              <li>• Led development of new product features using Next.js and React</li>
              <li>• Improved performance by 40% through optimization techniques</li>
              <li>• Mentored junior developers and conducted code reviews</li>
            </ul>
            <div className='mt-3 flex flex-wrap gap-2'>
              <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium'>React</span>
              <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium'>Next.js</span>
              <span className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium'>TypeScript</span>
            </div>
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Code} size='lg' color='success' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <div className='space-y-2'>
            <div className='flex items-start justify-between'>
              <h3 className='text-lg font-semibold'>Frontend Developer</h3>
              <span className='text-sm text-muted-foreground'>2021 - 2023</span>
            </div>
            <p className='text-sm font-medium text-muted-foreground'>Startup Co.</p>
            <ul className='mt-2 space-y-1 text-sm'>
              <li>• Built responsive web applications from scratch</li>
              <li>• Collaborated with design team to implement pixel-perfect UIs</li>
              <li>• Integrated RESTful APIs and GraphQL endpoints</li>
            </ul>
            <div className='mt-3 flex flex-wrap gap-2'>
              <span className='bg-success/10 rounded-full px-3 py-1 text-xs font-medium'>Vue.js</span>
              <span className='bg-success/10 rounded-full px-3 py-1 text-xs font-medium'>TailwindCSS</span>
            </div>
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Rocket} size='lg' color='info' />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <div className='space-y-2'>
            <div className='flex items-start justify-between'>
              <h3 className='text-lg font-semibold'>Junior Developer</h3>
              <span className='text-sm text-muted-foreground'>2019 - 2021</span>
            </div>
            <p className='text-sm font-medium text-muted-foreground'>First Job Ltd.</p>
            <ul className='mt-2 space-y-1 text-sm'>
              <li>• Started career in web development</li>
              <li>• Learned modern JavaScript frameworks and best practices</li>
              <li>• Contributed to team projects and gained valuable experience</li>
            </ul>
          </div>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

// Example 2: Education Timeline (Alternate layout)
export function EducationTimelineExample() {
  return (
    <Timeline position='alternate' color='primary'>
      <Timeline.Item>
        <Timeline.OppositeContent>
          <div className='pr-4 text-right'>
            <p className='text-sm font-semibold'>2023 - 2025</p>
            <p className='text-xs'>2 years</p>
          </div>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={GraduationCap} size='lg' color='success' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <h3 className='text-lg font-semibold'>Master's Degree in Computer Science</h3>
          <p className='text-sm text-muted-foreground'>Harvard University</p>
          <p className='mt-2 text-sm'>Specialized in Artificial Intelligence and Machine Learning</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.OppositeContent>
          <div className='pr-4 text-right'>
            <p className='text-sm font-semibold'>2021</p>
            <p className='text-xs'>Certification</p>
          </div>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={Award} size='lg' color='warning' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <h3 className='text-lg font-semibold'>AWS Certified Developer</h3>
          <p className='text-sm text-muted-foreground'>Amazon Web Services</p>
          <p className='mt-2 text-sm'>Professional certification in cloud development</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.OppositeContent>
          <div className='pr-4 text-right'>
            <p className='text-sm font-semibold'>2015 - 2019</p>
            <p className='text-xs'>4 years</p>
          </div>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={Trophy} size='lg' color='primary' />
        </Timeline.Separator>
        <Timeline.Content variant='card'>
          <h3 className='text-lg font-semibold'>Bachelor's Degree in Software Engineering</h3>
          <p className='text-sm text-muted-foreground'>MIT</p>
          <p className='mt-2 text-sm'>GPA: 3.8/4.0 • Dean's List • Honors Graduate</p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

// Example 3: Project Status Timeline (with different color dots)
export function ProjectStatusExample() {
  return (
    <Timeline position='left'>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={CheckCircle2} color='success' variant='filled' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <div>
            <h4 className='text-success font-semibold'>Phase 1: Planning ✓</h4>
            <p className='text-sm text-muted-foreground'>Completed requirements gathering and design</p>
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={CheckCircle2} color='success' variant='filled' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <div>
            <h4 className='text-success font-semibold'>Phase 2: Development ✓</h4>
            <p className='text-sm text-muted-foreground'>Built core features and functionality</p>
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Code} color='primary' variant='filled' />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <div>
            <h4 className='font-semibold text-primary'>Phase 3: Testing 🔄</h4>
            <p className='text-sm text-muted-foreground'>Currently in progress - QA and bug fixes</p>
          </div>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Rocket} color='default' variant='outlined' />
        </Timeline.Separator>
        <Timeline.Content>
          <div>
            <h4 className='font-semibold text-muted-foreground'>Phase 4: Launch ⏳</h4>
            <p className='text-sm text-muted-foreground'>Planned for next quarter</p>
          </div>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

// Example 4: Simple Skills Timeline with Dashed Connector
export function SkillsTimelineExample() {
  return (
    <Timeline position='left' color='info'>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Star} size='md' />
          <Timeline.Connector variant='dashed' />
        </Timeline.Separator>
        <Timeline.Content>
          <h4 className='font-semibold'>Frontend Development</h4>
          <p className='text-sm text-muted-foreground'>Expert in React, Next.js, and modern CSS</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Star} size='md' />
          <Timeline.Connector variant='dashed' />
        </Timeline.Separator>
        <Timeline.Content>
          <h4 className='font-semibold'>UI/UX Design</h4>
          <p className='text-sm text-muted-foreground'>Figma, Adobe XD, and design systems</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Star} size='md' />
        </Timeline.Separator>
        <Timeline.Content>
          <h4 className='font-semibold'>Backend Development</h4>
          <p className='text-sm text-muted-foreground'>Node.js, Express, and database design</p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}

// Example 5: Minimal Timeline (No animations, clean design)
export function MinimalTimelineExample() {
  return (
    <Timeline>
      <Timeline.Item animate={false}>
        <Timeline.Separator>
          <Timeline.Dot size='sm' animate={false} />
          <Timeline.Connector animate={false} />
        </Timeline.Separator>
        <Timeline.Content animate={false}>
          <p className='text-sm'>
            <span className='font-medium'>2024:</span> Launched new product
          </p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item animate={false}>
        <Timeline.Separator>
          <Timeline.Dot size='sm' animate={false} />
          <Timeline.Connector animate={false} />
        </Timeline.Separator>
        <Timeline.Content animate={false}>
          <p className='text-sm'>
            <span className='font-medium'>2023:</span> Joined current company
          </p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item animate={false}>
        <Timeline.Separator>
          <Timeline.Dot size='sm' animate={false} />
        </Timeline.Separator>
        <Timeline.Content animate={false}>
          <p className='text-sm'>
            <span className='font-medium'>2022:</span> Started freelancing
          </p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
